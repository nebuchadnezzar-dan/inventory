import React from 'react'
import PropTypes from 'prop-types'

//props destructured
const Button = ({onClick, children ,color}) => <button type="button" className={`btn  btn-${color}`} onClick={onClick}>{children}</button>


Button.defaultProps = {
  color: 'primary'
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  // already has defaultProps 
  color: PropTypes.string
}

export default Button