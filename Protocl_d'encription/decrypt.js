const { spawn } = require('child_process');
const path = require('path');

async function main() {
    try {
        // Utiliser la commande de Merkle-Meta pour le décryptage
        const merkleScript = path.join(__dirname, 'Merkle-Meta', 'AES256-Encryption-LayerOne', 'windows', 'interaction.js');
        const process = spawn('node', [merkleScript, 'decrypt', 'encrypted_data.json']);

        process.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        process.stderr.on('data', (data) => {
            console.error(data.toString());
        });
    } catch (error) {
        console.error('Erreur lors du decryptage :', error);
    }
}

main(); 