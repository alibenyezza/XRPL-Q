# Test AES-256 Encryption

Ce projet permet de tester l'encryptage et le decryptage de données en utilisant l'algorithme AES-256.

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :
```bash
npm install
```

## Utilisation

### Encryptage des données
Pour encrypter les données :
```bash
npm run encrypt
```
Les données encryptées seront sauvegardées dans le fichier `encrypted_data.json`.

### Decryptage des données
Pour décrypter les données :
```bash
npm run decrypt
```
Les données décryptées seront affichées dans la console.

## Structure du projet
- `encrypt.js` : Script pour l'encryptage des données
- `decrypt.js` : Script pour le decryptage des données
- `encrypted_data.json` : Fichier contenant les données encryptées (créé après l'encryptage) 