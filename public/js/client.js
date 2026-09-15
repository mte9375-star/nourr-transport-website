// Fonctions spécifiques au client

function uploadIdentity() {
    const file = document.getElementById('identityFile');
    if (file.files.length === 0) {
        alert('Veuillez sélectionner un fichier');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;
        // Stocker localement
        const userIdentities = JSON.parse(localStorage.getItem('userIdentities')) || {};
        userIdentities[currentUser.id] = imageData;
        localStorage.setItem('userIdentities', JSON.stringify(userIdentities));
        alert('Pièce d\'identité téléchargée');
    };
    reader.readAsDataURL(file.files[0]);
}

function generateQRCodeForShipment(shipmentId) {
    const shipment = shipments.find(s => s.id == shipmentId);
    if (!shipment) return;
    
    // Utiliser qrcode.js library
    const qrContainer = document.createElement('div');
    QRCode.toCanvas(qrContainer, shipment.qrCode, {
        width: 200,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, (error) => {
        if (error) console.error(error);
        console.log('QR Code généré');
    });
}
