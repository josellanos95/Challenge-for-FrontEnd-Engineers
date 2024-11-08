import React from 'react';
import { Order } from '../types/Order';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="bg-card text-card-foreground shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium">Order Details</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Details and information about the order.</p>
      </div>
      <div className="border-t border-border px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-border">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-muted-foreground">Order ID</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{order.id}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-muted-foreground">Customer Name</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{order.customerName}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-muted-foreground">Item</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{order.item}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-muted-foreground">Quantity</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{order.quantity}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-muted-foreground">Status</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{order.status}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default OrderDetails;