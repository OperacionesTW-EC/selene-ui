import React from 'react';

const NavbarToggle = (props) => {
  return (
    <div>
      <button type='button'
        className={'navbar-toggle' + (props.collapsed ? ' collapsed' : '')}
        data-toggle='collapse'
        data-target='#navbar'
        aria-expanded='false'
        aria-controls='navbar'
        onClick={props.setToggle}>
        <span className='sr-only'>Toggle navigation</span>
        <span className='icon-bar top-bar'></span>
        <span className='icon-bar middle-bar'></span>
        <span className='icon-bar bottom-bar'></span>
      </button>
    </div>
  )
}
export default NavbarToggle;
