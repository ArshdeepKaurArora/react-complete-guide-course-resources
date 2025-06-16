import React, { forwardRef, useContext, useRef, useImperativeHandle } from 'react'
import { ProductContext } from '../store/product-context'
import Button from './Button'


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
        {cart.items.length === 0 && (
            <div className='modal-content'>
                <h2 className='cart-empty'>No items in cart!</h2>
                <div className='modal-actions'>
                    <button className='button' onClick={() => modalRef.current.close()}>Close</button>
                </div>
            </div>
        )}
        {cart.items.length > 0 && (
            <>
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
                    <Button textOnly onClick={() => modalRef.current.close()}>Close</Button>
                    <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
                </div>
            </>
        )}
    </dialog>
  )
})