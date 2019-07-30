import React from 'react';

const Header = (props) => {
  const tabs = props.navItems.map((item, i) => {
    return (
      <li className={i === props.activeTab ? 'active' : null}
          onClick={() => props.switchTab(i)}
          key={item}>
        {item}
      </li>
    )  // paspaudus ant li elemento pakeisti state.activeTab i pasirinkta
  });
  return (
    <header><h2>Menu</h2>
      <nav><h1>Home <span>Grill</span></h1>
        <ul>
          {tabs}
        </ul>
      </nav>
    </header>
  );
};

export default Header;