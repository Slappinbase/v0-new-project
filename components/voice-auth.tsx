"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Play, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VoiceAuth() {
  const [isListening, setIsListening] = useState(false)
  const [command, setCommand] = useState("")
  const [status, setStatus] = useState("Ready to authenticate")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [swapQuotes, setSwapQuotes] = useState([])
  const [bondingCurve, setBondingCurve] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedCommands, setRecordedCommands] = useState([
    "Swap 10 SOL for USDC on Solana",
    "Launch token named MoonShot with symbol MOON",
    "Check bonding curve for token BONK",
  ])
  const progressIntervalRef = useRef(null)

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setStatus("Speech Recognition not supported")
    }
  }, [])

  useEffect(() => {
    if (isListening) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current)
            return 100
          }
          return prev + 5
        })
      }, 100)

      return () => {
        clearInterval(progressIntervalRef.current)
        setProgress(0)
      }
    }
  }, [isListening])

  const startListening = () => {
    // @ts-ignore - SpeechRecognition is not in the TypeScript types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setStatus("Speech Recognition not supported in your browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setStatus("Listening...")
    }

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript
      setCommand(transcript)
      setStatus("Processing voice...")

      try {
        // Mock authentication - in a real app, this would call the API
        setTimeout(() => {
          setStatus("Authenticated! Processing command...")
          parseCommand(transcript)
          setIsAuthenticated(true)
        }, 1000)
      } catch (error) {
        setStatus("Authentication failed. Try again.")
        setIsAuthenticated(false)
      }
    }

    recognition.onerror = () => {
      setStatus("Error in voice recognition")
      setIsListening(false)
    }

    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  const parseCommand = async (text) => {
    text = text.toLowerCase()
    if (text.includes("swap")) {
      const match = text.match(/swap (\d+) (\w+) for (\w+) on (\w+)/i)
      if (match) {
        const [, amount, fromToken, toToken, chain] = match
        try {
          // Mock swap quotes
          setSwapQuotes([
            { exchange: "Jupiter", rate: "1.2", toToken, fee: "0.1%" },
            { exchange: "Raydium", rate: "1.18", toToken, fee: "0.3%" },
            { exchange: "Orca", rate: "1.19", toToken, fee: "0.2%" },
          ])
          setStatus(`Swap quotes fetched: ${amount} ${fromToken} -> ${toToken} on ${chain}`)
        } catch (error) {
          setStatus("Swap failed")
        }
      } else {
        setStatus("Invalid swap command format")
      }
    } else if (text.includes("create token") || text.includes("launch token")) {
      const match = text.match(/launch token named (\w+) with symbol (\w+)/i)
      if (match) {
        const [, name, symbol] = match
        try {
          // Mock bonding curve
          setBondingCurve({
            symbol,
            progress: 45,
            marketCap: 31050,
          })
          setStatus(`Token ${name} (${symbol}) launched on bonding curve`)
        } catch (error) {
          setStatus("Token launch failed")
        }
      } else {
        setStatus("Invalid token launch command format")
      }
    } else if (text.includes("check bonding curve")) {
      const match = text.match(/check bonding curve for token (\w+)/i)
      if (match) {
        const [, symbol] = match
        try {
          // Mock bonding curve check
          setBondingCurve({
            symbol,
            progress: 65,
            marketCap: 44850,
          })
          setStatus(`Bonding curve for ${symbol}: 65%`)
        } catch (error) {
          setStatus("Failed to check bonding curve")
        }
      }
    }
  }

  const playRecordedCommand = (command) => {
    setCommand(command)
    setStatus("Processing recorded command...")

    setTimeout(() => {
      parseCommand(command)
      setIsAuthenticated(true)
    }, 1000)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SolXtreme Voice Order System</CardTitle>
            <CardDescription>Use voice commands to execute trades and launch tokens</CardDescription>
          </div>
          {isAuthenticated && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Authenticated
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voice">Live Voice</TabsTrigger>
            <TabsTrigger value="recorded">Recorded Commands</TabsTrigger>
          </TabsList>
          <TabsContent value="voice" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm">{status}</span>
              </div>
              {command && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Last Command:</span>
                  <span className="text-sm">{command}</span>
                </div>
              )}
            </div>

            {isListening && <Progress value={progress} className="h-2" />}

            <Button
              onClick={startListening}
              disabled={isListening}
              className="w-full"
              variant={isListening ? "secondary" : "default"}
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Listening...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Voice Command
                </>
              )}
            </Button>

            {swapQuotes.length > 0 && (
              <div className="mt-4 border rounded-md p-3">
                <h3 className="text-lg font-semibold mb-2">Swap Quotes</h3>
                <ul className="space-y-2">
                  {swapQuotes.map((quote, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{quote.exchange}:</span>
                      <span>
                        {quote.rate} {quote.toToken} (Fee: {quote.fee})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {bondingCurve && (
              <div className="mt-4 border rounded-md p-3">
                <h3 className="text-lg font-semibold mb-2">Bonding Curve Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Token:</span>
                    <span>{bondingCurve.symbol}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span>{bondingCurve.progress}%</span>
                    </div>
                    <Progress value={bondingCurve.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap:</span>
                    <span>${bondingCurve.marketCap}</span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="recorded" className="space-y-4">
            <Alert>
              <AlertTitle>Recorded Voice Commands</AlertTitle>
              <AlertDescription>Play pre-recorded commands to test the system</AlertDescription>
            </Alert>
            <div className="space-y-2">
              {recordedCommands.map((cmd, index) => (
                <div key={index} className="flex items-center justify-between border p-2 rounded-md">
                  <span className="text-sm">{cmd}</span>
                  <Button variant="ghost" size="sm" onClick={() => playRecordedCommand(cmd)}>
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "outline"} className="w-full">
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Record New Command
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
