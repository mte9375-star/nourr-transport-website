# NourTransport - Guide de Déploiement Complet

## 🎯 Déploiement en 3 étapes

### Étape 1: Préparation (2 minutes)

```bash
# Cloner le repository
git clone https://github.com/mte9375-star/nourr-transport-website.git
cd nourr-transport-website

# Installer Node.js si nécessaire
# Télécharger depuis: https://nodejs.org/

# Vérifier l'installation
node --version
npm --version
```

### Étape 2: Déploiement automatique (1 minute)

**Sur macOS/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Sur Windows:**
```bash
deploy.bat
```

**Ou manuellement:**
```bash
npm install -g vercel
vercel --prod
```

### Étape 3: Configuration Vercel

1. Créer un compte sur [vercel.com](https://vercel.com) (gratuit)
2. Suivre les prompts du CLI Vercel
3. **Votre site sera live en quelques secondes !**

---

## 🧪 Tester en local (avant déploiement)

```bash
npm install
npm start
```

Ouvert sur: **http://localhost:3000**

---

## 📋 Checklist de déploiement

- [ ] Node.js v16+ installé
- [ ] Compte Vercel créé (gratuit)
- [ ] Dépendances installées (`npm install`)
- [ ] Application testée localement
- [ ] Prêt à déployer

---

## 🔗 Liens utiles

- **GitHub:** https://github.com/mte9375-star/nourr-transport-website
- **Vercel:** https://vercel.com/new
- **Node.js:** https://nodejs.org/

---

## 💡 Après le déploiement

**Votre application sera accessible à:**
```
https://nourr-transport-website.vercel.app
```

**Identifiants de test:**
- Admin: `admin1@nourr.com` / `admin123`
- Créer un compte client dans l'appli

---

## ⚠️ Troubleshooting

**Erreur: "vercel not found"**
```bash
npm install -g vercel
vercel --version
```

**Erreur: Port 3000 déjà utilisé**
```bash
# Trouver et terminer le processus
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

**Besoin d'aide ?**
Contactez: mte9375@gmail.com

---

## 🎉 C'est fait !

Votre système NourTransport est maintenant en ligne et prêt à être utilisé ! 🚀
