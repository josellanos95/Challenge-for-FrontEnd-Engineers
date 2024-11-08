import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderDetails from './OrderDetails';
import { Order } from '../types/Order';

const mockOrder: Order = { id: '1', customerName: 'John Doe', item: 'Laptop', quantity: 1, status: 'pending' };

describe('OrderDetails', () => {
  it('renders order details', () => {
    render(<OrderDetails order={mockOrder} />);
    expect(screen.getByText('Order ID:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
  });
});