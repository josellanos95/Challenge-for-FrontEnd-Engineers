import React, { useState } from 'react';
import { Order } from '../types/Order';

interface EditOrderFormProps {
  order: Order;
  onUpdateOrder: (updatedOrder: Order) => void;
}

const EditOrderForm: React.FC<EditOrderFormProps> = ({ order, onUpdateOrder }) => {
  const [customerName, setCustomerName] = useState(order.customerName);
  const [item, setItem] = useState(order.item);
  const [quantity, setQuantity] = useState(order.quantity.toString());
  const [status, setStatus] = useState(order.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOrder: Order = {
      ...order,
      customerName,
      item,
      quantity: parseInt(quantity),
      status: status as 'pending' | 'completed' | 'cancelled',
    };
    onUpdateOrder(updatedOrder);
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
          onChange={(e) => setStatus(e.target.value as 'pending' | 'completed' | 'cancelled')}
          className="mt-1 block w-full border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Update Order
        </button>
      </div>
    </form>
  );
};

export default EditOrderForm;