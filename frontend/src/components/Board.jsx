import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
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

export default function Board({
  selectedCards,
  disabledCards,
  onCardSelect,
  openDialog,
  selectedSuit,
  onOpenDialog,
  onCloseDialog,
  onSuitSelect
}) {
  const handleCardSelect = (rank) => {
    if (selectedSuit) {
      const cardKey = `${rank}_${selectedSuit}`;
      const newCard = { rank, suit: selectedSuit, image: cardImages[cardKey] };
      onCardSelect(openDialog.cardIndex, newCard);
      onCloseDialog();
    }
  };

  // Add helper function to determine if a card slot should be disabled
  const isCardSlotDisabled = (index) => {
    const selectedCount = selectedCards.filter(Boolean).length;
    // If we have 1 or 2 cards and trying to add a non-flop card
    if (selectedCount < 3 && index > 2) return true;
    // If we're adding flop cards, they must be added in order
    if (index > 0 && !selectedCards[index - 1]) return true;
    return false;
  };

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
      {selectedCards.map((card, index) => (
        <Box
          key={index}
          onClick={() => !isCardSlotDisabled(index) && onOpenDialog(index)}
          sx={{
            width: 80,
            height: 112,
            bgcolor: card?.image ? "transparent" : "grey.700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: card?.image ? 0 : 1,
            cursor: isCardSlotDisabled(index) ? "not-allowed" : "pointer",
            backgroundImage: card?.image ? `url(${card.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: isCardSlotDisabled(index) ? 0.5 : 1,
            "&:hover": { transform: isCardSlotDisabled(index) ? "none" : "scale(1.05)" },
            // Add visual grouping for flop cards
            border: index < 3 ? "2px solid #4caf50" : "none",
            position: "relative",
          }}
        >
          {!card && (
            <Typography 
              variant="h6" 
              color="white"
              sx={{ 
                opacity: isCardSlotDisabled(index) ? 0.5 : 1 
              }}
            >
              +
            </Typography>
          )}
          {/* Add labels for turn and river */}
          {!card && index === 3 && (
            <Typography
              sx={{
                position: "absolute",
                bottom: -20,
                fontSize: "0.8rem",
              }}
            >
              Turn
            </Typography>
          )}
          {!card && index === 4 && (
            <Typography
              sx={{
                position: "absolute",
                bottom: -20,
                fontSize: "0.8rem",
              }}
            >
              River
            </Typography>
          )}
        </Box>
      ))}

      <Dialog open={openDialog.open} onClose={onCloseDialog}>
        <DialogTitle>Select Card</DialogTitle>
        <DialogContent>
          <Typography>Select Suit:</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
            {suits.map((suit) => (
              <Button
                key={suit}
                variant={selectedSuit === suit ? "contained" : "outlined"}
                onClick={() => onSuitSelect(suit)}
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
