import React from 'react';

const Header = (props) => {
  return (
    <header><h2>Menu</h2>
      <nav><h1>Home <span>Grill</span></h1>
        <ul>
          <li className="active">Orders</li>
          <li>Statistics</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;