import { Order } from '../types/Order';

const API_URL = 'http://localhost:3001/orders';

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return await response.json();
}

export async function createOrder(order: Order): Promise<Order> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return await response.json();
}

export async function updateOrder(updatedOrder: Order): Promise<Order> {
  const response = await fetch(`${API_URL}/${updatedOrder.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedOrder),
  });
  if (!response.ok) {
    throw new Error('Failed to update order');
  }
  return await response.json();
}

export async function deleteOrder(orderId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${orderId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
}
