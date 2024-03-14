const express = require('express');
const app = express();

app.use(express.json());

let customers = [];

// GET /users: List all users.
app.get('/customers', (req, res) => {
    res.json(customers);
});

// POST /users: Create a new user.
app.post("/customers", (req, res) => {
    const { name, email, isActive } = req.body;
    const customer = { id: Date.now(), name, email, isActive };
    customers.push(customer);
    res.status(201).json(customer);
  });
  
  // GET /users/:id: Retrieve details of a specific user by ID.
  app.get("/customers/:id", (req, res) => {
    const customerId = parseInt(req.params.id);
    const customer = customers.find((customer) => customer.id === customerId);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.json(customer);
  });

  //PUT /users/:id: Update a user's information by ID.
app.put("/customers/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, isActive } = req.body;
    const customer = customers.find((c) => c.id === parseInt(id));
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    customer.name = name;
    customer.email = email;
    customer.isActive = isActive;
    res.json(customer);
  });

  //DELETE /users/:id: Delete a user by ID.
app.delete("/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const index = customers.findIndex((customer) => customer.id === customerId);
  if (index === -1) {
    return res.status(404).send("Customer not found");
  }
  customers = customers.filter((customer) => customer.id !== customerId);
  res.status(200).send("Customer successfully deleted");
});

module.exports = app;