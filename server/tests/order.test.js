const supertest = require('supertest');
const app = require('../app'); // Assuming this is your Express app

const api = supertest(app);

describe('Order Routes', () => {
  let authToken;
  let shopId;

  beforeAll(async () => {
    // Log in the shop and get an authentication token
    const response = await api.post('/api/v2/shop/login-shop')
      .send({
        email: 'testshop@example.com',
        password: 'testpassword',
      })
      .expect(201);

    authToken = response.body.token; // Store the token for authenticated requests

    // Create a new shop and store its ID
    const shopResponse = await api.post('/api/v2/shop/create-shop')
      .send({
        name: 'Test Shop',
        email: 'testshop@example.com',
        password: 'testpassword',
        // Other required fields for Shop model
      })
      .expect(201);

    shopId = shopResponse.body.shop._id;
  }, 10000); // Increased timeout to 10 seconds

  test('should create a new order', async () => {
    // Define order data including cart items, shipping address, etc.
    // Make sure to include valid shop ID in order data

    const orderData = {
      shop: shopId, // Use the created shop ID here
      // Other order data
    };

    const response = await api.post('/api/v2/order/create-order')
      .set('Authorization', `Bearer ${authToken}`)
      .send(orderData)
      .expect(201);

    expect(response.body.success).toBe(true);
    // You can add more assertions to check response properties
  });

  // Write more tests for other order routes similarly
});
