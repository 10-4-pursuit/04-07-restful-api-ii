const express = require("express");
const app = express();
const users = [];

app.use(express.json());

app.post('/users', (req, res) => {
    const { name, email, isActive } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
        isActive
    };
    users.push(newUser);
    res.status(201).send(newUser)
});

app.get('/users', (req, res) => {
    res.json(users)
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json("User not found")
    }
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) {
        const updatedUser = { ...users[index], ...req.body };
        users[index] = updatedUser;
        res.json(updatedUser);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).send({ message: 'User successfully deleted' })
    } else {
        res.status(404).send({ error: 'User not found' })
    }
});

module.exports = app;