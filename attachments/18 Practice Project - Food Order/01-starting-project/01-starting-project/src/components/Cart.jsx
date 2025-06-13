import React, { forwardRef, useContext, useRef, useImperativeHandle } from 'react'
import { ProductContext } from '../store/product-context'


export const Cart = forwardRef(({handleCheckout}, ref) => {

    const {cart, decreaseItemCount, increaseItemCount} = useContext(ProductContext)
    const modalRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                modalRef.current.showModal()
            }
        }
    })

    const handleOpenCheckout = () => {
        modalRef.current.close()
        handleCheckout()
    }

  return (
    <dialog className='modal' ref={modalRef}>
        <h2>Your Cart</h2>
        <ul>
            {cart.items.map((item) => (
                <li key={item.id} className='cart-item'>
                    <p>{item.name} - {item.count} x {item.price}</p>
                    <div className='cart-item-actions'>
                        <button onClick={() => decreaseItemCount(item.id)}>-</button>
                        <span>{item.count}</span>
                        <button onClick={() => increaseItemCount(item.id)}>+</button>
                    </div>
                </li>
            ))}
        </ul>
        <p className='cart-total'>Total: {cart.total.toFixed(2)}</p>
        <div className='modal-actions'>
            <button className='text-button' onClick={() => modalRef.current.close()}>Close</button>
            <button className='button' onClick={handleOpenCheckout}>Go to Checkout</button>
        </div>
    </dialog>
  )
})