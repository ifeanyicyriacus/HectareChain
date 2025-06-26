# HectareChain Lagos - Decentralized Land Registry

A secure, transparent land ownership verification and management system built on the Sui blockchain with Walrus decentralized storage.

## Features

### User Features
- **zkLogin Authentication**: Secure login using existing social accounts (Google, Facebook) via Sui's zkLogin
- **Property Verification**: Search and verify land properties by ID or address
- **Ownership Details**: View current owner, status, and associated documents
- **Document Access**: Access land documents stored on Walrus decentralized storage

### Admin Features
- **Google OAuth**: Secure admin authentication
- **Document Upload**: Upload land documents to Walrus storage
- **Property Verification**: Mark properties as verified on the Sui blockchain
- **Ownership Transfer**: Transfer land ownership between parties
- **Administrative Controls**: Enhanced property search and management

## Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Sui Network for immutable land records
- **Storage**: Walrus decentralized storage for documents
- **Authentication**: Sui zkLogin for users, Google OAuth for admins
- **UI Components**: shadcn/ui component library

## Architecture

### Blockchain Integration
- Direct Sui blockchain interaction for critical operations (verification, ownership transfer)
- Smart contract functions for land registry management
- Immutable record keeping with cryptographic security

### Storage Solution
- Walrus decentralized storage for large documents
- Content-addressed storage with CID references
- Redundant, censorship-resistant document access

### Security Features
- Multi-factor authentication systems
- Wallet-based transaction signing
- Immutable blockchain records
- Decentralized document storage

## Getting Started

### Prerequisites
- Node.js 18+ 
- Sui wallet (for blockchain interactions)
- Google OAuth credentials (for admin access)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

### Environment Variables

\`\`\`env
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_SUI_PACKAGE_ID=0x...
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

## Smart Contract Integration

The application integrates with Sui smart contracts for:

- `register_land_parcel`: Register new land parcels
- `transfer_ownership`: Transfer property ownership
- `set_property_status_verified`: Mark properties as verified
- Property queries and status checks

## API Endpoints

- `GET /api/properties/search`: Search properties by ID or address
- `POST /api/documents/upload`: Upload documents to Walrus storage

## Security Considerations

- All critical blockchain operations require wallet signature
- Admin access restricted to authorized personnel
- Document integrity verified through Walrus CIDs
- Immutable audit trail on Sui blockchain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
