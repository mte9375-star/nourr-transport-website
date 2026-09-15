// Fonctions spécifiques à l'admin

function loadRoadmapByCity() {
    const roadmapContent = document.getElementById('roadmapContent');
    
    // Grouper les expéditions par ville
    const byCity = {};
    shipments.forEach(shipment => {
        const city = shipment.departureCity;
        if (!byCity[city]) byCity[city] = [];
        byCity[city].push(shipment);
    });
    
    if (Object.keys(byCity).length === 0) {
        roadmapContent.innerHTML = '<p class="empty-state">Aucune expédition à afficher</p>';
        return;
    }
    
    let html = '';
    Object.keys(byCity).sort().forEach(city => {
        html += `
            <div class="roadmap-city">
                <h3>📍 ${city}</h3>
                ${byCity[city].map(shipment => {
                    const user = JSON.parse(localStorage.getItem('users')).find(u => u.id === shipment.userId);
                    return `
                        <div class="roadmap-item">
                            <span>${user.name}</span>
                            <span>${shipment.nbColis} colis → ${shipment.destination}</span>
                            <span>${user.phone}</span>
                            <span class="roadmap-status ${shipment.paid ? 'paid' : 'unpaid'}">${shipment.paid ? '✅ PAYÉ' : '❌ NON PAYÉ'}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    });
    
    roadmapContent.innerHTML = html;
}

function markPaymentStatus(shipmentId, paid) {
    const shipment = shipments.find(s => s.id == shipmentId);
    if (shipment) {
        shipment.paid = paid;
        localStorage.setItem('shipments', JSON.stringify(shipments));
        loadRoadmapByCity();
        loadAdminDashboard();
        alert('Statut de paiement mis à jour');
    }
}

function updateShipmentStatus(shipmentId, status) {
    const shipment = shipments.find(s => s.id == shipmentId);
    if (shipment) {
        shipment.status = status;
        localStorage.setItem('shipments', JSON.stringify(shipments));
        alert('Statut de l\'expédition mis à jour');
    }
}

// Charger la feuille de route quand on accède à la vue admin
function loadRoadmapView() {
    loadRoadmapByCity();
}
