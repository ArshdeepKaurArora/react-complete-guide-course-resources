import React, { use } from 'react'
import { useActionState } from 'react'
import { ProductContext } from '../store/product-context'

function Product({id, image, name, description, price}) {

    const {addToCart} = use(ProductContext)

    const handleAddToCart = () => {
        addToCart(id, name, price)
    }

    const [formState, formAction] = useActionState(handleAddToCart)


  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${image}`} alt={name} />
            <div>
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
            </div>
            <form className="meal-item-actions">
                <button className='button' formAction={formAction}>Add to Cart</button>
            </form>
        </article>
    </li>
  )
}

export default Product