import xrpl from 'xrpl';
import crypto from 'crypto';
import { getClient } from "./xrpl-client.js";
import { mintNft, creatNftOffer, acceptNftOffer, creatNftBuyOffer, AcceptBuyOffer } from "./transactions/nfts.js"
import { Sender_Client,Recever_Client } from './xrpl-client.js'
import { SENDER_WALLET, RECEIVER_WALLET } from "./wallet.js";


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
    hash: hash 
  };

  // Convertissez nftData en chaîne JSON, puis en hexadécimal
  const nftDataJson = JSON.stringify(nftData);
  const nftDataHex = xrpl.convertStringToHex(nftDataJson);

  //mint NFT function
  const NFTokenID = await mintNft(
    {
      NFTokenTaxon: 0,
      nftDataHex : nftDataHex,
      lastLedgerSequence: lastLedgerSequence,
    },
    SENDER_WALLET
  )

  //Creat offer function
  /*const OfferID = await creatNftOffer(
    {
        Flags: NFTokenCreateOfferFlags.tfSellNFToken,
        NFTokenID: NFTokenID.result.meta.nftoken_id,
        Amount: "1000000" //drops = 1 XRP
    },
    SENDER_WALLET,
  )

  await acceptNftOffer(
    {  
      NFTokenSellOffer: OfferID.result.meta.offer_id,
    },
    RECEVER_WALLET,
  )*/


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

  await Recever_Client.disconnect();
  await Sender_Client.disconnect();
}

main().catch(console.error);
