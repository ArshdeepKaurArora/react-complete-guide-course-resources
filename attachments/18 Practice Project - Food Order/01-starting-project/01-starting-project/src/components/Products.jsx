import React, { useState, useEffect } from 'react'
import Product from './Product'
import { useHttp } from '../hooks/useHttp'
import Error from './Error'

const requestConfig = {
    url: "http://localhost:3000/meals",
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}

function Products() {

    const {sendRequest, isLoading, error} = useHttp()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await sendRequest(requestConfig)
            setProducts(data)
        }
        fetchProducts()
    }, [sendRequest])

    if (isLoading) {
        return <p className='center'>Loading...</p>
    }
    if (error) {
        return <Error title="An error occurred!" message={error} />
    }

  return (
    <ul id="meals">
        {products.map((product) => (
            <Product key={product.id} item={product} />
        ))}
    </ul>
  )
}

export default Products