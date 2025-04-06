import xrpl from 'xrpl';
import crypto from 'crypto';
import { getClient } from "./xrpl-client.js";
import { mintNft, creatNftOffer, acceptNftOffer, creatNftBuyOffer, AcceptBuyOffer } from "./transactions/nfts.js"
import { Sender_Client,Recever_Client } from './xrpl-client.js'
import { SENDER_WALLET, RECEIVER_WALLET } from "./wallet.js";
import { generateMerkleTreeJSON } 
from "../Protocl_d_encription/Merkle-Meta/Merkle-Proof/windows/runMerkleProof.js";
import {encryptfield, decryptfield }  
from "../Protocl_d_encription/Merkle-Meta/AES256-Encryption-LayerOne/windows/interaction.js";

const main= async () => {
  await Sender_Client.connect();//how to deal with receving_client.connect
  await Recever_Client.connect();

  if(!SENDER_WALLET){
    throw new Error("Sender Wallet not found");
  }

  console.log(SENDER_WALLET.address);
  console.log(RECEIVER_WALLET.address);

  const ledgerInfo = await Sender_Client.request({ command: "ledger_current" });
  const lastLedgerSequence = ledgerInfo.result.ledger_current_index + 10; 

  // Créez l'objet nftData
  const nftData = {
    name: "Artemisinin",
    description: "Vaccin contre la Malaria",
    batch_number: "ABC123456",
    manufacturing_date: "2024-08-15",
    Code_ATC : "P01BE01",
    hash: "make this code work"
  };

  nftDataMerklTree = generateMerkleTreeJSON(nftData);
  console.log(JSON.stringify(nftDataMerklTree.leaves, null, 2));
  console.log(JSON.stringify(nftDataMerklTree.root, null, 2));

  // Convertissez nftData en chaîne JSON, puis en hexadécimal
  const nftDataJson = JSON.stringify(nftData);
  const nftDataHex = xrpl.convertStringToHex(nftDataJson);

  await Recever_Client.disconnect();
  await Sender_Client.disconnect();
}

  //mint NFT function
/*  const NFTokenID = await mintNft(
    {
      NFTokenTaxon: 0,
      nftDataHex : nftDataHex,
      lastLedgerSequence: lastLedgerSequence,
    },
    SENDER_WALLET
  )


  const OfferID = await creatNftBuyOffer(
      SENDER_WALLET,
      {
          nftokenID: NFTokenID, //.result.meta.offer_id,
          amount: "100",
      },
      RECEIVER_WALLET,
  )


  await AcceptBuyOffer(  
      OfferID,
      SENDER_WALLET,
  )
  console.log("it works");
}
  */

main().catch(console.error);
