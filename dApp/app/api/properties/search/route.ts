import { type NextRequest, NextResponse } from "next/server"
import type { LandParcel, SearchResponse } from "@/lib/types"

// Mock database of properties with Nigerian locations
const mockProperties: LandParcel[] = [
  {
    id: "0x1234567890abcdef1234567890abcdef12345678",
    landIdInternal: "Lagos/IKJ/P-123",
    address: "15 Victoria Island, Lagos State",
    coordinates: JSON.stringify([
      [6.4281, 3.4219],
      [6.4285, 3.4225],
      [6.429, 3.422],
      [6.4286, 3.4214],
    ]),
    size: "600 sqm",
    currentOwnerAddress: "0x1234567890abcdef1234567890abcdef12345678",
    status: "Verified",
    deedWalrusCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    surveyWalrusCid: "bafybeihkoviema5eqpvkfkpma6nef3id3qmscevsxcqsn4ica3ckcqn4ea",
    otherDocsWalrusCids: [
      "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      "bafybeihkoviema5eqpvkfkpma6nef3id3qmscevsxcqsn4ica3ckcqn4ea",
    ],
    registrationDate: "2024-01-15T00:00:00Z",
    lastModifiedDate: "2024-01-20T00:00:00Z",
    transactionHistoryIds: ["0xabc123", "0xdef456"],
  },
  {
    id: "0x2345678901bcdef12345678901bcdef123456789",
    landIdInternal: "Lagos/LKI/P-456",
    address: "25 Lekki Phase 1, Lagos State",
    coordinates: JSON.stringify([
      [6.4281, 3.4219],
      [6.4285, 3.4225],
      [6.429, 3.422],
      [6.4286, 3.4214],
    ]),
    size: "1200 sqm",
    currentOwnerAddress: "0x2345678901bcdef12345678901bcdef123456789",
    status: "Registered",
    deedWalrusCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    surveyWalrusCid: "bafybeihkoviema5eqpvkfkpma6nef3id3qmscevsxcqsn4ica3ckcqn4ea",
    otherDocsWalrusCids: [],
    registrationDate: "2024-02-01T00:00:00Z",
    lastModifiedDate: "2024-02-01T00:00:00Z",
    transactionHistoryIds: ["0xghi789"],
  },
  {
    id: "0x3456789012cdef123456789012cdef12345678a",
    landIdInternal: "Lagos/IKY/P-789",
    address: "10 Ikoyi Crescent, Lagos State",
    coordinates: JSON.stringify([
      [6.4281, 3.4219],
      [6.4285, 3.4225],
      [6.429, 3.422],
      [6.4286, 3.4214],
    ]),
    size: "800 sqm",
    currentOwnerAddress: "0x3456789012cdef123456789012cdef12345678a",
    status: "Under Dispute",
    deedWalrusCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    surveyWalrusCid: "bafybeihkoviema5eqpvkfkpma6nef3id3qmscevsxcqsn4ica3ckcqn4ea",
    otherDocsWalrusCids: ["bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"],
    registrationDate: "2023-12-10T00:00:00Z",
    lastModifiedDate: "2024-01-05T00:00:00Z",
    transactionHistoryIds: ["0xjkl012", "0xmno345", "0xpqr678"],
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")?.toLowerCase() || ""

  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Perform partial matching search
  const results = mockProperties.filter(
    (property) =>
      property.landIdInternal.toLowerCase().includes(query) ||
      property.address.toLowerCase().includes(query) ||
      property.currentOwnerAddress.toLowerCase().includes(query),
  )

  const response: SearchResponse = {
    results,
    total: results.length,
  }

  return NextResponse.json(response)
}
