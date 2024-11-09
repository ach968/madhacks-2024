import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PokerSimulator() {
  const [hand, setHand] = useState("")
  const [opponents, setOpponents] = useState(1)
  const [board, setBoard] = useState("")
  const [winProbability, setWinProbability] = useState<number | null>(null)

  const simulateHand = () => {
    // Mock win probability
    const mockProbability = Math.random() * 100
    setWinProbability(Number(mockProbability.toFixed(2)))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Poker Hand Simulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hand">Your Hand (e.g., "AhKs")</Label>
          <Input
            id="hand"
            value={hand}
            onChange={(e) => setHand(e.target.value)}
            placeholder="Enter your hand"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="opponents">Number of Opponents</Label>
          <Input
            id="opponents"
            type="number"
            min="1"
            max="9"
            value={opponents}
            onChange={(e) => setOpponents(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="board">Board Cards (e.g., "Jc9d2h")</Label>
          <Input
            id="board"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            placeholder="Enter board cards"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <Button onClick={simulateHand} className="w-full">
          Simulate
        </Button>
        {winProbability !== null && (
          <div className="text-lg font-semibold">
            Win Probability: {winProbability}%
          </div>
        )}
      </CardFooter>
    </Card>
  )
}