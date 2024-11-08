export interface Order {
    id: string;
    customerName: string;
    item: string;
    quantity: number;
    status: 'pending' | 'completed' | 'cancelled';
  }