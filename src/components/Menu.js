import React from 'react';
import drink from '../assets/img/drinks.png';
import dish from '../assets/img/main_dish.png';
import desert from '../assets/img/cake.png';
import special from '../assets/img/special.png';

const images = [drink, dish, desert, special];

const Menu = (props) => {
  const categories = props.categories.map((cat, i) => {
    return (
      <div className={props.active === cat ?
        'category active-cat' : 'category'}
           onClick={()=>props.switchCategory(cat)}
           key={i}>
        <img src={images[i]} alt=""/>
        <h3>{cat}</h3>
      </div>
    )
  });

  const menuItems = props.menu && props.menu[props.active].map((item,i)=>{
      return (
        <li key={i} onClick={()=>props.addOrder(item)}>
          {item.name}<span>{item.price}€</span>
        </li>
      )
  });

  return (
    <div className="menu">
      <div className="categories">
        {categories}
      </div>
      <ul className="menu-items">
        {menuItems}
      </ul>
      {!props.menu && <div className="loader"/>}
    </div>
  );
};

export default Menu;