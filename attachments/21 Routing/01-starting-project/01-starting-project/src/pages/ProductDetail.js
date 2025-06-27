import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ProductDetail = () => {

    const params = useParams();

  return (
    <div>
        <h1>Product Detail</h1>
        <p>{params.productId}</p>
        <button><Link to=".." relative='path'>Back</Link></button>
    </div>
  )
}

export default ProductDetail