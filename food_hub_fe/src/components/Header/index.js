import React from 'react'
import './style.css'

const Header = ({
    back = false,
    onCartClick = () => {},
    onBackClick = () => {},
    cart
}) => {
  return (
    <div className='header'>
        {back ? <div onClick={onBackClick}>back</div> : <div>logo</div>}
        {!back && <div onClick={onCartClick}>
            cart-{cart.length}
            </div>}
    </div>
  )
}

export default Header