const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let todos = [];
let currentId = 1;

app.post('/api/todos', (req, res) => {
    const { title, completed = false } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const todo = { id: currentId++, title, completed };
    todos.push(todo);
    res.status(201).json(todo);
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(item => item.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;
    const todo = todos.find(item => item.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = todos.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
