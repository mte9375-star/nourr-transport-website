#!/bin/bash

# Script de test local

echo "🧪 Test NourTransport en local"
echo "==============================="
echo ""

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo ""
echo "✅ Démarrage du serveur local..."
echo "📱 Ouvrez votre navigateur: http://localhost:3000"
echo ""
echo "Pour arrêter: Ctrl + C"
echo ""

npm start
