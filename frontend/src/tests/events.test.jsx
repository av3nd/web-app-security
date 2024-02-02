import { render, screen } from '@testing-library/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Events from './Events';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Events', () => {
  const mockSelector = jest.fn();
  useSelector.mockReturnValue({
    allEvents: [
      { id: 1, title: 'Event 1', date: '2023-08-15' },
      { id: 2, title: 'Event 2', date: '2023-08-20' },
    ],
    isLoading: false,
  });

  it('renders popular events section', () => {
    render(<Events />);
    
    // Check if the popular events heading is rendered
    expect(screen.getByText(/Popular Events/i)).toBeInTheDocument();
    
    // Check if the EventCard is rendered with the first event's data
    expect(screen.getByText(/Event 1/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-08-15/i)).toBeInTheDocument();
    
    // Check if the "No Events have!" message is not rendered
    expect(screen.queryByText(/No Events have!/i)).not.toBeInTheDocument();
  });

  it('renders "No Events have!" message when there are no events', () => {
    useSelector.mockReturnValue({
      allEvents: [],
      isLoading: false,
    });
    
    render(<Events />);
    
    // Check if the "No Events have!" message is rendered
    expect(screen.getByText(/No Events have!/i)).toBeInTheDocument();
  });

  it('renders nothing when loading', () => {
    useSelector.mockReturnValue({
      allEvents: [],
      isLoading: true,
    });

    render(<Events />);
    
    // Check if the component renders nothing when loading
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
  
  // Add more test cases for different scenarios and edge cases
});
