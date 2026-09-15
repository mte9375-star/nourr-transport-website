# API Documentation - NourTransport

## Base URL (Quand l'API sera déployée)
```
https://api.nourr-transport.com
```

## Authentification

### Inscription Client
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33612345678",
  "password": "password123"
}

Response: 201 Created
{
  "id": "user_123",
  "token": "eyJhbGc..."
}
```

### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "jean@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

## Demandes d'Expédition

### Créer une demande
```http
POST /api/shipments/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "destination": "Tunisie",
  "departureCity": "Paris",
  "nbColis": 3,
  "weight": 15.5,
  "natures": ["Vêtements", "Électronique"],
  "description": "Colis importants"
}

Response: 201 Created
{
  "id": "shipment_123",
  "qrCode": "NOUR-1234567890-abc123def",
  "status": "pending"
}
```

### Obtenir ses expéditions
```http
GET /api/shipments
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "shipment_123",
    "destination": "Tunisie",
    "nbColis": 3,
    "qrCode": "NOUR-...",
    "status": "pending",
    "paid": false,
    "createdAt": "2024-09-15T13:00:00Z"
  }
]
```

## Admin - Gestion

### Scanner QR Code
```http
POST /api/admin/scan
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "qrCode": "NOUR-1234567890-abc123def"
}

Response: 200 OK
{
  "shipment": { ... },
  "client": { ... },
  "label": { ... }
}
```

### Mettre à jour statut paiement
```http
POST /api/admin/payment-status
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "shipmentId": "shipment_123",
  "paid": true
}

Response: 200 OK
{
  "success": true,
  "message": "Statut de paiement mis à jour"
}
```

### Obtenir la feuille de route
```http
GET /api/admin/roadmap?date=2024-09-15
Authorization: Bearer {adminToken}

Response: 200 OK
{
  "date": "2024-09-15",
  "byCity": {
    "Paris": [
      {
        "clientName": "Jean Dupont",
        "phone": "+33612345678",
        "nbColis": 3,
        "destination": "Tunisie",
        "paid": true
      }
    ],
    "Marseille": [ ... ]
  }
}
```

## Dates de Départ

### Ajouter une date
```http
POST /api/admin/departure-dates
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "destination": "Tunisie",
  "departureDate": "2024-09-20T10:00:00Z",
  "bookingDeadline": "2024-09-19T18:00:00Z",
  "capacity": 100
}

Response: 201 Created
{
  "id": "date_123",
  "success": true
}
```

### Obtenir dates actives
```http
GET /api/departure-dates?destination=Tunisie

Response: 200 OK
[
  {
    "destination": "Tunisie",
    "departureDate": "2024-09-20T10:00:00Z",
    "bookingDeadline": "2024-09-19T18:00:00Z",
    "capacity": 100,
    "currentBookings": 45
  }
]
```

## Codes d'erreur

| Code | Description |
|------|-------------|
| 400  | Requête invalide |
| 401  | Non authentifié |
| 403  | Accès refusé |
| 404  | Ressource non trouvée |
| 500  | Erreur serveur |

## Statuts de colis

- `pending`: En attente
- `confirmed`: Confirmé
- `in_transit`: En transit
- `delivered`: Livré
- `cancelled`: Annulé
