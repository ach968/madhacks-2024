import React, { useState } from 'react';
import { Box, Menu, MenuItem, Button } from '@mui/material';

const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export default function CardSelector({ selected, disabled, onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (card) => {
    onSelect(card);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          width: 60,
          height: 84,
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
        }}
      >
        {selected || '?'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {suits.map(suit => (
          ranks.map(rank => {
            const card = `${rank}${suit}`;
            return (
              <MenuItem
                key={card}
                onClick={() => handleSelect(card)}
                disabled={disabled.has(card)}
              >
                {card}
              </MenuItem>
            );
          })
        ))}
      </Menu>
    </>
  );
}
