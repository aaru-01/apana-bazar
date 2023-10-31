import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home/Home"
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';

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
  }
])



root.render(
 <RouterProvider router={router}/>
);


