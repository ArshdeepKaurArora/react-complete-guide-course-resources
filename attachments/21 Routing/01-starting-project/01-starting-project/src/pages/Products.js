import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {

    const products = [
        {
            id: 'p1',
            title: 'Product 1'
        },
        {
            id: 'p2',
            title: 'Product 2'
        },
    ]
  return (
    <div>
        <h1>Products</h1>
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <Link to={product.id} >{product.title}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Products