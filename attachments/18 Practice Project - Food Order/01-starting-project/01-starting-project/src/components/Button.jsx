import React from 'react'

function Button({children, onClick, className, textOnly, ...props}) {

    const classes = textOnly ? 'text-button' : 'button'
    const buttonClass = className ? `${classes} ${className}` : classes

  return (
    <button onClick={onClick} className={buttonClass} {...props}>{children}</button>
  )
}

export default Button