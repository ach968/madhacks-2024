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
import axiosInstance from "../../axiosInstance.js";

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

  // State for opponent count and risk tolerance
  const [opponentCount, setopponentCount] = useState(1);
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

  const handleClearBoard = () => {
    const updatedSelectedCards = {
      ...selectedCards,
      board: [null, null, null, null, null],
    };
    setSelectedCards(updatedSelectedCards);

    // Update disabled cards to only include input cards
    const newDisabledCards = updatedSelectedCards.input
      .filter((c) => c)
      .map((c) => `${c.rank}_${c.suit}`);
    setDisabledCards(newDisabledCards);
  };

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

  // Handlers for opponent count and risk tolerance
  const handleopponentCountChange = (count) => {
    setopponentCount(count);
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

    if (boardCards.length > 0 && boardCards.length < 3) {
      alert(
        "If adding community cards, you must select at least 3 cards (the flop)"
      );
      return;
    }

    setIsSimulating(true);
    setSimulationResults(null); // Reset previous results

    try {
      const response = await axiosInstance.post("/simulate", {
        stage: boardCards.length,
        num_opponents: opponentCount,
        player_hand: playerCards,
        board: boardCards,
        risk_tolerance: riskTolerance,
      });

      console.log("API Response:", response); // Debug log
      console.log("Response data:", response.data); // Debug log

      // Make sure we're setting the simulation results with the correct data structure
      if (
        response.data &&
        typeof response.data.win_pct === "number" &&
        typeof response.data.sd === "number"
      ) {
        setSimulationResults({
          win_pct: response.data.win_pct,
          sd: response.data.sd,
          breakeven_pct: response.data.breakeven_pct,
          optimal_raise: response.data.optimal_raise,
        });
      } else {
        console.error("Invalid response format:", response.data);
        alert("Invalid response format from server");
      }
    } catch (error) {
      console.error("Simulation failed:", error);
      console.error("Error response:", error.response); // Debug log
      alert(
        "Failed to simulate hand: " +
          (error.response?.data?.message || error.message)
      );
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
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 32,
            marginBottom: 6,
            marginTop: -4,
            fontStyle: "italic",
            fontWeight: 1000,
            fontFamily: "sans-serif",
          }}
        >
          Poker Simulation - A Mathematical Approach
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "85%",
            gap: 0, // Changed from 2.5 to 1
            mb: 2.5,
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
              opponentCount={opponentCount}
              onopponentCountChange={handleopponentCountChange}
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
              gap: 1,
            }}
          >
            {/* Chart */}
            <Box sx={{ flex: "1 0 auto" }}>
              <Chart simulationResults={simulationResults} />
            </Box>

            {/* Board */}
            <Box sx={{ flex: "0 0 auto" }}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  marginBottom: 2,
                  fontWeight: 1000,
                  fontSize: "1.3rem",
                  fontFamily: "Roboto, sans-serif",
                  fontStyle: "italic",
                }}
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
                onClearBoard={handleClearBoard}
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
        >
          {simulationResults?.optimal_raise && (
            <Typography>
              You should raise {simulationResults.optimal_raise.toFixed(2)}% of
              your bankroll on this game.
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
