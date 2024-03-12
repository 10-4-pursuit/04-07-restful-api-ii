const Joi = require('joi')
const express = require('express');
const app = express();

const users = [
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

//middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Save The Planet')
})

 //route handler for viewing all users
 app.get("/users", (req, res) => {
  res.send(users);
});

 //route handler for viewing user by id
 app.get("/users/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));

  if (!findUser) {
    res.status(404).send("The user was not found");
    return
  }

  res.send(findUser); 
});

  //route handler for creating a new user
  app.post("/users", (req, res) => {
    const { error } = validateUserNameAndEmail(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const isActiveAlwaysFalse = false
      
  const user = {
    id: users.length + 1,
    username: req.body.username,
    email: req.body.email,
    isactive: isActiveAlwaysFalse
  };

  users.push(user);

  res.status(201).send(user); 
});

// way to validate input
function validateUserNameAndEmail(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required()
  })

 return schema.validate(user);
}


module.exports = app;
