// Fonctions d'authentification additionnelles

function initializeAdminUsers() {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Créer 3 admins par défaut
    const adminUsers = [
        { id: 1, name: 'Admin 1', email: 'admin1@nourr.com', phone: '+216 21 234 567', password: 'admin123', role: 'admin' },
        { id: 2, name: 'Admin 2', email: 'admin2@nourr.com', phone: '+216 21 234 568', password: 'admin123', role: 'admin' },
        { id: 3, name: 'Admin 3', email: 'admin3@nourr.com', phone: '+216 21 234 569', password: 'admin123', role: 'admin' }
    ];
    
    if (existingUsers.length === 0) {
        localStorage.setItem('users', JSON.stringify(adminUsers));
    }
}

// Initialiser les admins au chargement
initializeAdminUsers();
