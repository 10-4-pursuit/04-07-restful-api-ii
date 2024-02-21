const express = require("express");
const app = express();

//Middleware
app.use(express.json());

let customers = [];

//desc Get all customers
//route GET /customers
//access Public
app.get("/customers", (req, res) => {
  res.json(customers);
});

//desc Create a customer
//route POST /customers
//access Public
app.post("/customers", (req, res) => {
  const { name, email, isActive } = req.body;
  const customer = { id: Date.now(), name, email, isActive };
  customers.push(customer);
  res.status(201).json(customer);
});

//desc Update a customer
//route PUT /customers/:id
//access Public
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

//desc Delete a customer
//route DELETE /customers/:id
//access Public
app.delete("/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const index = customers.findIndex((customer) => customer.id === customerId);
  if (index === -1) {
    return res.status(404).send("Customer not found");
  }
  customers = customers.filter((customer) => customer.id !== customerId);
  res.status(200).send("Customer successfully deleted");
});

//desc Get a customer
//route GET /customers/:id
//access Public
app.get("/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((customer) => customer.id === customerId);
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  res.json(customer);
});

module.exports = app;
