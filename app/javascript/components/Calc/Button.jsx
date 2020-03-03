import React from 'react'
import PropTypes from 'prop-types'

//props destructured
const Button = ({onClick, children ,color}) => <button type="button" className={`btn  btn-${color}`} onClick={onClick}>{children}</button>


Button.defaultProps = {
  color: 'primary',
  onClick: () => {}
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.number]).isRequired,
  // already has defaultProps 
  color: PropTypes.string
}

export default Button