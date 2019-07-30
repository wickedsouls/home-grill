import React from 'react';

const Table = (props) => {

  const orders = props.orders.filter((order) => {
    return order.tableNr === props.index
  }).map((order, i) => {
    return (
      <li className="item" key={i}>
        {order.name}
        <span className="delete">x</span>
        <span className="price">{order.price}€</span>
      </li>
    )
  });

  return (
    <div onClick={() => props.switchTable(props.index)}
         className={props.index === props.activeTable ?
           'table active-table' : 'table'}>
      <h4>{props.table}</h4>
      <ul>
        {orders}
      </ul>
      <nav>
        <div className="btn">Checkout</div>
        <h5>Total: 6.30€</h5></nav>
    </div>
  );
};

export default Table;