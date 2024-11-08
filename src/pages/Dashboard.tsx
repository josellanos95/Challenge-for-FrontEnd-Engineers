'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, PackageCheck, PackageX, TrendingUp, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  // Mock data
  const stats = {
    totalOrders: 156,
    pendingOrders: 23,
    completedOrders: 128,
    cancelledOrders: 5,
    revenue: 12580,
    customers: 48
  }

  const recentOrders = [
    { id: "ORD001", customer: "John Doe", amount: 150, status: "pending" },
    { id: "ORD002", customer: "Jane Smith", amount: 280, status: "completed" },
    { id: "ORD003", customer: "Mike Johnson", amount: 95, status: "completed" },
    { id: "ORD004", customer: "Sarah Williams", amount: 420, status: "pending" }
  ]

  return (
    <div className="space-y-6 bg-background text-foreground">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground">
              +7 since last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Order Status Overview</CardTitle>
            <CardDescription>
              Distribution of orders by their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex items-center">
                    <PackageCheck className="mr-1 h-4 w-4 text-green-500" />
                    Completed
                  </span>
                  <span className="ml-auto">{stats.completedOrders}</span>
                </div>
                <Progress value={82} className="h-2">
                  <div className="bg-green-500 h-full w-full" style={{ width: '82%' }} />
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex items-center">
                    <Package className="mr-1 h-4 w-4 text-yellow-500" />
                    Pending
                  </span>
                  <span className="ml-auto">{stats.pendingOrders}</span>
                </div>
                <Progress value={15} className="h-2">
                  <div className="bg-yellow-500 h-full w-full" style={{ width: '15%' }} />
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex items-center">
                    <PackageX className="mr-1 h-4 w-4 text-red-500" />
                    Cancelled
                  </span>
                  <span className="ml-auto">{stats.cancelledOrders}</span>
                </div>
                <Progress value={3} className="h-2">
                  <div className="bg-red-500 h-full w-full" style={{ width: '3%' }} />
                </Progress>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest incoming orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm font-medium">${order.amount}</p>
                    <p className={`text-xs ${
                      order.status === 'completed' 
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              New Order
            </Button>
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}