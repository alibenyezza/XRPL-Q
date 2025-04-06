const crypto = require('crypto');
const fs = require('fs');

class MerkleTree {
    constructor(data) {
        this.leaves = Object.entries(data).map(([key, value]) => {
            const content = `${key}:${value}`;
            return crypto.createHash('sha256').update(content).digest('hex');
        });
        this.root = this.buildMerkleTree(this.leaves);
    }

    buildMerkleTree(leaves) {
        if (leaves.length === 0) return null;
        if (leaves.length === 1) return leaves[0];

        const parents = [];
        for (let i = 0; i < leaves.length; i += 2) {
            const leftChild = leaves[i];
            const rightChild = i + 1 < leaves.length ? leaves[i + 1] : leftChild;
            const parentHash = crypto.createHash('sha256')
                .update(leftChild + rightChild)
                .digest('hex');
            parents.push(parentHash);
        }

        return this.buildMerkleTree(parents);
    }

    generateProof() {
        const merkleRoot = { merkleRoot: this.root };
        const merkleLeaves = { leaves: this.leaves };

        // Sauvegarder le root et les leaves dans des fichiers
        fs.writeFileSync('merkleroot.json', JSON.stringify(merkleRoot, null, 2));
        fs.writeFileSync('merkleleaves.json', JSON.stringify(merkleLeaves, null, 2));

        return {
            root: merkleRoot,
            leaves: merkleLeaves
        };
    }
}

// Fonction principale pour générer l'arbre de Merkle
function generateMerkleTree(inputPath) {
    try {
        // Lire les données d'entrée
        const inputData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
        
        // Créer et générer l'arbre de Merkle
        const merkleTree = new MerkleTree(inputData);
        return merkleTree.generateProof();
    } catch (error) {
        console.error('Error generating Merkle tree:', error);
        throw error;
    }
}

module.exports = generateMerkleTree; 