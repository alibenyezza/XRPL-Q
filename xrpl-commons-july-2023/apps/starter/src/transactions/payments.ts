import { Payment} from "xrpl"
import { TxnOptions } from "../models"
import { getClient } from "../xrpl-client"

const client = getClient() 

type PaymentProps = Omit<Payment, "TransactionType" | "Account">


export const sendPayment = async (props: PaymentProps, {wallet}: TxnOptions) => {
    // prepare transaction
    const payment: Payment = {
         ...props,
         TransactionType: "Payment",
         Account: wallet.address,
    }

    const prepared = await client.autofill(payment)

    //sign
    const signed = wallet.sign(prepared)


    // submit et attender confirmation
    const result = await client.submitAndWait(signed.tx_blob)
    console.log(result)

    return result

}
