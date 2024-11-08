import React, { useState } from 'react';
import { Order } from '../types/Order';

interface CreateOrderFormProps {
  onCreateOrder: (order: Order) => void;
  onCancel: () => void;
}

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ onCreateOrder, onCancel }) => {
  const [customerName, setCustomerName] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName,
      item,
      quantity: parseInt(quantity),
      status: status as 'pending' | 'completed' | 'cancelled',
    };
    onCreateOrder(newOrder);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
        />
      </div>
      <div>
        <label htmlFor="item" className="block text-sm font-medium">
          Item
        </label>
        <input
          type="text"
          id="item"
          required
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create Order
        </button>
      </div>
    </form>
  );
};

export default CreateOrderForm;