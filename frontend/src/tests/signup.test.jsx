import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import React from 'react';
import Signup from '../components/Signup/Signup';
import { server } from '../server'; // Your mock server instance
import { userHandlers } from './userHandlers'; // Import your mock handlers

const mockServer = setupServer(...userHandlers);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
describe('Signup', () => {
    it('renders the signup form', () => {
      render(<Signup />);
      
      // Test if the form elements are rendered properly
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Upload a file/i)).toBeInTheDocument();
      expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });
  
    it('submits the signup form', async () => {
      render(<Signup />);
      
      // Mock user inputs
      const nameInput = screen.getByLabelText(/Full Name/i);
      const emailInput = screen.getByLabelText(/Email address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });
      
      // Fill out the form
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  
      // Simulate file upload (not a real file, just for testing)
      const fileInput = screen.getByLabelText(/Upload a file/i);
      Object.defineProperty(fileInput, 'files', {
        value: [new File(['file contents'], 'test.png', { type: 'image/png' })],
      });
      fireEvent.change(fileInput);
      
      // Mock the API response
      mockServer.use(
        rest.post(`${server}/user/create-user`, (req, res, ctx) => {
          return res(
            ctx.status(201),
            ctx.json({
              success: true,
              message: 'User created successfully!',
            })
          );
        })
      );
  
      // Click the submit button
      fireEvent.click(submitButton);
  
      // Wait for the success message
      await waitFor(() => {
        expect(screen.getByText(/User created successfully!/i)).toBeInTheDocument();
      });
    });
  });
  