const express = require('express')
const app = express()

app.use(express.json())

const users = [
    { id: 1, username: "user1", email: "user1@example.com", isActive: true },
    { id: 2, username: "user2", email: "user2@example.com", isActive: false },
    { id: 3, username: "user3", email: "user3@example.com", isActive: true },
    { id: 4, username: "user4", email: "user4@example.com", isActive: true }
];

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const {username, email, isActive} = req.body
    const newUser= {
        id: users.length + 1,
        username: username,
        email: email,
        isActive: isActive !== undefined ? isActive : true
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    res.status(200).send(user)
})

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {username, email, isActive} = req.body
    const index = users.findIndex(user => user.id === id)
    users[index] = {id, username, email, isActive: isActive!== undefined ? isActive : true}
    res.status(200).send(users[index])
})

app.delete('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.send("User successfully deleted")
})

module.exports = app