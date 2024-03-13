const Joi = require("joi");
const express = require("express");
const app = express();

const users = [
  {
    id: 1,
    name: "user01",
    email: "user01@email.com",
    isActive: true,
  },

  {
    id: 2,
    name: "user02",
    email: "user02@email.com",
    isActive: false,
  },
  {
    id: 3,
    name: "user03",
    email: "user03@email.com",
    isActive: true,
  },
];

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Save The Planet");
});

//route handler for viewing all users
app.get("/users", (req, res) => {
  res.send(users);
});

//route handler for viewing user by id
app.get("/users/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));

  if (!findUser) {
    res.status(404).send("The user was not found");
    return;
  }

  res.send(findUser);
});

//route handler for creating a new user
app.post("/users", (req, res) => {
  const { error } = validateUserNameAndEmail(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isActiveAlwaysFalse = false;

  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    isActive: isActiveAlwaysFalse,
  };

  users.push(user);

  res.status(201).send(user);
});

// //route handler for updating a user
app.put("/users/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));
  if (!findUser) return res.status(404).send("The user was not found");

  findUser.name = req.body.name;
  findUser.email = req.body.email;
  findUser.isActive = req.body.isActive;

  res.send(findUser);
});

// way to validate input
function validateUserNameAndEmail(user) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    isActive: Joi.boolean()
  });

  return schema.validate(user);
}

//route handler to delete book
app.delete("/users/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));

  console.log(findUser);

  if (!findUser) return res.status(404).send("The user was not found");

  const index = users.indexOf(findUser);
  users.splice(index, 1);

  res.status(200).send("User successfully deleted");
});

module.exports = app;
