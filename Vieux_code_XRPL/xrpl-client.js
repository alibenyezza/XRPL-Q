import { Client } from "xrpl";

//https://xrpl.org/public-servers.html
const networks = {
  RIPPLE_TESTNET: "wss://s.altnet.rippletest.net:51233",
  XRPL_LABS_TESTNET: "wss://testnet.xrpl-labs.com",
  RIPPLE_AMM_DEVNET: "wss://amm.devnet.rippletest.net:51233/",
};

let xrplClient;

export const getClient = () => {
  if(!xrplClient){
    xrplClient = new Client(networks.RIPPLE_TESTNET);
    return xrplClient;
  }
  return xrplClient;
};

export const Sender_Client = getClient();
export const Recever_Client = getClient();