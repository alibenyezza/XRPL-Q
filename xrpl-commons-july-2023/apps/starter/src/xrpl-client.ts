// todo: write the client
import { Client } from "xrpl"

const networks = {
    RIPPLE_TESTNET: "wss://clio.altnet.rippletest.net:51233",
}


// fonction pour initialiser le client
let client: Client
export const getClient = () => {

    if (!client) {
        client = new Client(networks.RIPPLE_TESTNET)
    }
    return client
}


