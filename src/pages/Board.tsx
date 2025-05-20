// @page /
import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

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

// Estado inicial das tarefas
const initialTasks = {
  todo: [
    "Implementar autenticação",
    "Criar layout do board",
    "Conectar com API",
  ],
  doing: ["Estilizar colunas"],
  done: ["Setup inicial do projeto", "Instalar dependências"],
};

const BoardPage: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Se o drop foi fora de uma área válida, não faz nada
    if (!destination) return;

    // Mesma coluna: reordenar
    if (source.droppableId === destination.droppableId) {
      const columnTasks = Array.from(
        tasks[source.droppableId as keyof typeof tasks]
      );
      const [moved] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, moved);

      setTasks({
        ...tasks,
        [source.droppableId]: columnTasks,
      });
    } else {
      // Mover entre colunas
      const sourceTasks = Array.from(
        tasks[source.droppableId as keyof typeof tasks]
      );
      const destTasks = Array.from(
        tasks[destination.droppableId as keyof typeof tasks]
      );
      const [moved] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, moved);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      });
    }
  };
  return (
    <BoardContainer>
      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", marginBottom: "2rem", textAlign: "center" }}>
        🎯 RETRO BOARD
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnsWrapper>
          {Object.entries(tasks).map(([columnKey, taskList]) => (
            <Droppable key={columnKey} droppableId={columnKey}>
              {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  <ColumnTitle>
                    {columnKey === "todo"
                      ? "📝 TO DO"
                      : columnKey === "doing"
                        ? "⏳ DOING"
                        : "✅ DONE"}
                  </ColumnTitle>
                  {taskList.map((task, index) => (
                    <Draggable key={task} draggableId={task} index={index}>
                      {(provided) => (
                        <TaskCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {task}
                        </TaskCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </ColumnsWrapper>
      </DragDropContext>
    </BoardContainer>
  );
};

export default BoardPage;
