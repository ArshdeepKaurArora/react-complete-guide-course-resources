import React, { forwardRef, useContext, useRef, useImperativeHandle } from 'react'
import { ProductContext } from '../store/ProductContext'
import Button from './Button'
import { currencyFormatter } from '../util/formatting'
import Modal from './Modal'
import { UserProgressContext } from '../store/UserProgressContext'


export const Cart = () => {

    const {items, addItem, removeItem} = useContext(ProductContext)
    const cartCount = items.reduce((count, item) => count + item.count, 0)
    const cartTotal = items.reduce((total, item) => total + item.count * item.price, 0)
    const userProgressCtx = useContext(UserProgressContext)

    const handleOnClose = () => {
        if (userProgressCtx.progress === "cart") {
            userProgressCtx.hideCart()
        }
    }

  return (
    <Modal className='modal' open={userProgressCtx.progress === "cart"} onClose={handleOnClose}>
        {cartCount === 0 && (
            <div className='modal-content'>
                <h2 className='cart-empty'>No items in cart!</h2>
                <div className='modal-actions'>
                    <Button textOnly onClick={userProgressCtx.hideCart}>Close</Button>
                </div>
            </div>
        )}
        {cartCount > 0 && (
            <>
                <h2>Your Cart</h2>
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className='cart-item'>
                            <p>{item.name} - {item.count} x {currencyFormatter(item.price)}</p>
                            <div className='cart-item-actions'>
                                <button type='button' onClick={() => removeItem(item.id)}>-</button>
                                <span>{item.count}</span>
                                <button type='button' onClick={() => addItem(item)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className='cart-total'>Total: {currencyFormatter(cartTotal)}</p>
                <div className='modal-actions'>
                    <Button textOnly onClick={handleOnClose}>Close</Button>
                    <Button onClick={userProgressCtx.showCheckout}>Go to Checkout</Button>
                </div>
            </>
        )}
    </Modal>
  )
}