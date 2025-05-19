// @page /to-do-list
import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const PageContainer = styled(Box)({
  padding: "2rem",
  backgroundColor: "#1a1a2e",
  minHeight: "100vh",
  fontFamily: "'Press Start 2P', cursive",
  color: "#00ffcc",
});

const TaskBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#121212",
  padding: "0.5rem 1rem",
  marginBottom: "0.5rem",
  border: "2px solid #00ffcc",
  borderRadius: "4px",
  boxShadow: "0 2px 0 #000",
});

const RetroInput = styled(TextField)({
  input: {
    color: "#00ffcc",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "12px",
    padding: "8px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00ffcc",
    },
    "&:hover fieldset": {
      borderColor: "#ffff00",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff0099",
    },
  },
  width: "100%",
});

const ToDoPage: React.FC = () => {
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        📋 Minhas Tarefas
      </Typography>

      <Box display="flex" gap={1} mb={3}>
        <RetroInput
          variant="outlined"
          value={newTask}
          placeholder="Digite nova tarefa"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <IconButton onClick={addTask} sx={{ color: "#00ffcc" }}>
          <AddIcon />
        </IconButton>
      </Box>

      {tasks.map((task, index) => (
        <TaskBox key={index}>
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={task.done}
              onChange={() => toggleTask(index)}
              sx={{
                color: "#00ffcc",
                "&.Mui-checked": { color: "#ffff00" }
              }}
            />
            <Typography
              sx={{
                textDecoration: task.done ? "line-through" : "none",
                fontSize: "10px",
                color: task.done ? "#888" : "#00ffcc",
              }}>
              {task.text}
            </Typography>
          </Box>
          <IconButton
            onClick={() => deleteTask(index)} sx={{ color: "#ff0099" }}>
            <DeleteIcon />
          </IconButton>
        </TaskBox>
      ))}
    </PageContainer>
  );
};

export default ToDoPage;
