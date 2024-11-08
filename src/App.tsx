import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import OrdersPage from "./pages/OrdersPage";
import Dashboard from "./pages/Dashboard";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode preference exists in localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Update localStorage and class when darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <div className="min-h-screen">
          <nav className="border-b border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="text-2xl font-bold text-foreground">
                    Order Management
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/orders" 
                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-2 rounded-md text-muted-foreground hover:text-foreground"
                  >
                    {darkMode ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </Router>
  );
};

export default App;