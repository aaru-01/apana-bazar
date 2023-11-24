import React, { useEffect, useState } from 'react'
import "./ProductCard.css"
import { Link } from "react-router-dom"

function ProductCard({ id, name, description, price, image, category, brand }) {

const [user, setUser] = useState();

const loadUser = async () => {
  setUser(JSON.parse(localStorage.getItem('user')))
}

useEffect(()=>{
  loadUser();
},[])

  return (
    <div className='product-card'>
      <img src={image} alt={name} className='product-card-image' />
      <h2 className='product-card-name'>{name}</h2>
      <p className='product-card-description'>{description}</p>
      <p className='product-card-price'>Rs.{price}/-</p>
      {/* <button type='button' className='btn buy-now-btn' >Buy Now</button> */}

{
  user ?    <Link to={`/buy/${id}`}
  className='btn buy-now-btn' onClick={()=>{
    window.location.href = `/buy/${id}`
  }}

  >
    Buy Now
      </Link>
      : <Link className='btn buy-now-btn' onClick={()=>{
        window.location.href = `/login`
      }}>Login To Buy</Link>
    }
    </div>
  )
}

export default ProductCard
