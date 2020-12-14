import React from 'react';
import './NavbarItem.css';

const MenuItem = (props) => {
  let activeStyle = null;
  if (props.isActive) activeStyle = { backgroundColor: '#d3c8b4', color: '#16181a' };

  let className = 'navbar-item';
  if (props.isDisabled) className += ' navbar-item-disabled';
  return (
    <button className={className} onClick={props.onClick} style={activeStyle} disabled={props.isDisabled}>
      {props.text}
    </button>
  );
};

export default MenuItem;
