import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home/Home"
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import Myorders from './views/Myorders/Myorders';
import BuyNow from './views/BuyNow/BuyNow';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/orders',
    element: <Myorders />
  },
  {
    path: '/buy/:id',
    element: <BuyNow />
  }
])



root.render(
 <RouterProvider router={router}/>
);


