const request = require('supertest');
const app = require('../index'); // Adjust the path to where your Express app is exported

describe('Customer Resource CRUD Operations', () => {
  let newCustomerId;

  it('should create a new customer', async () => {
    const customerData = { name: 'Jane Doe', email: 'jane.doe@example.com', isActive: true };
    const response = await request(app)
      .post('/users')
      .send(customerData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    newCustomerId = response.body.id; // Store the ID for use in subsequent tests
  });

  it('should list all customers', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a single customer by ID', async () => {
    const response = await request(app).get(`/users/${newCustomerId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', newCustomerId);
  });

  it('should update a customer', async () => {
    const updatedCustomerData = { name: 'John Doe Updated', email: 'johnupdated@example.com', isActive: false };
    const response = await request(app)
      .put(`/users/${newCustomerId}`)
      .send(updatedCustomerData);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual(updatedCustomerData.name);
    expect(response.body.isActive).toEqual(updatedCustomerData.isActive);
  });

  it('should delete a customer', async () => {
    const response = await request(app).delete(`/users/${newCustomerId}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('User successfully deleted');
  });
});
