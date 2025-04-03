const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching post ${req.params.id}:`, error.message);
        res.status(error.response?.status || 500).json({ 
            error: error.response?.status === 404 
                ? 'Post not found' 
                : 'Failed to fetch post' 
        });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error(`Error updating post ${req.params.id}:`, error.message);
        res.status(error.response?.status || 500).json({ 
            error: error.response?.status === 404 
                ? 'Post not found' 
                : 'Failed to update post' 
        });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/posts/${req.params.id}`);
        res.status(204).end();
    } catch (error) {
        console.error(`Error deleting post ${req.params.id}:`, error.message);
        res.status(error.response?.status || 500).json({ 
            error: error.response?.status === 404 
                ? 'Post not found' 
                : 'Failed to delete post' 
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
