// Land Parcel data structure based on Sui Move object
export interface LandParcel {
  id: string // Sui Object ID
  landIdInternal: string // e.g., "Lagos/IKJ/P-123"
  address: string
  coordinates: string // Stringified JSON or hash
  size: string // e.g., "600 sqm", "1 acre"
  currentOwnerAddress: string // Sui address
  status: "Registered" | "Under Dispute" | "Mortgaged" | "Government Acquired" | "Transferred" | "Verified"
  deedWalrusCid: string
  surveyWalrusCid: string
  otherDocsWalrusCids: string[]
  registrationDate: string // ISO date string
  lastModifiedDate: string // ISO date string
  transactionHistoryIds: string[]
}

// Transaction Record for property history
export interface TransactionRecord {
  id: string // Sui Object ID
  landParcelId: string
  transactionType: "Registration" | "Transfer" | "StatusChange" | "DocumentUpdate"
  fromAddress?: string
  toAddress?: string
  previousStatus?: string
  newStatus?: string
  timestamp: string
  transactionHash: string
  initiatedBy: string // Sui address
  documentCids?: string[]
}

// Status enum mapping for smart contract
export const StatusEnum = {
  Registered: 0,
  "Under Dispute": 1,
  Mortgaged: 2,
  "Government Acquired": 3,
  Transferred: 4,
  Verified: 5,
} as const

// API Response types
export interface SearchResponse {
  results: LandParcel[]
  total: number
}

export interface DocumentUploadResponse {
  cid: string
  filename: string
  size: number
  uploadDate: string
}

export interface TransactionHistoryResponse {
  records: TransactionRecord[]
}
