import * as dotenv from "dotenv";
import { Wallet } from 'xrpl';
import { Sender_Client, Recever_Client} from './xrpl-client.js';
import { error } from "console";

dotenv.config();

//sEd7oQwXyqGQTz6ioEvgAiXsBpvDTXQ
const SENDER_WALLET_SEED = process.env.WALLET_1_SEED;
//sEd7YeDRTFMth7vKtBhhd8cp727EVC8
const RECEIVER_WALLET_SEED = process.env.WALLET_2_SEED;

if(!SENDER_WALLET_SEED || !RECEIVER_WALLET_SEED){
    throw new Error("Wallet not inmputed");
}

export const SENDER_WALLET = Wallet.fromSeed(SENDER_WALLET_SEED);
export const RECEIVER_WALLET = Wallet.fromSeed(RECEIVER_WALLET_SEED);
