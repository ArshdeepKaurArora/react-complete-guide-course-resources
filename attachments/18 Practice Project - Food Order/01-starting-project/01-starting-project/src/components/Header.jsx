import React from 'react'
import logo from '../assets/logo.jpg'
import { ProductContext } from '../store/ProductContext'
import { useContext } from 'react'
import Button from './Button'
import { UserProgressContext } from '../store/UserProgressContext'

function Header({handleCart}) {

    const {items} = useContext(ProductContext)
    const userProgressCtx = useContext(UserProgressContext)

    const cartCount = items.reduce((count, item) => count + item.count, 0)

  return (
    <div id="main-header">
        <div id="title">
            <img src={logo} alt="logo" />
            <h1>REACTFOOD</h1>
        </div> 
        <Button onClick={userProgressCtx.showCart}>Cart ({cartCount})</Button>
    </div>
  )
}

export default Header