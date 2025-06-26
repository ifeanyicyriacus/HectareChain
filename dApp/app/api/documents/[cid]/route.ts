import { type NextRequest, NextResponse } from "next/server"

// Mock API endpoint for document retrieval from Walrus
export async function GET(request: NextRequest, { params }: { params: { cid: string } }) {
  const { cid } = params

  try {
    // Simulate document retrieval from Walrus
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, this would fetch from Walrus aggregator
    // const response = await fetch(`${walrusConfig.aggregatorUrl}/v1/${cid}`)
    // return new Response(response.body, { headers: response.headers })

    // Mock PDF content
    const mockPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(HectareChain Document - CID: ${cid}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`

    return new Response(mockPdfContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="document-${cid}.pdf"`,
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }
}
