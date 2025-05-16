// @page /home
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Efeito piscando (como terminal)
const blink = keyframes`
  0%, 100% { opacity: 1 }
  50% { opacity: 0 }
`;

const RetroContainer = styled(Box)({
  fontFamily: "'Press Start 2P', cursive",
  background: "#111",
  color: "#00ffcc",
  padding: "2rem",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundImage: `radial-gradient(#222 1px, transparent 1px)`,
  backgroundSize: "16px 16px",
  overflow: "hidden",
});

const NeonBox = styled(Box)({
  border: "2px dashed #ff0099",
  padding: "1.5rem",
  maxWidth: "600px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  boxShadow: "0 0 15px #ff0099",
  position: "relative",
  marginBottom: "2rem",
});

const TerminalLine = styled("p")({
  fontSize: "10px",
  color: "#00ffcc",
  whiteSpace: "pre-wrap",
  margin: "0",
  "& span.blink": {
    animation: `${blink} 1s step-start infinite`,
  },
});

const RetroButton = styled(Button)({
  color: "#00ffcc",
  border: "2px solid #00ffcc",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  fontFamily: "'Press Start 2P', cursive",
  fontSize: "10px",
  padding: "6px 12px",
  marginTop: "1rem",
  "&:hover": {
    borderColor: "#ffff00",
    color: "#ffff00",
  },
});

const HomePage: React.FC = () => {
  const playSound = () => {
    const sound = new Audio("/src/assets/sounds/start-game.mp3");
    sound.play();
  };

  return (
    <RetroContainer>
      <NeonBox>
        <Typography
          variant="h4"
          sx={{ fontSize: "16px", marginBottom: "1rem" }}>
          👾 Bem-vindo ao TO-DO RETRÔ!
        </Typography>

        <TerminalLine>
          Iniciando sistema...
          <br />
          Carregando tarefas<span className="blink">_</span>
        </TerminalLine>

        <RetroButton onClick={playSound}>🎮 Começar Agora</RetroButton>
      </NeonBox>
    </RetroContainer>
  );
};

export default HomePage;
