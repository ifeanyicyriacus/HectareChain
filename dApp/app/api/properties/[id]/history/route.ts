import { type NextRequest, NextResponse } from "next/server"
import type { TransactionRecord, TransactionHistoryResponse } from "@/lib/types"

// Mock transaction history data
const mockTransactionHistory: Record<string, TransactionRecord[]> = {
  "0x1234567890abcdef1234567890abcdef12345678": [
    {
      id: "0xabc123",
      landParcelId: "0x1234567890abcdef1234567890abcdef12345678",
      transactionType: "Registration",
      toAddress: "0x1234567890abcdef1234567890abcdef12345678",
      newStatus: "Registered",
      timestamp: "2024-01-15T10:30:00Z",
      transactionHash: "0xabcdef123456789",
      initiatedBy: "0xadmin1234567890abcdef1234567890abcdef12345678",
      documentCids: ["bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi"],
    },
    {
      id: "0xdef456",
      landParcelId: "0x1234567890abcdef1234567890abcdef12345678",
      transactionType: "StatusChange",
      previousStatus: "Registered",
      newStatus: "Verified",
      timestamp: "2024-01-20T14:45:00Z",
      transactionHash: "0xdef456789012345",
      initiatedBy: "0xadmin1234567890abcdef1234567890abcdef12345678",
      documentCids: ["bafybeihkoviema5eqpvkfkpma6nef3id3qmscevsxcqsn4ica3ckcqn4ea"],
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const records = mockTransactionHistory[id] || []

  const response: TransactionHistoryResponse = {
    records,
  }

  return NextResponse.json(response)
}
