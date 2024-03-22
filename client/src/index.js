import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
    <App />
    </main>
    </NextUIProvider>
  </BrowserRouter>
);

