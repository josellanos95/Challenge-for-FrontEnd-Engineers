import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderList from './OrderList';
import { Order } from '../types/Order';

const mockOrders: Order[] = [
  { id: '1', customerName: 'John Doe', item: 'Laptop', quantity: 1, status: 'pending' },
  { id: '2', customerName: 'Jane Doe', item: 'Phone', quantity: 2, status: 'completed' },
];

describe('OrderList', () => {
  it('renders a list of orders', () => {
    render(<OrderList orders={mockOrders} onViewOrder={jest.fn()} onEditOrder={jest.fn()} onDeleteOrder={jest.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('calls onViewOrder when the View button is clicked', () => {
    const onViewOrder = jest.fn();
    render(<OrderList orders={mockOrders} onViewOrder={onViewOrder} onEditOrder={jest.fn()} onDeleteOrder={jest.fn()} />);
    fireEvent.click(screen.getAllByText('View')[0]);
    expect(onViewOrder).toHaveBeenCalledWith(mockOrders[0]);
  });
});