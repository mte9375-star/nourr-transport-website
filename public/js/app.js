// Variables globales
let currentUser = null;
let userRole = null;
let shipments = [];
let departureDates = [];

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    initializeEventListeners();
    checkAuthStatus();
});

// Check si utilisateur connecté
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (token) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        userRole = role;
        
        if (userRole === 'client') {
            showClientDashboard();
        } else if (userRole === 'admin') {
            showAdminDashboard();
        }
    }
}

// Navigation
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

// Modal Auth
function showLoginModal() {
    document.getElementById('authModal').classList.add('show');
}

function closeModal() {
    document.getElementById('authModal').classList.remove('show');
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
}

// Authentification
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulation - À remplacer par appel API
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        userRole = user.role;
        localStorage.setItem('authToken', 'token_' + Date.now());
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        closeModal();
        
        if (userRole === 'client') {
            showClientDashboard();
        } else if (userRole === 'admin') {
            showAdminDashboard();
        }
    } else {
        alert('Email ou mot de passe incorrect');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        role: 'client',
        createdAt: new Date().toISOString()
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
        alert('Cet email existe déjà');
        return;
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Inscription réussie ! Connectez-vous maintenant.');
    document.getElementById('loginEmail').value = email;
    switchTab('login');
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    currentUser = null;
    userRole = null;
    
    document.getElementById('clientDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('home').classList.add('active');
    navigate('home');
}

// Dashboard Client
function showClientDashboard() {
    document.getElementById('clientDashboard').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('home').classList.remove('active');
    
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    
    loadClientShipments();
    switchDashboard('overview');
}

function switchDashboard(section) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
    document.getElementById(section).classList.add('active');
}

function handleNewDemand(event) {
    event.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const departureCity = document.getElementById('departureCity').value;
    const nbColis = document.getElementById('nbColis').value;
    const weight = document.getElementById('weight').value;
    const description = document.getElementById('description').value;
    
    // Récupérer les natures sélectionnées
    const natures = [];
    document.querySelectorAll('input[name="nature"]:checked').forEach(checkbox => {
        natures.push(checkbox.value);
    });
    
    if (natures.length === 0) {
        alert('Veuillez sélectionner au moins une nature de colis');
        return;
    }
    
    // Générer QR code unique
    const qrCode = 'NOUR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    const demand = {
        id: Date.now(),
        userId: currentUser.id,
        destination,
        departureCity,
        nbColis,
        weight,
        natures: natures.join(', '),
        description,
        qrCode,
        status: 'pending',
        paid: false,
        createdAt: new Date().toISOString()
    };
    
    shipments.push(demand);
    localStorage.setItem('shipments', JSON.stringify(shipments));
    
    alert('Demande créée ! Votre code QR: ' + qrCode);
    event.target.reset();
    switchDashboard('my-shipments');
    loadClientShipments();
}

function loadClientShipments() {
    const userShipments = shipments.filter(s => s.userId === currentUser.id);
    const list = document.getElementById('shipmentsList');
    
    if (userShipments.length === 0) {
        list.innerHTML = '<p class="empty-state">Aucune expédition pour le moment</p>';
        return;
    }
    
    list.innerHTML = userShipments.map(shipment => `
        <div class="shipment-card">
            <div class="shipment-header">
                <h3>${shipment.destination}</h3>
                <span class="status-badge ${shipment.status}">${shipment.status}</span>
            </div>
            <p><strong>QR Code:</strong> ${shipment.qrCode}</p>
            <p><strong>Nombre de colis:</strong> ${shipment.nbColis}</p>
            <p><strong>Nature:</strong> ${shipment.natures}</p>
            <p><strong>Poids:</strong> ${shipment.weight} kg</p>
            <p><strong>Statut paiement:</strong> ${shipment.paid ? '✅ Payé' : '❌ Non payé'}</p>
            <p><strong>Date:</strong> ${new Date(shipment.createdAt).toLocaleDateString('fr-FR')}</p>
            <div class="shipment-actions">
                <button class="btn-secondary" onclick="downloadQRCode('${shipment.qrCode}')">📥 Télécharger QR</button>
                <button class="btn-secondary" onclick="printLabel('${shipment.id}')">🖨️ Imprimer étiquette</button>
            </div>
        </div>
    `).join('');
    
    // Stats
    const total = userShipments.length;
    const completed = userShipments.filter(s => s.status === 'completed').length;
    const pending = userShipments.filter(s => s.status === 'pending').length;
    
    document.getElementById('totalShipments').textContent = total;
    document.getElementById('completedShipments').textContent = completed;
    document.getElementById('pendingShipments').textContent = pending;
}

function downloadQRCode(qrCode) {
    alert('Téléchargement QR Code: ' + qrCode);
}

function printLabel(shipmentId) {
    const shipment = shipments.find(s => s.id == shipmentId);
    if (shipment) {
        const printWindow = window.open('', '', 'height=400,width=600');
        printWindow.document.write(`
            <h2>Étiquette d'expédition</h2>
            <p><strong>Destinataire:</strong> ${currentUser.name}</p>
            <p><strong>Téléphone:</strong> ${currentUser.phone}</p>
            <p><strong>Destination:</strong> ${shipment.destination}</p>
            <p><strong>QR Code:</strong> ${shipment.qrCode}</p>
            <p><strong>Nombre de colis:</strong> ${shipment.nbColis}</p>
        `);
        printWindow.print();
    }
}

function editProfile() {
    alert('Fonction de modification de profil à implémenter');
}

// Dashboard Admin
function showAdminDashboard() {
    document.getElementById('adminDashboard').classList.remove('hidden');
    document.getElementById('clientDashboard').classList.add('hidden');
    document.getElementById('home').classList.remove('active');
    
    document.getElementById('adminEmail').textContent = currentUser.email;
    
    loadAdminDashboard();
    switchAdminView('dashboard');
}

function switchAdminView(view) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(view + '-view').classList.remove('hidden');
    document.getElementById(view + '-view').classList.add('active');
}

function loadAdminDashboard() {
    const total = shipments.length;
    const paid = shipments.filter(s => s.paid).length;
    const unpaid = shipments.filter(s => !s.paid).length;
    
    document.getElementById('adminTotalDemands').textContent = total;
    document.getElementById('adminPaid').textContent = paid;
    document.getElementById('adminUnpaid').textContent = unpaid;
}

function scanQR() {
    const manualInput = document.getElementById('manualQRInput').value;
    if (!manualInput) {
        alert('Veuillez entrer un code QR');
        return;
    }
    
    const shipment = shipments.find(s => s.qrCode === manualInput);
    if (shipment) {
        const result = document.getElementById('scanResult');
        result.classList.remove('hidden');
        result.innerHTML = `
            <h3>Colis trouvé</h3>
            <p><strong>Client:</strong> ${currentUser.name}</p>
            <p><strong>Destination:</strong> ${shipment.destination}</p>
            <p><strong>Nombre de colis:</strong> ${shipment.nbColis}</p>
            <p><strong>Statut:</strong> ${shipment.status}</p>
            <button class="btn-primary" onclick="generateLabel('${shipment.id}')">📄 Générer étiquette</button>
        `;
    } else {
        alert('Code QR non trouvé');
    }
}

function generateLabel(shipmentId) {
    const shipment = shipments.find(s => s.id == shipmentId);
    if (shipment) {
        const user = JSON.parse(localStorage.getItem('users')).find(u => u.id === shipment.userId);
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
            <style>
                body { font-family: Arial; padding: 20px; }
                .label { border: 2px solid #000; padding: 30px; text-align: center; page-break-after: always; }
                h2 { margin: 10px 0; }
                p { margin: 8px 0; font-size: 14px; }
                .qr { font-size: 24px; margin: 20px 0; }
                .payment { margin-top: 20px; padding: 10px; border: 2px solid #ff6b35; }
            </style>
            <div class="label">
                <h2>NOURR TRANSPORT</h2>
                <p><strong>Destination:</strong> ${shipment.destination}</p>
                <p><strong>Nom:</strong> ${user.name}</p>
                <p><strong>Téléphone:</strong> ${user.phone}</p>
                <p><strong>Nombre de colis:</strong> ${shipment.nbColis}</p>
                <div class="qr">QR: ${shipment.qrCode}</div>
                <div class="payment">
                    <strong>STATUT PAIEMENT:</strong> ${shipment.paid ? '✅ PAYÉ' : '❌ NON PAYÉ'}
                </div>
            </div>
        `);
        printWindow.print();
    }
}

function printRoadmap() {
    window.print();
}

function exportRoadmap() {
    alert('Export PDF en cours de développement');
}

function handleAddDepartureDate(event) {
    event.preventDefault();
    
    const destination = document.getElementById('datDestination').value;
    const departureDate = document.getElementById('departureDate').value;
    const bookingDeadline = document.getElementById('bookingDeadline').value;
    const capacity = document.getElementById('capacity').value;
    
    const newDate = {
        id: Date.now(),
        destination,
        departureDate: new Date(departureDate).toLocaleString('fr-FR'),
        bookingDeadline: new Date(bookingDeadline).toLocaleString('fr-FR'),
        capacity,
        createdAt: new Date().toISOString()
    };
    
    departureDates.push(newDate);
    localStorage.setItem('departureDates', JSON.stringify(departureDates));
    
    alert('Date de départ ajoutée');
    event.target.reset();
    loadDepartureDates();
}

function loadDepartureDates() {
    const list = document.getElementById('departuresList');
    
    if (departureDates.length === 0) {
        list.innerHTML = '<p class="empty-state">Aucune date programmée</p>';
        return;
    }
    
    list.innerHTML = departureDates.map(date => `
        <div class="date-card">
            <h4>${date.destination}</h4>
            <p><strong>Départ:</strong> ${date.departureDate}</p>
            <p><strong>Limite réservation:</strong> ${date.bookingDeadline}</p>
            <p><strong>Capacité:</strong> ${date.capacity} colis</p>
            <button class="btn-danger" onclick="deleteDate(${date.id})">Supprimer</button>
        </div>
    `).join('');
}

function deleteDate(dateId) {
    departureDates = departureDates.filter(d => d.id !== dateId);
    localStorage.setItem('departureDates', JSON.stringify(departureDates));
    loadDepartureDates();
}

function loadFromLocalStorage() {
    shipments = JSON.parse(localStorage.getItem('shipments')) || [];
    departureDates = JSON.parse(localStorage.getItem('departureDates')) || [];
}

function initializeEventListeners() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // File upload
    const fileUpload = document.querySelector('.file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('click', () => {
            document.getElementById('identityFile').click();
        });
    }
}
