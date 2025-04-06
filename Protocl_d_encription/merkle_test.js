const generateMerkleTree = require('./merkleProof');

async function main() {
    try {
        // Générer l'arbre de Merkle
        const result = generateMerkleTree('input.json');
        console.log('Merkle tree generated successfully!');
        
        console.log('\nMerkle Leaves:', JSON.stringify(result.leaves, null, 2));
        console.log('\nMerkle Root:', JSON.stringify(result.root, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 