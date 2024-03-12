const express = require('express');
const app = express();

const user = [
  {
    id: 1,  
    username: "user01", 
   email: "user01@email.com",
   isActive: true
  }, 

  {
    id: 2,  
    username: "user02", 
   email: "user02@email.com",
   isActive: false
  }, 
  {
    id: 3,  
    username: "user03", 
   email: "user03@email.com",
   isActive: true
  }, 
]

app.get('/', (req, res) => {
  res.send('Save The Planet')
})

module.exports = app;
