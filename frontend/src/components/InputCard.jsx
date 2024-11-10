import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Slider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import cardImages from "../assets/cardImages";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export default function InputCard({
  selectedCards,
  disabledCards,
  onCardSelect,
  opponentCount,
  onopponentCountChange,
  riskTolerance,
  onRiskToleranceChange,
  onSimulate,
  isSimulating,
}) {
  const [openDialog, setOpenDialog] = useState({
    open: false,
    cardIndex: null,
  });
  const [selectedSuit, setSelectedSuit] = useState(null);

  const openCardDialog = (index) =>
    setOpenDialog({ open: true, cardIndex: index });
  const closeCardDialog = () => {
    setOpenDialog({ open: false, cardIndex: null });
    setSelectedSuit(null);
  };

  const handleCardSelect = (rank) => {
    if (selectedSuit) {
      const cardKey = `${rank}_${selectedSuit}`;
      const newCard = { rank, suit: selectedSuit, image: cardImages[cardKey] };
      onCardSelect(openDialog.cardIndex, newCard);
      closeCardDialog();
    }
  };

  const incrementPlayers = () =>
    onopponentCountChange(Math.min(opponentCount + 1, 9));
  const decrementPlayers = () =>
    onopponentCountChange(Math.max(opponentCount - 1, 1));

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "grey.200",
        p: 3,
        borderRadius: 2,
        justifyItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          width: "100%",
          marginBottom: 2,
          fontWeight: 1000,
          fontSize: 20,
          fontStyle: "italic",
          fontFamily: "Roboto, sans-serif",
        }}
        gutterBottom
      >
        Poker Hand Input
      </Typography>

      {/* Card Selector Section */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
        {selectedCards.map((card, index) => (
          <Box
            key={index}
            onClick={() => openCardDialog(index)}
            sx={{
              width: 90,
              height: 122,
              bgcolor: card?.image ? "transparent" : "grey.700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: card?.image ? 0 : 1,
              cursor: "pointer",
              backgroundImage: card?.image ? `url(${card.image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            {!card && (
              <Typography variant="h6" color="white">
                +
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* opponent counter Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ marginRight: 1 }}>Opponent Count: </Typography>
        <TextField
          variant="outlined"
          type="number"
          value={opponentCount}
          onChange={(e) =>
            onopponentCountChange(
              Math.max(1, Math.min(9, Number(e.target.value)))
            )
          }
          inputProps={{ min: 1, max: 9, style: { textAlign: "center" } }}
          sx={{ width: 80 }}
        />
        <IconButton
          onClick={decrementPlayers}
          color="primary"
          disabled={opponentCount <= 1}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          onClick={incrementPlayers}
          color="primary"
          disabled={opponentCount >= 9}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Slider Section */}
      <Box sx={{ width: "80%", mx: "auto", mb: 2 }}>
        <Typography gutterBottom>
          {" "}
          Risk Tolerance: {riskTolerance.toFixed(2)}{" "}
        </Typography>
        <Slider
          value={riskTolerance}
          min={0}
          max={1}
          step={0.01}
          onChange={(e, newValue) => onRiskToleranceChange(newValue)}
        />
      </Box>

      {/* Buttons Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          color="info"
          sx={{ width: "95%" }}
          onClick={onSimulate}
          disabled={isSimulating}
        >
          {isSimulating ? "Simulating..." : "Simulate"}
        </Button>
      </Box>

      {/* Card Selection Dialog */}
      <Dialog open={openDialog.open} onClose={closeCardDialog}>
        <DialogTitle>Select Card</DialogTitle>
        <DialogContent>
          <Typography>Select Suit:</Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            {suits.map((suit) => (
              <Button
                key={suit}
                variant={selectedSuit === suit ? "contained" : "outlined"}
                onClick={() => setSelectedSuit(suit)}
              >
                {suit.charAt(0).toUpperCase() + suit.slice(1)}
              </Button>
            ))}
          </Box>
          {selectedSuit && (
            <>
              <Typography>Select Rank:</Typography>
              <Grid container spacing={1} justifyContent="center">
                {ranks.map((rank) => {
                  const isDisabled = disabledCards.includes(
                    `${rank}_${selectedSuit}`
                  );
                  return (
                    <Grid item key={rank}>
                      <Button
                        variant="outlined"
                        onClick={() => handleCardSelect(rank)}
                        disabled={isDisabled}
                        sx={{ opacity: isDisabled ? 0.5 : 1 }}
                      >
                        {rank}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
