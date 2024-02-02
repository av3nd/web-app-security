import { rest } from 'msw';

export const userHandlers = [
  rest.post('/api/v2/user/login-user', (req, res, ctx) => {
    const { email, password } = req.body;

    // Mock the authentication logic here and return a token
    const token = 'mocked-auth-token';

    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        token,
      })
    );
  }),

  // Add more handlers for other user-related routes as needed
];
