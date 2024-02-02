import '@testing-library/jest-dom/extend-expect'; // For enhanced assertion matchers
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios'; // You might want to mock axios requests
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to wrap components using router navigation

import ShopCreate from './ShopCreate'; // Adjust the import path based on your file structure

// Mock Axios response
jest.mock('axios');

describe('ShopCreate', () => {
  it('renders create shop form correctly', () => {
    render(<ShopCreate />, { wrapper: MemoryRouter }); // Wrap your component with MemoryRouter

    // Verify that input fields and submit button are present
    expect(screen.getByLabelText('Shop Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    // Continue verifying other fields...
  });

  it('submits form with valid data', async () => {
    // Mock axios post request
    axios.post.mockResolvedValueOnce({ data: { message: 'Shop created successfully!' } });

    render(<ShopCreate />, { wrapper: MemoryRouter });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Shop Name'), { target: { value: 'My Shop' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    // Continue filling in other fields...

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for axios to resolve
    await screen.findByText('Shop created successfully!');

    // Verify that successful message is displayed
    expect(screen.getByText('Shop created successfully!')).toBeInTheDocument();
  });

  // Add more test cases to cover different scenarios...

});
