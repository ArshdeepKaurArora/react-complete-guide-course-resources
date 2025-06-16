import React from 'react'
import logo from '../assets/logo.jpg'
import { ProductContext } from '../store/product-context'
import { useContext } from 'react'
import Button from './Button'

function Header({handleCart}) {

    const {cart} = useContext(ProductContext)

  return (
    <div id="main-header">
        <div id="title">
            <img src={logo} alt="logo" />
            <h1>REACTFOOD</h1>
        </div> 
        <Button onClick={handleCart}>Cart ({cart.count})</Button>
    </div>
  )
}

export default Header