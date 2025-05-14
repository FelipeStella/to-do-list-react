import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const clickSound = new Audio("/assets/sounds/click-8bit.wav");

const RetroAppBar = styled(AppBar)({
  fontFamily: "'Press Start 2P', cursive",
  background: 'linear-gradient(90deg, #ff0099, #6600ff)',
  color: '#fff',
  boxShadow: '0 4px 0 #000',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 10,
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 2px
    )`,
    pointerEvents: 'none',
    animation: 'flicker 0.2s infinite',
    zIndex: 1,
  },
  '@keyframes flicker': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.8 },
  },
});

const RetroButton = styled(Button)({
  color: '#00ffcc',
  border: '2px solid #00ffcc',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  fontFamily: "'Press Start 2P', cursive",
  fontSize: '10px',
  padding: '4px 8px',
  '&:hover': {
    borderColor: '#ffff00',
    color: '#ffff00',
  },
});

const RetroHeader: React.FC = () => {
  const playSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  return (
    <RetroAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", zIndex: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <span style={{ fontSize: "20px" }}>💾</span>
          <Typography variant="h6" sx={{ fontSize: "14px" }}>
            TO-DO RETRÔ
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            onClick={playSound} sx={{ color: '#00ffcc', fontSize: '10px', fontFamily: "'Press Start 2P', cursive", '&:hover': { color: '#ffff00' } }}>
            Início
          </Button>
          <Button onClick={playSound} sx={{ color: '#00ffcc', fontSize: '10px', fontFamily: "'Press Start 2P', cursive", '&:hover': { color: '#ffff00' } }}>
            Tarefas
          </Button>
          <Button onClick={playSound} sx={{ color: '#00ffcc', fontSize: '10px', fontFamily: "'Press Start 2P', cursive", '&:hover': { color: '#ffff00' } }}>
            Opções
          </Button>
          <RetroButton onClick={playSound}>➕ Nova Tarefa</RetroButton>
        </Box>
      </Toolbar>
    </RetroAppBar>
  );
};

export default RetroHeader;
