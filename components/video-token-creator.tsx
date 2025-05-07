"use client"

import { useState } from "react"
import { Upload, Rocket, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"

export function VideoTokenCreator() {
  const [videoFile, setVideoFile] = useState(null)
  const [tokenName, setTokenName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [supply, setSupply] = useState("")
  const [status, setStatus] = useState("Ready to create token")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [tokenMint, setTokenMint] = useState("")
  const [initialPrice, setInitialPrice] = useState(0.00001)
  const [targetMarketCap, setTargetMarketCap] = useState(69000)
  const [liquidityPercentage, setLiquidityPercentage] = useState(20)
  const [previewUrl, setPreviewUrl] = useState("")

  const handleVideoUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file)
      setStatus("Video uploaded")

      // Create a URL for the video preview
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setStatus("Please upload a video (max 10 seconds)")
    }
  }

  const removeVideo = () => {
    setVideoFile(null)
    setPreviewUrl("")
    setStatus("Video removed")
  }

  const createToken = async () => {
    if (!videoFile || !tokenName || !symbol || !supply) {
      setStatus("Missing required fields")
      return
    }

    setStatus("Uploading video to Arweave...")
    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate token creation after "upload" completes
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setStatus("Launching token on bonding curve...")

      setTimeout(() => {
        // Mock token mint address
        const mockTokenMint = "So1" + Math.random().toString(36).substring(2, 10) + "..."
        setTokenMint(mockTokenMint)
        setStatus(`Token ${symbol} launched! Mint: ${mockTokenMint}`)
        setIsUploading(false)
      }, 1500)
    }, 4000)
  }

  const formatPrice = (price) => {
    if (price < 0.0001) {
      return price.toExponential(2)
    }
    return price.toFixed(6)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SolXtreme Video Meme Token Creator</CardTitle>
        <CardDescription>Create a token with a video meme attached to it</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="video">Video Meme</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <div className="text-sm text-muted-foreground">{status}</div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="token-name">Token Name</Label>
                <Input
                  id="token-name"
                  placeholder="Token Name"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input id="symbol" placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="supply">Total Supply</Label>
                <Input
                  id="supply"
                  type="number"
                  placeholder="Total Supply"
                  value={supply}
                  onChange={(e) => setSupply(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <Alert>
              <AlertTitle>Video Requirements</AlertTitle>
              <AlertDescription>Upload a short video meme (max 10 seconds) to attach to your token</AlertDescription>
            </Alert>

            {!previewUrl ? (
              <div className="grid gap-2">
                <Label htmlFor="video">Video Meme (10 seconds max)</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2" />
                      <p className="mb-2 text-sm text-center">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">MP4, WebM or MOV (MAX. 10s)</p>
                    </div>
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Video Preview</Label>
                  <Button variant="ghost" size="sm" onClick={removeVideo}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                  <video src={previewUrl} className="w-full h-full object-contain" controls muted />
                </div>
                <div className="flex items-center text-sm text-green-500">
                  <Check className="h-4 w-4 mr-1" />
                  Video ready for upload
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="initial-price">Initial Token Price</Label>
                  <span className="text-sm">${formatPrice(initialPrice)}</span>
                </div>
                <Slider
                  id="initial-price"
                  min={0.000001}
                  max={0.0001}
                  step={0.000001}
                  value={[initialPrice]}
                  onValueChange={(value) => setInitialPrice(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="target-cap">Target Market Cap</Label>
                  <span className="text-sm">${targetMarketCap.toLocaleString()}</span>
                </div>
                <Slider
                  id="target-cap"
                  min={10000}
                  max={100000}
                  step={1000}
                  value={[targetMarketCap]}
                  onValueChange={(value) => setTargetMarketCap(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="liquidity">Initial Liquidity</Label>
                  <span className="text-sm">{liquidityPercentage}%</span>
                </div>
                <Slider
                  id="liquidity"
                  min={5}
                  max={50}
                  step={1}
                  value={[liquidityPercentage]}
                  onValueChange={(value) => setLiquidityPercentage(value[0])}
                />
              </div>

              <div className="p-3 border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2">Bonding Curve Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Initial Price:</span>
                    <span>${formatPrice(initialPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Market Cap:</span>
                    <span>${targetMarketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Initial Liquidity:</span>
                    <span>${((targetMarketCap * liquidityPercentage) / 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {tokenMint && (
          <div className="p-3 border rounded-md bg-muted/50">
            <p className="font-medium">Token Created Successfully!</p>
            <p className="text-sm text-muted-foreground">Mint Address: {tokenMint}</p>
          </div>
        )}

        <Button
          onClick={createToken}
          disabled={isUploading || !videoFile || !tokenName || !symbol || !supply}
          className="w-full"
        >
          <Rocket className="mr-2 h-4 w-4" /> Launch Token
        </Button>
      </CardContent>
    </Card>
  )
}
