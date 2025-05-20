// @page /
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const BoardContainer = styled(Box)({
  fontFamily: "'Press Start 2P', cursive",
  background: "#111",
  color: "#00ffcc",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
  backgroundImage: `radial-gradient(#222 1px, transparent 1px)`,
  backgroundSize: "16px 16px",
});

const ColumnsWrapper = styled(Box)({
  display: "flex",
  gap: "2rem",
  flexGrow: 1,
  justifyContent: "space-between",
  overflowX: "auto",
});

const Column = styled(Paper)({
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  border: "2px dashed #ff0099",
  boxShadow: "0 0 12px #ff0099",
  flex: 1,
  minWidth: "280px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh",
  overflowY: "auto",
});

const ColumnTitle = styled(Typography)({
  fontSize: "0.9rem",
  color: "#ffff00",
  textAlign: "center",
  marginBottom: "1rem",
});

const TaskCard = styled(Box)({
  backgroundColor: "#222",
  border: "1px solid #00ffcc",
  color: "#00ffcc",
  padding: "0.5rem",
  fontSize: "8px",
  marginBottom: "0.5rem",
  boxShadow: "0 0 5px #00ffcc",
});

const tasks = {
  todo: [
    "Implementar autenticação",
    "Criar layout do board",
    "Conectar com API",
  ],
  doing: ["Estilizar colunas"],
  done: ["Setup inicial do projeto", "Instalar dependências"],
};

const BoardPage: React.FC = () => {
  return (
    <BoardContainer>
      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", marginBottom: "2rem", textAlign: "center" }}>
        🎯 RETRO BOARD
      </Typography>
      <ColumnsWrapper>
        <Column>
          <ColumnTitle>📝 TO DO</ColumnTitle>
          {tasks.todo.map((task, i) => (
            <TaskCard key={i}>{task}</TaskCard>
          ))}
        </Column>
        <Column>
          <ColumnTitle>⏳ DOING</ColumnTitle>
          {tasks.doing.map((task, i) => (
            <TaskCard key={i}>{task}</TaskCard>
          ))}
        </Column>
        <Column>
          <ColumnTitle>✅ DONE</ColumnTitle>
          {tasks.done.map((task, i) => (
            <TaskCard key={i}>{task}</TaskCard>
          ))}
        </Column>
      </ColumnsWrapper>
    </BoardContainer>
  );
};

export default BoardPage;
