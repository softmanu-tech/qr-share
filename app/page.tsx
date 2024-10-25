'use client'

import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, RefreshCw } from 'lucide-react'

export default function Home() {
  const [qrCode, setQRCode] = useState<string>('')
  const [connectionId, setConnectionId] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    generateConnectionId()
  }, [])

  useEffect(() => {
    if (connectionId) {
      generateQRCode()
    }
  }, [connectionId])

  const generateConnectionId = () => {
    const newId = Math.random().toString(36).substring(2, 15)
    setConnectionId(newId)
  }

  const generateQRCode = async () => {
    try {
      const url = `${window.location.origin}/connect/${connectionId}`
      const qrCodeDataUrl = await QRCode.toDataURL(url)
      setQRCode(qrCodeDataUrl)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      // Here you would implement the actual file upload logic
      console.log('Uploading file:', selectedFile.name)
      // Simulating upload
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('File uploaded successfully!')
    }
  }

  const handleDownload = () => {
    // Here you would implement the actual file download logic
    console.log('Downloading shared files')
    // Simulating download
    setTimeout(() => {
      alert('Files downloaded successfully!')
    }, 1000)
  }

  const handleConnect = () => {
    // Here you would implement the actual connection logic
    console.log('Connecting with ID:', connectionId)
    // Simulating connection
    setTimeout(() => {
      setIsConnected(true)
    }, 1000)
  }

  return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>QR File Share</CardTitle>
            <CardDescription>Share files easily between devices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected ? (
                <>
                  <div className="flex justify-center">
                    {qrCode && <img src={qrCode} alt="QR Code" className="w-64 h-64" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input value={connectionId} readOnly />
                    <Button onClick={generateConnectionId} size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleConnect} className="w-full">Connect</Button>
                </>
            ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="file">Select a file to share</Label>
                    <Input id="file" type="file" onChange={handleFileChange} />
                  </div>
                  <Button onClick={handleUpload} className="w-full" disabled={!selectedFile}>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download Shared Files
                  </Button>
                </>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Scan the QR code or use the connection ID to connect devices
            </p>
          </CardFooter>
        </Card>
      </div>
  )
}