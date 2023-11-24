import React, { useEffect, useState } from 'react'
import "./BuyNow.css"
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'

function BuyNow() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1);
  const [ shippingAddress, setShippingAddress] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState();


  const loadProduct = async () => {
    if (!id) {
      return;
    }


    const response = await axios.get(`/product/${id}`);
    setProduct(response?.data?.data);

  };

  const increseQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }



  const placeOrder = async () => {


    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');


    const orderDetails = {
      user: currentUser?._id,
      product: product?._id,
      quantity: quantity,
      shippingAddress: shippingAddress,
      deliveryCharges: deliveryCharge,
    }


    const response = await axios.post('/order', orderDetails);


    alert(response?.data?.message);
    if (response?.data?.success) {
      window.location.href = '/orders'
    }
  }


  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='main-buy-container'>
        <div className='buy-product-info'>
          <div>
            <img src={product.image} alt={product.name} className='buy-product-image' />
          </div>

          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Rs.{product.price}/-</p>
            <p>Category: {product.category}</p>
            <div>
              <span className='btn-decrese-quanity' onClick={decreaseQuantity}>➖</span>
              <span className='product-quantity-text'>{quantity}</span>
              <span className='btn-decrese-quanity' onClick={increseQuantity}>➕</span>
            </div>


            <div>
              <input type='text'
                placeholder='Enter Your Shipping Address'
                className='form-control input-shipping-box'
                value={shippingAddress}
                onChange={(e) => {
                  setShippingAddress(e.target.value)
                }} />
            </div>


            <div>
              <input type='radio' className='radio-btn-charges' value={deliveryCharge} name='deliveryCharge' onClick={(e) => {
                if (e.target.checked) {
                  setDeliveryCharge(40)
                }
              }} />Regular Delivery Charges

              <input type='radio' className='radio-btn-charges' value={deliveryCharge}
                name='deliveryCharge' onClick={(e) => {
                  if (e.target.checked) {
                    setDeliveryCharge(100)
                  }
                }} />Fast Delivery Charges
            </div>
          </div>



        </div>
        <button type='button' className='btn btn-place-order' onClick={placeOrder}>Place Order</button>

      </div>

    </div>
  )
}

export default BuyNow
