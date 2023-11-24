import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import ProductCard from '../../components/ProductCard/ProductCard';

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('')

  const searchProducts = async () => {
    if (search === '') {
      loadProducts();
      return;
    }

    const response = await axios.get(`products/search?q=${search}`)
    setProducts(response?.data?.data);
  }

  useEffect(() => {
    searchProducts();
  }, [search])





  const loadProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response?.data?.data);
    }
    catch (err) {
      console.log(err);
      alert("Error loading products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <div>
      <Navbar />
      <input type='text' placeholder='Search Products'
        className='search-bar'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }} />
      <div className='products-container'>
        {
          products?.map((product, index) => {

            const { _id, name, description, price, image, category, brand } = product;
            { console.log(image) }
            return (
              <ProductCard key={index}
                name={name}
                description={description}
                price={price}
                image={image}
                category={category}
                brand={brand}
                id={_id} 
                />
            )
          })
        }
      </div>

    </div>
  )
}

export default Home
