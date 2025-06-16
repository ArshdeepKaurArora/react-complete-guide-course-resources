import React, { forwardRef, useContext, useImperativeHandle, useRef, useActionState } from 'react'
import { ProductContext } from '../store/product-context'
import { validEmail, hadMinLength, isNotEmpty } from '../util/checkoutform_validation'
import Button from './Button'

export const CheckoutForm = forwardRef((props, ref) => {
    const formRef = useRef(null)
    const {cart, placeOrder} = useContext(ProductContext)
    const errors = [];

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                formRef.current.showModal()
            }
        }
    })

    const handleSubmit = async (prevState, formData) => {
        formRef.current.close()
        const fullName = formData.get('fullName')
        const email = formData.get('email')
        const street = formData.get('street')
        const postal = formData.get('postal')
        const city = formData.get('city')

        if (!validEmail(email)) {
            errors.push('Invalid email address')
        }

        if (!isNotEmpty(fullName)) {
            errors.push('Full name is required')
        }

        if (!hadMinLength(fullName, 3)) {
            errors.push('Full name must be at least 3 characters long')
        }
        
        if (!isNotEmpty(street)) {
            errors.push('Street is required')
        }

        if (!isNotEmpty(postal)) {
            errors.push('Postal code is required')
        }

        if (!isNotEmpty(city)) {
            errors.push('City is required')
        }

        if (errors.length > 0) {
            return {
                errors: errors,
                data: {
                    fullName: fullName,
                    email: email,
                    street: street,
                    postal: postal,
                    city: city
                }
            }
        }

        const order = {"order": {
            customer: {
                name: fullName,
                email: email,
                street: street,
                'postal-code': postal,
                city: city
                },
            items: cart.items.map((item) => {
                return {
                    name: item.name,
                    amount: item.count,
                    price: item.price,
                    id: item.id
                }
            })
        }}

        const data = await placeOrder(order)
        console.log("order placed", data)
        formRef.current.close()

        return {
            errors: null,
        }
        
    }

    const [formData, formAction] = useActionState(handleSubmit, {
        errors: null
    })

  return (
    <dialog className='modal' ref={formRef}>
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount: ${cart.total.toFixed(2)}</p>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" defaultValue={formData.data?.fullName} />
                </div>
            </div>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" id="email" name="email" defaultValue={formData.data?.email} />
                </div>
            </div>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street" defaultValue={formData.data?.street} />
                </div>
            </div>
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor="postal">Postal Code</label>
                    <input type="text" id="postal" name="postal" defaultValue={formData.data?.postal} />
                </div>
                <div className='control'>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" defaultValue={formData.data?.city} />
                </div>
            </div>
            <div className='modal-actions'>
                <Button textOnly onClick={() => formRef.current.close()}>Close</Button>
                <Button type='submit'>Submit Order</Button>
            </div>
        </form>
    </dialog>
  )
})