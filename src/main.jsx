import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
      refetchOnWindowFocus: false,
    },
  },
});

// Mount the React app to the DOM and provide QueryClient context
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provide React Query context to the app */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
