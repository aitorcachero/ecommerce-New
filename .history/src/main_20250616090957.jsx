import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ShopProvider } from './contexts/shopContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductsProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </ProductsProvider>
  </BrowserRouter>
);
