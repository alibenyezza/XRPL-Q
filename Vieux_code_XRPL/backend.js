import xrpl, { convertStringToHex } from 'xrpl';
import crypto from 'crypto';
import { SENDER_DATA } from "../FrontEnd" //Get theo s front end JS

import { Wallet } from 'xrpl';
import { getClient } from "./xrpl-client.js";
import { mintNft, creatNftOffer, acceptNftOffer } from "./transactions/nfts.js"
import { NFTokenCreateOfferFlags } from 'xrpl';

const Sending_client = getClient();
const Recever_client = getClient();

const CreatNewNFT = async () => {
    await Sending_client.connect();//how to deal with receving_client.connect
    
    const data = "ATCGGTCTAGTCCTAGTAC";// génere par l'utilisateur
    const hash = crypto.createHash("sha256").update(data).digest("hex");
  
    const ledgerInfo = await Sending_client.request({ command: "ledger_current" });
    const lastLedgerSequence = ledgerInfo.result.ledger_current_index + 10;

    const nftDataHex = xrpl.convertStringToHex(SENDER_DATA);//probleme Not found

    const NFTokenID = await mintNft(
        {
          NFTokenTaxon: 0,
          nftDataHex: SENDER_DATA,
        },
        SENDER_WALLET
      )

    await Sending_client.disconnect();

    return NFTokenID;
}

const SubmitNFTMarket = async (NFTokenID) => {
    await Sending_client.connect();//how to deal with receving_client.connect

    const OfferID = await creatNftOffer(
        {
            Flags: NFTokenCreateOfferFlags.tfSellNFToken,
            NFTokenID: NFTokenID.result.meta.nftoken_id,
            Amount: "1000000" //drops = 1 XRP
        },
        SENDER_WALLET,
      )

    await Sending_client.disconnect();

    return OfferID;
}

const AcceptNftOffer = async (OfferID) =>  {
    await Sending_client.connect();//how to deal with receving_client.connect

    await acceptNftOffer(
        {  
          NFTokenSellOffer: OfferID.result.meta.offer_id,
        },
        RECEVER_WALLET,
      )

      await Sending_client.disconnect();
}