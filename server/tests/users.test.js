const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

const api = supertest(app);

let authToken;

beforeAll(async () => {
  // Connect to a test database or use an in-memory database
  // Clear any existing data
  await User.deleteMany({});
});

describe('User Routes', () => {
  test('should register a new user', async () => {
    const response = await api.post('/api/v2/user/create-user')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        // Other required fields
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  test('should activate a user', async () => {
    // Create an activation token for testing
    const user = { name: 'Test User', email: 'test@example.com', password: 'testpassword' };
    const activationToken = jwt.sign(user, 'your-activation-secret', { expiresIn: '5m' });

    const response = await api.post('/api/v2/user/activation')
      .send({ activation_token: activationToken })
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  test('should log in a user and get an authentication token', async () => {
    const response = await api.post('/api/v2/user/login-user')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    authToken = response.body.token; // Store the token for authenticated requests
  });

  test('should get user information', async () => {
    const response = await api.get('/api/v2/user/getuser')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check user properties
  });

  // Write more tests for other user routes similarly
});

afterAll(async () => {
  // Close the database connection
  await mongoose.connection.close();
});
