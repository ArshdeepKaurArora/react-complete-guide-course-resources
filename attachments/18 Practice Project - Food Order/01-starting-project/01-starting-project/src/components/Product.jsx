import React, { useContext } from 'react'
import { ProductContext } from '../store/ProductContext'
import { currencyFormatter } from '../util/formatting'
import Button from './Button'

function Product({item}) {
    const {addItem} = useContext(ProductContext)

  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
            <div>
                <h3>{item.name}</h3>
                <p className="meal-item-price">{currencyFormatter(item.price)}</p>
                <p className="meal-item-description">{item.description}</p>
            </div>
            <div className="meal-item-actions">
                <Button onClick={() => addItem(item)}>Add to Cart</Button>
            </div>
        </article>
    </li>
  )
}

export default Product