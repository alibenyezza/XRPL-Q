import xrpl, { convertStringToHex } from 'xrpl'
import { getClient } from "../xrpl-client.js"
import { TransactionType } from 'ripple-binary-codec/dist/enums/index.js';

const client = getClient()

export const mintNft = async ({ NFTokenTaxon, nftDataHex,lastLedgerSequence,  ...rest }, wallet) => {
    const nftMintTxn = {
        ...rest,
        URI: nftDataHex, // Utilisez les données du NFT comme URI
        Flags: 8,
        TransferFee: 0,
        NFTokenTaxon: NFTokenTaxon || 0,
        Account: wallet.address,
        TransactionType: "NFTokenMint",
        LastLedgerSequence: lastLedgerSequence // Permet d'éviter l'erreur de séquence de ledger expirée
    };
    const prepared = await client.autofill(nftMintTxn);
    const signed = wallet.sign(prepared);
    const response = await client.submitAndWait(signed.tx_blob);

    console.log("Réponse de la transaction :", response);
    return response
};

export const creatNftOffer = async (props, wallet) => {
    const offerTxn = {
        ...props,
        Account: wallet.address,
        TransactionType: "NFTokenCreateOffer", //add price with it 
    }

    const result = await client.submitAndWait(offerTxn, {
        autofill: true,
        wallet,
    }
    )

    console.log("Réponse de la transaction :", result);
    return result;
}
/*
export function getNFTokenIDFromMintTxResponse(txResponse) {
    const affectedNodes = txResponse.meta.AffectedNodes;
    for (const node of affectedNodes) {
      if (node.CreatedNode && node.CreatedNode.LedgerEntryType === "NFTokenPage") {
        const nfTokens = node.CreatedNode.NewFields.NFTokens;
        if (nfTokens && nfTokens.length > 0) {
          return nfTokens[0].NFToken.NFTokenID;
        }
      }
    }
    return null; // NFTokenID not found
  }
*/

export const acceptNftOffer = async (props, wallet) => {

    //prepare
    const acceptTxn = {
        ...props,
        TransactionType:"NFTokenAcceptOffer",
        Account: wallet.address,
    }

    //Autofill, Sign and submit wait
    const result = await client.submitAndWait(acceptTxn,{
        autofill: true,
        wallet,
    })

    console.log(result)
    return result

}


export const creatNftBuyOffer = async (SENDER_WALLET,{ props, nftokenID,  amount }, RECEVER_WALLET) => {

    if(!RECEVER_WALLET || !RECEVER_WALLET.classicAddress){
        throw new Error("wallet pb");
    }

    const BuyOfferTxn = {
        ...props,
        NFTokenID: nftokenID.result.meta.nftoken_id,
        Amount: amount,
        Owner: SENDER_WALLET.classicAddress,
        Account: RECEVER_WALLET.classicAddress,
        Flags: 0,
        TransactionType: "NFTokenCreateOffer",
    };

    console.log(BuyOfferTxn); 

    const prepared = await client.autofill(BuyOfferTxn);
    const signed = RECEVER_WALLET.sign(prepared);
    console.log(signed)
    const result = await client.submitAndWait(signed.tx_blob);

    console.log("Réponse de la transaction :", result);
    return result;
}

export const AcceptBuyOffer = async (offerIndex, wallet) =>  {
    console.log(wallet);
    
    //prepare
    const acceptBuyTxn = {
        TransactionType: "NFTokenAcceptOffer",
        Account: wallet.classicAddress,
        NFTokenBuyOffer: offerIndex.result.meta.offer_id,
    };

    //Autofill, Sign and submit wait
    const result = await client.submitAndWait(acceptBuyTxn,{
        autofill: true,
        wallet,
    })
    console.log(result)
    return result
}
