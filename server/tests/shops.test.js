const supertest = require('supertest');
const app = require('../app'); // Assuming this is your Express app
const mongoose = require('mongoose'); // Import mongoose or use your existing import
const Shop = require('../model/shop'); // Import your Shop model
const jwt = require('jsonwebtoken');

const api = supertest(app);

// This will store the authentication token for authenticated requests
let authToken;

beforeAll(async () => {
  // Connect to a test database or use an in-memory database
  // Clear any existing data
  await Shop.deleteMany({});
});

describe('Shop Routes', () => {
  test('should create a new shop', async () => {
    const response = await api.post('/api/v2/shop/create-shop')
      .send({
        name: 'Test Shop',
        email: 'test@example.com',
        password: 'testpassword',
        // Other required fields
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  test('should activate a shop', async () => {
    // Create an activation token for testing
    const shop = { name: 'Test Shop', email: 'test@example.com', password: 'testpassword' };
    const activationToken = jwt.sign(shop, 'your-activation-secret', { expiresIn: '5m' });

    const response = await api.post('/api/v2/shop/activation')
      .send({ activation_token: activationToken })
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  test('should log in a shop and get an authentication token', async () => {
    const response = await api.post('/api/v2/shop/login-shop')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    authToken = response.body.token; // Store the token for authenticated requests
  });

  test('should get shop information', async () => {
    const response = await api.get('/api/v2/shop/getSeller')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check shop properties
  });

  // Write more tests for other shop routes similarly
});

afterAll(async () => {
  // Close the database connection
  await mongoose.connection.close();
});
