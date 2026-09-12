// Formulaire Devis
document.getElementById('devisForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Calcul du tarif
    let tarif = 0;
    if (data.type_marchandise === 'Colis standard') {
        tarif = data.poids * 4; // 4€/kg
    }
    
    // Message de confirmation
    const message = `
Demande de devis reçue :
- Nom: ${data.nom}
- Email: ${data.email}
- Téléphone: ${data.telephone}
- De: ${data.ville_origine} (${data.pays_origine})
- À: ${data.ville_destination}
- Type: ${data.type_marchandise}
- Poids: ${data.poids}kg
- Dimensions: ${data.dimensions || 'Non spécifiées'}
- Description: ${data.description}
${tarif > 0 ? `\nEstimation: ${tarif.toFixed(2)}€` : ''}
    `;
    
    alert('Merci ! Votre demande de devis a été envoyée.\n' + message);
    
    // Réinitialiser le formulaire
    this.reset();
    
    // En production, envoyer à une API backend
    // sendToServer(data);
});

// Formulaire Contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    alert('Merci ' + data.name + '! Votre message a été envoyé. Nous vous recontacterons bientôt.');
    
    this.reset();
});

// Fonction de suivi des colis
function searchTracking() {
    const trackingCode = document.getElementById('trackingInput').value.toUpperCase();
    
    if (!trackingCode) {
        alert('Veuillez entrer un code de suivi');
        return;
    }
    
    // Base de données simulée de colis
    const mockDatabase = {
        'NOURR-20240612-001': {
            code: 'NOURR-20240612-001',
            status: 'Livré',
            from: 'Paris, France',
            to: 'Tunis, Tunisie',
            weight: '2.5 kg',
            updated: '2024-06-15 14:30',
            history: [
                { date: '2024-06-12 08:00', status: 'Colis reçu au centre de tri' },
                { date: '2024-06-12 16:30', status: 'En attente d\'expédition' },
                { date: '2024-06-13 10:00', status: 'Expédié de Paris' },
                { date: '2024-06-14 12:00', status: 'En transit vers Tunis' },
                { date: '2024-06-15 14:30', status: 'Livré' }
            ]
        },
        'NOURR-20240611-002': {
            code: 'NOURR-20240611-002',
            status: 'En transit',
            from: 'Lille, France',
            to: 'Sfax, Tunisie',
            weight: '5.0 kg',
            updated: '2024-06-14 10:15',
            history: [
                { date: '2024-06-11 09:00', status: 'Colis reçu au centre de tri' },
                { date: '2024-06-11 18:00', status: 'En attente d\'expédition' },
                { date: '2024-06-12 08:30', status: 'Expédié de Lille' },
                { date: '2024-06-14 10:15', status: 'En transit vers Sfax' }
            ]
        },
        'NOURR-20240610-003': {
            code: 'NOURR-20240610-003',
            status: 'En attente',
            from: 'Paris, France',
            to: 'Gafsa, Tunisie',
            weight: '3.2 kg',
            updated: '2024-06-10 11:00',
            history: [
                { date: '2024-06-10 11:00', status: 'Colis reçu - En traitement' }
            ]
        }
    };
    
    const parcel = mockDatabase[trackingCode];
    
    if (parcel) {
        displayTrackingResult(parcel);
    } else {
        document.getElementById('trackingResult').style.display = 'none';
        document.getElementById('trackingError').style.display = 'block';
    }
}

function displayTrackingResult(parcel) {
    document.getElementById('trackingError').style.display = 'none';
    document.getElementById('trackingResult').style.display = 'block';
    
    document.getElementById('resultCode').textContent = parcel.code;
    document.getElementById('resultStatus').textContent = parcel.status;
    document.getElementById('resultFrom').textContent = parcel.from;
    document.getElementById('resultTo').textContent = parcel.to;
    document.getElementById('resultWeight').textContent = parcel.weight;
    document.getElementById('resultUpdate').textContent = parcel.updated;
    
    // Afficher l'historique
    const historyHtml = parcel.history.map(item => `
        <div class="history-item">
            <div class="date">${item.date}</div>
            <div class="status">${item.status}</div>
        </div>
    `).join('');
    
    document.getElementById('trackingHistory').innerHTML = historyHtml;
}

// Permettre la recherche avec la touche Entrée
document.getElementById('trackingInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchTracking();
    }
});

// Scroll smooth pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});