import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import { ProductContext } from '../store/product-context'

export const CheckoutForm = forwardRef((props, ref) => {
    const formRef = useRef(null)
    const {cart} = useContext(ProductContext)

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                formRef.current.showModal()
            }
        }
    })

    const handleSubmit = (formData) => {
        formRef.current.close()
        const fullName = formData.get('fullName')
        const email = formData.get('email')
        const street = formData.get('street')
        const postal = formData.get('postal')
        const city = formData.get('city')

        console.log(fullName, email, street, postal, city)
    }

  return (
    <dialog className='modal' ref={formRef}>
        <form action={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: ${cart.total.toFixed(2)}</p>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" />
                </div>
            </div>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" id="email" name="email" />
                </div>
            </div>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street" />
                </div>
            </div>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="postal">Postal Code</label>
                    <input type="text" id="postal" name="postal" />
                </div>
                <div className='control'>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" />
                </div>
            </div>
            <div className='modal-actions'>
                <button className='text-button' onClick={() => formRef.current.close()}>Close</button>
                <button className='button' type='submit'>Submit Order</button>
            </div>
        </form>
    </dialog>
  )
})