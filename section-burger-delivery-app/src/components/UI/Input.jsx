import React from "react"
import classes from "./Input.module.scss"

const Input = React.forwardRef(({label, input}, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} id={input.id} {...input}/>
    </div>
  )
})

export default Input