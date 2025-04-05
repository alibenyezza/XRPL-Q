import { sendPayment } from "./transactions"
import { WALLET_1, WALLET_2 } from "./wallet"
import { getClient } from "./xrpl-client"

const client = getClient()


const main = async () => {
  await client.connect()

  await sendPayment({
    Amount: "10000000",
    Destination: WALLET_2.address,
  }, {wallet: WALLET_1})

  await client.disconnect()
}

main()
