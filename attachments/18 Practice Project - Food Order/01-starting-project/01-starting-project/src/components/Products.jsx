import React from 'react'
import { useContext, useEffect } from 'react'
import { ProductContext } from '../store/product-context'
import Product from './Product'

function Products() {

    const {products} = useContext(ProductContext)
    console.log(products)

  return (
    <ul id="meals">
        {products.map((product) => (
            <Product key={product.id} {...product} />
        ))}
    </ul>
  )
}

export default Products