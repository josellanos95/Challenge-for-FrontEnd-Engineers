import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditOrderForm from './EditOrderForm';
import { Order } from '../types/Order';

const mockOrder: Order = { id: '1', customerName: 'John Doe', item: 'Laptop', quantity: 1, status: 'pending' };

describe('EditOrderForm', () => {
  it('calls onUpdateOrder with the correct data when the form is submitted', () => {
    const onUpdateOrder = jest.fn();
    render(<EditOrderForm order={mockOrder} onUpdateOrder={onUpdateOrder} />);

    fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Item/i), { target: { value: 'Phone' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'completed' } });

    fireEvent.click(screen.getByText(/Update Order/i));

    expect(onUpdateOrder).toHaveBeenCalledWith({
      id: '1',
      customerName: 'Jane Doe',
      item: 'Phone',
      quantity: 2,
      status: 'completed',
    });
  });
});