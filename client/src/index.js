import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './contexts/authContext';
import { TicketProvider } from './contexts/TicketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <TicketProvider>
    <App />
    </TicketProvider>
  </AuthProvider>
);



