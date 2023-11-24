import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';
import "./Myorders.css"
import { Link } from "react-router-dom";

const STATUS_BADGE_COLOR_MAP = {
    "pending":"badge-danger",
    "shipped":"badge-warning",
    "delivered":"badge-success"
}

function Myorders() {

    const [user, setUser] = useState({});
    const [orders,setOrders] = useState([]);

    const loadOrders = async () => {
        const userId = user._id;

        if (!userId) {
            return;
        }

        const response = await axios.get(`/orders/user/${userId}`)
        setOrders(response?.data?.data);

        console.log(response.data.data);
    }

    useEffect(() => {
        loadOrders();
    }, [user]);

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

        if (storageUser?.email) {
            setUser(storageUser);
        }
        else {
            alert("You are not logged in!");
            window.location.href = '/login';
        }

    }, [])
    return (
        <div>
          
         <Navbar />
           
            <h1 className='text-center'>My orders</h1>
            <div className='orders-container'>
                {
                    orders?.map((order, index) => {
                        const { product, quantity, status,deliveryCharges } = order
                        return (
                            <div className='order-card' key={index}>
                                <Link to= {`/buy/${product._id}`}>{product?.name}</Link>
                                <h3>{product?.price} X {quantity}= Rs.{product?.price * quantity}</h3>
                                <p>Delivery Charges: Rs.{deliveryCharges}</p>
                           <span className={`order-status ${STATUS_BADGE_COLOR_MAP[status]}`}>
                            {status}
                            </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Myorders
