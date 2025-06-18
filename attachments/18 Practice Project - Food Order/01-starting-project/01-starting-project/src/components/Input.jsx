import React from 'react'

function Input({label, type, name, defaultValue, ...props}) {
  return (
    <div className='control'>
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} name={name} defaultValue={defaultValue} {...props} />
    </div>
  )
}

export default Input