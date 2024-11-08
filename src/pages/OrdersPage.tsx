import React, { useState, useEffect, useCallback, useRef } from "react";
import OrderList from "../components/OrderList";
import OrderDetails from "../components/OrderDetails";
import CreateOrderForm from "../components/CreateOrderForm";
import EditOrderForm from "../components/EditOrderForm";
import { Order } from "../types/Order";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderService";
import { PlusIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import toast from 'react-hot-toast';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasAlertedRef = useRef(false);

  const fetchOrders = useCallback(async () => {
    if (!isLoading) return;
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
      if (!hasAlertedRef.current) {
        toast.success('Orders loaded successfully');
        hasAlertedRef.current = true;
      }
    } catch (error) {
      if (!hasAlertedRef.current) {
        toast.error(`Failed to load orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
        hasAlertedRef.current = true;
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchOrders();
    return () => {
      hasAlertedRef.current = false;
    };
  }, [fetchOrders]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsEditingOrder(false);
    setIsModalOpen(true);
  };

  const handleCreateOrder = async (newOrder: Order) => {
    try {
      await createOrder(newOrder);
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setIsCreatingOrder(false);
      setIsModalOpen(false);
      toast.success('Order created successfully');
    } catch (error) {
      toast.error(`Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleUpdateOrder = async (updatedOrder: Order) => {
    try {
      await updateOrder(updatedOrder);
      setOrders(prevOrders =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setIsEditingOrder(false);
      setSelectedOrder(updatedOrder);
      setIsModalOpen(false);
      toast.success('Order updated successfully');
    } catch (error) {
      toast.error(`Failed to update order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter((order) => order.id !== orderId));
      setSelectedOrder(null);
      setIsModalOpen(false);
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error(`Failed to delete order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCancelCreate = () => {
    setIsCreatingOrder(false);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background text-foreground">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <button
            onClick={() => {
              setIsCreatingOrder(true);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create Order
          </button>
        </div>
        <OrderList
          orders={orders}
          onViewOrder={handleViewOrder}
          onEditOrder={(order: Order) => {
            setSelectedOrder(order);
            setIsEditingOrder(true);
            setIsModalOpen(true);
          }}
          onDeleteOrder={handleDeleteOrder}
        />
      </div>

      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            setIsModalOpen(false);
            setIsCreatingOrder(false);
            setIsEditingOrder(false);
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-background border border-border rounded-lg shadow-lg">
              {isCreatingOrder ? (
                <CreateOrderForm onCreateOrder={handleCreateOrder} onCancel={handleCancelCreate} />
              ) : isEditingOrder && selectedOrder ? (
                <EditOrderForm
                  order={selectedOrder}
                  onUpdateOrder={handleUpdateOrder}
                />
              ) : selectedOrder ? (
                <>
                  <OrderDetails order={selectedOrder} />
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setIsEditingOrder(true)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      Edit Order
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-border rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default OrdersPage;