const supertest = require('supertest');
const app = require('../app'); // Assuming this is your Express app
const mongoose = require('mongoose'); // Import mongoose or use your existing import
const Food = require('../model/food'); // Import your Food model
const Shop = require('../model/shop'); // Import your Shop model
const jwt = require('jsonwebtoken');

const api = supertest(app);

// This will store the authentication token for authenticated requests
let authToken;

beforeAll(async () => {
  // Connect to a test database or use an in-memory database
  // Clear any existing data
  await Food.deleteMany({});
  await Shop.deleteMany({});
});

describe('Food Routes', async () => {
  // Register a shop for testing
  const shop = await Shop.create({
    name: 'Test Shop',
    email: 'testshop@example.com',
    password: 'testpassword',
    // Other required fields
  });

  // Log in the shop and get an authentication token
  const response = await api.post('/api/v2/shop/login-shop')
    .send({
      email: 'testshop@example.com',
      password: 'testpassword',
    })
    .expect(201);

  authToken = response.body.token; // Store the token for authenticated requests

  test('should create a new food', async () => {
    const response = await api.post('/api/v2/food/create-food')
      .set('Authorization', `Bearer ${authToken}`)
      .field('shopId', shop._id)
      .attach('images', 'path/to/image1.jpg') // Attach image(s) for testing
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  test('should get all foods of a shop', async () => {
    const response = await api.get(`/api/v2/food/get-all-foods-shop/${shop._id}`)
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  // Write more test cases for other food routes similarly
});

afterAll(async () => {
  // Close the database connection
  await mongoose.connection.close();
});
