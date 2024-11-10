import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import InputCard from "./InputCard";
import Chart from "./Chart";
import Board from "./Board";
import "@fontsource/poppins";
import "@fontsource/jetbrains-mono";
import axiosInstance from "../../axiosInstance.js"; // Add this import

const theme = createTheme({
  typography: {
    fontFamily: '"JetBrains Mono", monospace',
  },
  palette: {
    mode: "light",
    primary: { main: "#4caf50" },
    background: { paper: "lightgrey" },
  },
});

const convertToTreyFormat = (card) => {
  if (!card) return null;
  const rankMap = {
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "T",
    J: "J",
    Q: "Q",
    K: "K",
    A: "A",
  };
  const suitMap = {
    hearts: "h",
    diamonds: "d",
    clubs: "c",
    spades: "s",
  };
  return `${rankMap[card.rank]}${suitMap[card.suit]}`;
};

export default function PokerSimulator() {
  // State to track selected cards in both InputCard and Board
  const [selectedCards, setSelectedCards] = useState({
    input: [null, null],
    board: [null, null, null, null, null],
  });

  // Disabled cards array based on selected cards
  const [disabledCards, setDisabledCards] = useState([]);

  // State for player count and risk tolerance
  const [playerCount, setPlayerCount] = useState(1);
  const [riskTolerance, setRiskTolerance] = useState(0);

  // Add board dialog state and handlers
  const [boardDialog, setBoardDialog] = useState({
    open: false,
    cardIndex: null,
  });
  const [boardSelectedSuit, setBoardSelectedSuit] = useState(null);

  // Add simulation state
  const [simulationResults, setSimulationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Update selected cards and disabled cards whenever a card is selected
  const handleCardSelect = (source, index, card) => {
    const updatedSelectedCards = { ...selectedCards };
    updatedSelectedCards[source][index] = card;
    setSelectedCards(updatedSelectedCards);

    // Update disabledCards based on all selected cards
    const allSelected = [
      ...updatedSelectedCards.input,
      ...updatedSelectedCards.board,
    ];
    const newDisabledCards = allSelected
      .filter((c) => c)
      .map((c) => `${c.rank}_${c.suit}`);
    setDisabledCards(newDisabledCards);
  };

  // Handlers for player count and risk tolerance
  const handlePlayerCountChange = (count) => {
    setPlayerCount(count);
  };

  const handleRiskToleranceChange = (value) => {
    setRiskTolerance(value);
  };

  const handleBoardDialogOpen = (index) => {
    setBoardDialog({ open: true, cardIndex: index });
  };

  const handleBoardDialogClose = () => {
    setBoardDialog({ open: false, cardIndex: null });
    setBoardSelectedSuit(null);
  };

  const handleBoardSuitSelect = (suit) => {
    setBoardSelectedSuit(suit);
  };

  const handleSimulate = async () => {
    const playerCards = selectedCards.input
      .map(convertToTreyFormat)
      .filter(Boolean);
    const boardCards = selectedCards.board
      .map(convertToTreyFormat)
      .filter(Boolean);

    if (playerCards.length !== 2) {
      alert("Please select both player cards");
      return;
    }

    // Add board validation
    if (boardCards.length > 0 && boardCards.length < 3) {
      alert(
        "If adding community cards, you must select at least 3 cards (the flop)"
      );
      return;
    }

    setIsSimulating(true);
    try {
      const response = await axiosInstance.post("/simulate", {
        player_hand: playerCards,
        board: boardCards,
        num_opponents: playerCount - 1,
        stage: boardCards.length,
        risk_tolerance: riskTolerance,
      });
      console.log("Simulation results:", response.data);
      setSimulationResults(response.data);
    } catch (error) {
      console.error("Simulation failed:", error);
      alert("Failed to simulate hand");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Main Container */}
      <Box
        sx={{
          width: "65vw",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "auto",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "85%",
            gap: 3,
            mb: 3,
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          {/* Left column: InputCard */}
          <Box sx={{ flex: "0 1 40%" }}>
            <InputCard
              selectedCards={selectedCards.input}
              disabledCards={disabledCards}
              onCardSelect={(index, card) =>
                handleCardSelect("input", index, card)
              }
              playerCount={playerCount}
              onPlayerCountChange={handlePlayerCountChange}
              riskTolerance={riskTolerance}
              onRiskToleranceChange={handleRiskToleranceChange}
              onSimulate={handleSimulate}
              isSimulating={isSimulating}
            />
          </Box>

          {/* Right column: Chart and Board */}
          <Box
            sx={{
              flex: "0 1 55%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {/* Chart */}
            <Box sx={{ flex: "1 0 auto" }}>
              <Chart />
            </Box>

            {/* Board */}
            <Box sx={{ flex: "0 0 auto" }}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", width: "100%", marginBottom: 2 }}
                gutterBottom
              >
                Community Board
              </Typography>
              <Board
                selectedCards={selectedCards.board}
                disabledCards={disabledCards}
                onCardSelect={(index, card) =>
                  handleCardSelect("board", index, card)
                }
                openDialog={boardDialog}
                selectedSuit={boardSelectedSuit}
                onOpenDialog={handleBoardDialogOpen}
                onCloseDialog={handleBoardDialogClose}
                onSuitSelect={handleBoardSuitSelect}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "85%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            margin: "auto",
            border: "2px solid grey",
            borderRadius: 2,
            p: 3,
            bgcolor: "background.paper",
          }}
        ></Box>
      </Box>
    </ThemeProvider>
  );
}
