export interface LandParcel {
  id: string
  suiObjectId: string
  landIdInternal: string
  address: string
  coordinates: string // JSON stringified polygon coordinates
  size: string
  currentOwnerAddress: string
  status:
    | "Registered"
    | "Under Dispute"
    | "Verified"
    | "Mortgaged"
    | "Government Acquired"
    | "Transferred"
    | "Fractionalized"
    | "Under Verification"
  registrationDate: string
  lastModifiedDate: string
  deedWalrusCid: string
  surveyWalrusCid: string
  otherDocsWalrusCids: string[]
  imagesWalrusCids: PropertyImage[]
  features: string[]
  lga?: string
  estimatedValue: number
  fractionalShares?: {
    totalShares: number
    userShares: number
  }
  verificationProgress?: VerificationStage[]
}

export interface PropertyImage {
  cid: string
  angle: string
  description: string
  url?: string // Added for real images
}

export interface VerificationStage {
  stage: string
  status: "completed" | "in-progress" | "pending"
  date?: string
}

export interface TransactionRecord {
  id: string
  type: "Registration" | "Transfer" | "Verification" | "Fractionalization" | "Sale" | "Inheritance" | "Gift"
  propertyId: string
  fromOwnerId?: string
  toOwnerId?: string
  date: string
  amount?: number
  txHash: string
  status: "Pending" | "Completed" | "Failed"
  description: string
}

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  address: string
  suiAddress: string
  dateCreated: string
  propertiesOwned: string[]
  verificationStatus: "Verified" | "Pending" | "Rejected"
}

export interface LandRegistry {
  id: string
  propertyId: string
  registryNumber: string
  registrationDate: string
  lastUpdated: string
  status: "Active" | "Inactive" | "Disputed"
  coordinates: string
  area: number
  lga: string
}

export interface CoordinateIndex {
  id: string
  coordinates: string
  propertyIds: string[]
  region: string
  lastIndexed: string
}
