import '@testing-library/jest-dom/extend-expect'; // For enhanced assertion matchers
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios'; // You might want to mock axios requests
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to wrap components using router navigation

import ShopLogin from './ShopLogin'; // Adjust the import path based on your file structure

// Mock Axios response
jest.mock('axios');

describe('ShopLogin', () => {
  it('renders login form correctly', () => {
    render(<ShopLogin />, { wrapper: MemoryRouter }); // Wrap your component with MemoryRouter

    // Verify that input fields and submit button are present
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    // Mock axios post request
    axios.post.mockResolvedValueOnce({ data: { message: 'Login Success!' } });

    render(<ShopLogin />, { wrapper: MemoryRouter });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for axios to resolve
    await screen.findByText('Login Success!');

    // Verify that successful message is displayed
    expect(screen.getByText('Login Success!')).toBeInTheDocument();
  });

  it('displays error message for invalid login', async () => {
    // Mock axios post request to simulate an error
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } });

    render(<ShopLogin />, { wrapper: MemoryRouter });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalidPassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for axios to reject
    await screen.findByText('Invalid credentials');

    // Verify that error message is displayed
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
