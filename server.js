const express = require('express');
const app = require('./app')
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})