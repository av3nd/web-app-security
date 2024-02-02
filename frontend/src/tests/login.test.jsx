import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LoginPage from '../components/Login/Login';

// Mocking the API response using msw
import { server } from './mocks/server'; // This should point to your mock server setup

describe('LoginPage', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should log in a user', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log In' });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'testpassword');
    fireEvent.click(loginButton);

    // You can use assertions to check the behavior after the login button is clicked
    // For example, check if the user is redirected to a different page or if a success message is displayed.
    // You can also use msw's `rest` to mock the API response based on the input data.
  });

  // Add more test cases as needed
});
