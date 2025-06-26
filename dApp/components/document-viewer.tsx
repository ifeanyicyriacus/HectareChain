"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Download, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DocumentViewerProps {
  cid: string
  filename: string
  className?: string
}

export function DocumentViewer({ cid, filename, className }: DocumentViewerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handleViewDocument = async () => {
    setIsLoading(true)
    try {
      // In production, this would fetch from /api/documents/{cid}
      const response = await fetch(`/api/documents/${cid}`)
      if (!response.ok) throw new Error("Failed to load document")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDocumentUrl(url)
    } catch (error) {
      toast({
        title: "Document Load Failed",
        description: "Unable to load document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (documentUrl) {
      const a = document.createElement("a")
      a.href = documentUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className} onClick={handleViewDocument} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Eye className="h-4 w-4 mr-2" />}
          View Document
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {filename}
            </span>
            {documentUrl && (
              <Button onClick={handleDownload} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {documentUrl ? (
            <iframe src={documentUrl} className="w-full h-[70vh] border rounded" title={filename} />
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Click "View Document" to load</p>
                <p className="text-sm text-gray-500 mt-2">Walrus CID: {cid}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
