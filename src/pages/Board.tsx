// @page /
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { DeleteOutline as DeleteIcon } from "@mui/icons-material";
import UIComponents from "src/ui-components";
import { DrawerWrapperRef } from "src/components/ui/DrawerWrapper";
import { FormHandle } from "src/components/ui/form/Form";

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

const TaskCard = styled("div")({
  position: "relative",
  borderRadius: "8px",
  background: "#fff",
  backgroundColor: "#222",
  border: "1px solid #00ffcc",
  color: "#00ffcc",
  padding: "0.5rem",
  fontSize: "8px",
  marginBottom: "0.5rem",
  boxShadow: "0 0 5px #00ffcc",
  "& .delete-icon": {
    display: "none",
    position: "absolute",
    top: "0",
    right: "0.5rem",
  },
  "&:hover .delete-icon": {
    display: "block",
  },
});

// Estado inicial das tarefas
const initialTasks = [
  {
    projectName: "Test",
    todo: [
      "Implementar autenticação",
      "Criar layout do board",
      "Conectar com API",
    ],
    doing: ["Estilizar colunas"],
    done: ["Setup inicial do projeto", "Instalar dependências"],
  },
  {
    projectName: "Novo Projeto",
    todo: ["Analisar requisitos"],
    doing: [],
    done: ["Kickoff"],
  },
];

type ColumnType = "todo" | "doing" | "done";

const BoardPage: React.FC = () => {
  const [projects, setProjects] = useState(initialTasks);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentProject = projects[selectedIndex];

  const { setHandlerOnAddTask } = useContext(UIComponents.RetroHeaderContext);

  const formRef = useRef<FormHandle>(null);

  const model = {
    taskName: "",
  };

  const drawerRef = useRef<DrawerWrapperRef>(null);

  useEffect(() => {
    setHandlerOnAddTask(() => () => {
      // const currentProject = projects[selectedIndex];
      // currentProject.done.push();

      drawerRef.current.openDrawer();
    });
  }, [setHandlerOnAddTask]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedProjects = [...projects];
    const project = { ...updatedProjects[selectedIndex] };

    const sourceCol = source.droppableId as ColumnType;
    const destCol = destination.droppableId as ColumnType;

    const sourceList = Array.from(project[sourceCol]);
    const destList = Array.from(project[destCol]);
    const [moved] = sourceList.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceList.splice(destination.index, 0, moved);
      project[sourceCol] = sourceList;
    } else {
      destList.splice(destination.index, 0, moved);
      project[sourceCol] = sourceList;
      project[destCol] = destList;
    }

    updatedProjects[selectedIndex] = project;
    setProjects(updatedProjects);
  };

  const deleteTask = (column: string, taskIndex: number) => {
    const updatedProjects = [...projects];
    const project = updatedProjects[selectedIndex];

    project[column] = project[column].filter((_, index) => index !== taskIndex);

    setProjects(updatedProjects);
  };

  const handleSubmit = async () => {
    const errors = await formRef.current?.validate();
    if (errors && errors.length === 0) {
      alert("Formulário válido!");
      // Aqui você pode continuar com o envio do formulário
    }
  };

  return (
    <BoardContainer>
      <Select
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
        sx={{
          marginBottom: "2rem",
          width: "15rem",
          height: "2rem",
          backgroundColor: "#ffffff",
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "10px",
        }}>
        {projects.map((proj, idx) => (
          <MenuItem key={idx} value={idx}>
            {proj.projectName}
          </MenuItem>
        ))}
      </Select>

      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", marginBottom: "1rem", textAlign: "center" }}>
        🎯 RETRO BOARD
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnsWrapper>
          {["todo", "doing", "done"].map((columnKey) => (
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
                  {Array.isArray(
                    currentProject[columnKey as keyof typeof currentProject]
                  ) &&
                    (
                      currentProject[
                        columnKey as keyof typeof currentProject
                      ] as string[]
                    ).map((task, index) => (
                      <Draggable key={task} draggableId={task} index={index}>
                        {(provided) => (
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            {task}
                            <IconButton
                              className="delete-icon"
                              onClick={() => deleteTask(columnKey, index)}
                              sx={{
                                color: "#ff0099",
                                padding: 0,
                              }}>
                              <DeleteIcon sx={{ fontSize: "1.2rem" }} />
                            </IconButton>
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

      <UIComponents.DrawerWrapper ref={drawerRef}>
        <UIComponents.Form
          ref={formRef}
          model={model}
          labelWidth={6}
          sx={{ backgroundColor: "#f9f9f9", padding: 2, borderRadius: 2 }}>
          <UIComponents.FormItem label="Tarefa" field="taskName" required>
            <TextField fullWidth size="small" name="taskName" />
          </UIComponents.FormItem>
          <Button onClick={handleSubmit} variant="contained">
            Salvar
          </Button>
        </UIComponents.Form>
      </UIComponents.DrawerWrapper>
    </BoardContainer>
  );
};

export default BoardPage;
