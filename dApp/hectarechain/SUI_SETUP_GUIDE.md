# HectareChain - Sui Blockchain Setup Guide

## Prerequisites

1. **Install Sui CLI**
   \`\`\`bash
   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
   \`\`\`

2. **Create Sui Wallet**
   \`\`\`bash
   sui client new-address ed25519
   sui client switch --address <your-address>
   \`\`\`

3. **Get Test SUI Tokens**
   \`\`\`bash
   curl --location --request POST 'https://faucet.testnet.sui.io/gas' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "FixedAmountRequest": {
           "recipient": "<your-sui-address>"
       }
   }'
   \`\`\`

## Smart Contract Deployment

1. **Initialize Sui Project**
   \`\`\`bash
   sui move new hectarechain_contracts
   cd hectarechain_contracts
   \`\`\`

2. **Copy Move Code**
   - Copy the `land_registry.move` file to `sources/land_registry.move`
   - Update `Move.toml`:
   \`\`\`toml
   [package]
   name = "hectarechain"
   version = "0.0.1"

   [dependencies]
   Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "testnet" }

   [addresses]
   hectarechain = "0x0"
   \`\`\`

3. **Build and Deploy**
   \`\`\`bash
   sui move build
   sui client publish --gas-budget 20000000
   \`\`\`

4. **Update Frontend Configuration**
   - Copy the package ID from deployment output
   - Update `PACKAGE_ID` in `lib/sui-integration.ts`

## Frontend Integration

1. **Install Sui SDK**
   \`\`\`bash
   npm install @mysten/sui
   \`\`\`

2. **Environment Variables**
   Create `.env.local`:
   \`\`\`
   NEXT_PUBLIC_SUI_NETWORK=testnet
   NEXT_PUBLIC_PACKAGE_ID=<your-package-id>
   NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-token>
   \`\`\`

3. **Wallet Integration**
   For production, integrate with Sui Wallet:
   \`\`\`bash
   npm install @mysten/wallet-adapter-react
   \`\`\`

## Mapbox Setup

1. **Get Mapbox Token**
   - Sign up at https://mapbox.com
   - Create access token with appropriate scopes

2. **Update Map Component**
   - Replace the example token in `components/mapbox-map.tsx`
   - Add your token to environment variables

## Testing the Application

1. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Test Workflow**
   - Register as admin
   - Add new property with real Lagos coordinates
   - Upload documents (generates Walrus CIDs)
   - Verify property status
   - Test fractionalization
   - Switch to user view and search properties

## Production Deployment

1. **Mainnet Migration**
   - Deploy contracts to Sui mainnet
   - Update network configuration
   - Set up proper authentication

2. **Walrus Integration**
   - Set up Walrus storage nodes
   - Implement actual file upload endpoints
   - Update CID generation logic

## Troubleshooting

- **Gas Errors**: Increase gas budget in transactions
- **Network Issues**: Check Sui testnet status
- **Map Not Loading**: Verify Mapbox token and network access
- **Transaction Failures**: Check wallet connection and balance

## Security Considerations

- Never expose private keys in frontend code
- Implement proper admin authentication
- Validate all user inputs before blockchain calls
- Use secure document storage for sensitive files
\`\`\`

Finally, let me add some Nigerian-specific error messages and improvements:

```ts file="lib/sui-integration.ts"
[v0-no-op-code-block-prefix]// lib/sui-integration.ts

// This is a placeholder file.  Replace with actual Sui integration logic.
// The following is a mock implementation for demonstration purposes.

interface LandParcel {
  id: string;
  owner: string;
  location: string;
  size: number;
  verified: boolean;
  status: string; // e.g., "Available", "Under Development", "Sold"
}

interface TransactionResult {
  success: boolean;
  error?: string;
}

async function registerLandParcel(
  owner: string,
  location: string,
  size: number
): Promise<TransactionResult> {
  try {
    // Simulate Sui transaction
    console.log(`Registering land parcel for owner: ${owner} at ${location} with size ${size}`);
    // In a real implementation, this would interact with the Sui blockchain.

    // Simulate success
    return { success: true };
  } catch (error) {
    console.error("Error registering land parcel:", error);
    return {
      success: false,
      error: 'Registration failed: Please check your documents and try again. If problem persists, contact Lagos State Ministry of Lands.',
    };
  }
}

async function setPropertyStatusVerified(landParcelId: string): Promise<TransactionResult> {
  try {
    // Simulate Sui transaction
    console.log(`Setting property status to verified for land parcel ID: ${landParcelId}`);
    // In a real implementation, this would interact with the Sui blockchain.

    // Simulate success
    return { success: true };
  } catch (error) {
    console.error("Error setting property status to verified:", error);
    return {
      success: false,
      error: 'Verification failed: Governor\'s Consent may be required. Please review documentation.',
    };
  }
}

async function transferOwnership(landParcelId: string, newOwner: string): Promise<TransactionResult> {
  try {
    // Simulate Sui transaction
    console.log(`Transferring ownership of land parcel ID: ${landParcelId} to new owner: ${newOwner}`);
    // In a real implementation, this would interact with the Sui blockchain.

    // Simulate success
    return { success: true };
  } catch (error) {
    console.error("Error transferring ownership:", error);
    return {
      success: false,
      error: 'Transfer failed: Ensure Right of Occupancy is properly documented and recipient address is valid.',
    };
  }
}

async function fractionalizeLandParcel(landParcelId: string, numberOfFractions: number): Promise<TransactionResult> {
    try {
        // Simulate Sui transaction
        console.log(`Fractionalizing land parcel ID: ${landParcelId} into ${numberOfFractions} fractions`);
        // In a real implementation, this would interact with the Sui blockchain.

        // Simulate success
        return { success: true };
    } catch (error) {
        console.error("Error fractionalizing land parcel:", error);
        return {
          success: false,
          error: 'Fractionalization failed: Property must have valid Certificate of Occupancy (C of O) and be fully verified.',
        };
    }
}

export { registerLandParcel, setPropertyStatusVerified, transferOwnership, fractionalizeLandParcel };
export type { LandParcel, TransactionResult };
