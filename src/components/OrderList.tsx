import React, { useState } from 'react';
import { Order } from '../types/Order';
import { usePagination } from '../utils/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';

interface OrderListProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onViewOrder, onEditOrder, onDeleteOrder }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOrders = orders
    .filter((order) => statusFilter === 'all' || order.status === statusFilter)
    .filter((order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const { currentPage, totalPages, nextPage, previousPage, currentItems } = usePagination(filteredOrders, 10);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/3">
            <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">Filter by status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="w-full sm:w-2/3">
            <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1 block w-full border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-border rounded-lg">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Order ID</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Customer</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Item</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Quantity</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">Status</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {currentItems.map((order) => (
                      <Transition
                        key={order.id}
                        show={true}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">{order.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">{order.customerName}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">{order.item}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">{order.quantity}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button onClick={() => onViewOrder(order)} className="text-primary hover:text-primary/80 mr-2">
                              View
                            </button>
                            <button onClick={() => onEditOrder(order)} className="text-primary hover:text-primary/80 mr-2">
                              Edit
                            </button>
                            <button onClick={() => onDeleteOrder(order.id)} className="text-destructive hover:text-destructive/80">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </Transition>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md bg-background text-foreground hover:bg-muted"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md bg-background text-foreground hover:bg-muted"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm">
                Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(currentPage * 10, filteredOrders.length)}</span> of{' '}
                <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border bg-background text-sm font-medium text-foreground hover:bg-muted"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border bg-background text-sm font-medium text-foreground hover:bg-muted"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;