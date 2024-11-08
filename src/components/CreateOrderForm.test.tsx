import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateOrderForm from './CreateOrderForm';

// Mock de crypto.randomUUID
beforeAll(() => {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: jest.fn(() => 'mocked-uuid'),
    },
  });
});

describe('CreateOrderForm', () => {
  it('calls onCreateOrder with the correct data when the form is submitted', () => {
    const onCreateOrder = jest.fn();
    render(<CreateOrderForm onCreateOrder={onCreateOrder} onCancel={() => {}} />);

    // Asegúrate de que todos los campos son completados correctamente
    fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Item/i), { target: { value: 'Laptop' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'pending' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Order/i }));

    // Cambia esta validación para garantizar que se llama correctamente
    expect(onCreateOrder).toHaveBeenCalledTimes(1);
    expect(onCreateOrder).toHaveBeenCalledWith({
      id: 'mocked-uuid',
      customerName: 'John Doe',
      item: 'Laptop',
      quantity: 1,
      status: 'pending',
    });
  });
});
