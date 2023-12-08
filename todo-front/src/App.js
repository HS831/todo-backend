import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [updatedTodoText, setUpdatedTodoText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async () => {
    try {
      await axios.post('http://localhost:3001/todos', { todo: newTodo });
      fetchTodos();
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = (id) => {
    setUpdateModalOpen(true);
    setSelectedTodoId(id);
  };

  const handleModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedTodoId('');
    setUpdatedTodoText('');
  };

  const handleModalUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3001/todos/${selectedTodoId}`, { todo: updatedTodoText });
      fetchTodos();
      handleModalClose();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <TextField
          fullWidth
          label="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
          onClick={handleCreateTodo}
        >
          Add Todo
        </Button>
        <List style={{ marginTop: '1rem' }}>
          {todos.map((todo) => (
            <ListItem key={todo._id} sx={{ border: '1px solid #ccc', borderRadius: '8px', margin: '0.5rem 0' }}>
              <ListItemText primary={todo.todo} />
              <IconButton color="secondary" onClick={() => handleDeleteTodo(todo._id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => handleUpdateTodo(todo._id)}>
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>

      {/* Update Todo Modal */}
      <Dialog open={isUpdateModalOpen} onClose={handleModalClose}>
        <DialogTitle>Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Updated Todo"
            value={updatedTodoText}
            onChange={(e) => setUpdatedTodoText(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModalUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
