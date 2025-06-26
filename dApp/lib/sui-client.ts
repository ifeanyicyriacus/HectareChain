// Sui blockchain integration with dApp Kit
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client"
import { TransactionBlock } from "@mysten/sui.js/transactions"
import type { WalletContextState } from "@mysten/dapp-kit"

export interface SuiConfig {
  network: "mainnet" | "testnet" | "devnet"
  packageId: string
  rpcUrl: string
}

export const suiConfig: SuiConfig = {
  network: "testnet",
  packageId: "0x...", // Your deployed smart contract package ID
  rpcUrl: getFullnodeUrl("testnet"),
}

let suiClient: SuiClient | null = null

export function getSuiClient(): SuiClient {
  if (!suiClient) {
    suiClient = new SuiClient({ url: suiConfig.rpcUrl })
  }
  return suiClient
}

// Register new land parcel
export function createRegisterLandParcelTransaction(params: {
  landIdInternal: string
  geoCoordsHash: string
  deedWalrusCid: string
  surveyWalrusCid: string
  otherDocsWalrusCids: string[]
  recipient: string
}): TransactionBlock {
  const txb = new TransactionBlock()

  txb.moveCall({
    target: `${suiConfig.packageId}::land_registry::register_land_parcel`,
    arguments: [
      txb.pure(params.landIdInternal),
      txb.pure(params.geoCoordsHash),
      txb.pure(params.deedWalrusCid),
      txb.pure(params.surveyWalrusCid),
      txb.pure(params.otherDocsWalrusCids),
      txb.pure(params.recipient),
    ],
  })

  return txb
}

// Transfer ownership
export function createTransferOwnershipTransaction(params: {
  landParcelId: string
  newOwnerAddress: string
}): TransactionBlock {
  const txb = new TransactionBlock()

  txb.moveCall({
    target: `${suiConfig.packageId}::land_registry::transfer_ownership`,
    arguments: [txb.object(params.landParcelId), txb.pure(params.newOwnerAddress)],
  })

  return txb
}

// Set property status as verified
export function createSetPropertyStatusTransaction(params: {
  landParcelId: string
  verificationDocumentWalrusCid: string
  newStatus: number
}): TransactionBlock {
  const txb = new TransactionBlock()

  txb.moveCall({
    target: `${suiConfig.packageId}::land_registry::set_property_status_verified`,
    arguments: [
      txb.object(params.landParcelId),
      txb.pure(params.verificationDocumentWalrusCid),
      txb.pure(params.newStatus),
    ],
  })

  return txb
}

// Execute transaction with wallet
export async function executeTransaction(txb: TransactionBlock, wallet: WalletContextState) {
  if (!wallet.currentWallet) {
    throw new Error("No wallet connected")
  }

  try {
    const result = await wallet.signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
      },
    })

    return result
  } catch (error) {
    console.error("Transaction execution failed:", error)
    throw error
  }
}

// Query property by ID
export async function queryProperty(propertyId: string) {
  const client = getSuiClient()

  try {
    const result = await client.getObject({
      id: propertyId,
      options: { showContent: true, showType: true },
    })

    return result
  } catch (error) {
    console.error("Property query failed:", error)
    throw error
  }
}

// Subscribe to property events for real-time updates
export function subscribeToPropertyEvents(callback: (event: any) => void) {
  const client = getSuiClient()

  return client.subscribeEvent({
    filter: {
      Package: suiConfig.packageId,
    },
    onMessage: callback,
  })
}
