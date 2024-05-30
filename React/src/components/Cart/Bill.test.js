import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bill from './Bill';

describe('Bill component', () => {
  // Setup mock functions globally for the test suite
  beforeAll(() => {
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert.mockRestore();
  });

  const props = {
    userId: 1,
    httpClient: { fetch: jest.fn() },
    setIsCheckout: jest.fn(),
    setCartProducts: jest.fn(),
    cartItems: [{ id: 1, name: 'Product 1', price: 100, quantity: 2, imageUrl: 'url' }],
    totalCost: 200,
  };

  beforeEach(() => {
    props.httpClient.fetch.mockResolvedValue({ status: 204 }); 
  });

  test('Payment information must be rendered correctly', () => {
    render(<Bill {...props} />);
    expect(screen.getByText('Payment 💰')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getAllByText('$200.00').length).toBeGreaterThanOrEqual(1);
  });

  test('Payment must proceed when you click the payment button', async () => {
    render(<Bill {...props} />);
    fireEvent.click(screen.getByText('Pay Now'));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Payment Successful!');
    });
  });
});
