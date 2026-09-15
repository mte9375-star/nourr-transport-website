#!/bin/bash

# Script de configuration et déploiement Vercel

echo "🚀 NourTransport - Configuration et Déploiement"
echo "================================================"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js"
    exit 1
fi

echo "✅ Node.js trouvé: $(node --version)"

# Installer dépendances
echo "📦 Installation des dépendances..."
npm install

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📥 Installation de Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI trouvé: $(vercel --version)"

# Déploiement
echo ""
echo "🌐 Déploiement sur Vercel..."
echo "Suivez les instructions pour lier votre compte Vercel"
echo ""

vercel --prod

echo ""
echo "✅ Déploiement terminé !"
echo "🎉 Votre application est en ligne !"
