import React, { useContext, useState} from 'react'
import { ProductContext } from '../store/ProductContext'
import Button from './Button'
import { currencyFormatter } from '../util/formatting'
import { UserProgressContext } from '../store/UserProgressContext'
import Modal from './Modal'
import Input from './Input'
import { useHttp } from '../hooks/useHttp'
import Error from './Error'

const requestConfig = {
    url: "http://localhost:3000/orders",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export const CheckoutForm = () => {
    const [isSuccess, setIsSuccess] = useState(false)

    const { items, clearCart } = useContext(ProductContext)
    const userProgressCtx = useContext(UserProgressContext)

    const {sendRequest, isLoading, error} = useHttp()

    const cartTotal = items.reduce((total, item) => total + item.count * item.price, 0)

    const handleOnClose = () => {
        if (userProgressCtx.progress === "checkout") {
            userProgressCtx.hideCheckout()
        }
    }

    const handleClearCart = () => {
        handleOnClose()
        clearCart()
        setIsSuccess(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        const orderData = {
            order: {
                customer: {
                    'name': data.name,
                    'email': data.email,
                    'street': data.street,
                    'postal-code': data['postal-code'],
                    'city': data.city
                },
                items: items.map((item) => ({
                    'name': item.name,
                    'quantity': item.count,
                    'price': item.price,
                    'id': item.id
                }))
            }
        }

        requestConfig.body = orderData
        let response = await sendRequest(requestConfig)
        if (response.message === "Order created!") {
            setIsSuccess(true)
        }
    }

    if (isSuccess) {
        return <Modal className='modal' open={isSuccess} onClose={handleClearCart}>
            <h2>Success!</h2>
            <p>Your order has been placed successfully.</p>
            <div className='modal-actions'>
                <Button textOnly onClick={handleClearCart} type="button">Close</Button>
            </div>
        </Modal>
    }

    return (
        <Modal className='modal' open={userProgressCtx.progress === "checkout"} onClose={handleOnClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                {error && <Error title="An error occurred!" message={error} />}
                <p>Total Amount: {currencyFormatter(cartTotal)}</p>
                <div className='control-row'>
                    <Input label="Full Name" type="text" name="name" required />
                </div>
                <div className='control-row'>
                    <Input label="E-mail Address" type="email" name="email" required />
                </div>
                <div className='control-row'>
                    <Input label="Street" type="text" name="street" required />
                </div>
                <div className='control-row'>
                    <Input label="Postal Code" type="text" name="postal-code" required />
                    <Input label="City" type="text" name="city" required />
                </div>
                <div className='modal-actions'>
                    <Button textOnly onClick={handleOnClose} type="button">Close</Button>
                    <Button type='submit' disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Order'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}