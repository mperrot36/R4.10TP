import React from 'react'

const FormBlockInput = (props) => {
  return (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
        <input 
        type="text"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        />
    </div>
  )
}

export default FormBlockInput