import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateProduct from '../components/Shop/CreateProduct';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('CreateProduct', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const mockSelector = jest.fn();
  useSelector.mockReturnValue({
    seller: { _id: 'seller-id' },
    foods: { success: false, error: null },
  });

  it('renders the create product form', () => {
    render(<CreateProduct />);
    
    // Test if the form elements are rendered properly
    expect(screen.getByText(/Create Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    // ... (similar checks for other form elements)
  });

  it('submits the create product form', () => {
    render(<CreateProduct />);

    // Mock user inputs
    const nameInput = screen.getByLabelText(/Name/i);
    // ... (similar mocks for other form inputs)
    const submitButton = screen.getByRole('button', { name: /Create/i });
    
    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    // ... (similar fireEvent changes for other form inputs)
    
    // Mock the API response
    mockDispatch.mockImplementation((action) => {
      if (typeof action === 'function') {
        const mockGetState = {
          seller: { _id: 'seller-id' },
          foods: { success: true, error: null },
        };
        action(mockDispatch, () => mockGetState);
      }
    });

    // Click the submit button
    fireEvent.click(submitButton);

    // Expect API action to be dispatched
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  // Add more test cases for error handling and other scenarios
});
