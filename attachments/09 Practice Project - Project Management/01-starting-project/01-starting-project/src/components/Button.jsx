import React from 'react'

const Button = ({handleClick, title, ...props}) => {
  return (
    <button {...props} onClick={handleClick}>
        {title}
    </button>
  )
}

export default Button