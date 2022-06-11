import React from 'react'
import './style.css'

const Header = ({
    back = false
}) => {
  return (
    <div className='header'>
        {back ? <div>back</div> : <div>logo</div>}
        {!back && <div>
            cart
            </div>}
    </div>
  )
}

export default Header