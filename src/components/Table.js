import React from 'react';

const Table = (props) => {

  // isfiltruojam uzsakymus priklausancius tam stalui
  const tableOrders = props.orders.filter((order) => {
    return order.tableNr === props.index
  });

  // .reduce(funkcija, totalPradineReiksme)
  const total = tableOrders.reduce((total, item) => {
    return total + item.price;
  }, 0);

  // sugeneruojam HTML is isfiltruotu stalu
  const orders = tableOrders.map((order, i) => {
    return (
      <li className="item" key={i}>
        {order.name}
        <span className="delete"
              onClick={() => props.deleteOrder(order.id)}>
          x
        </span>
        <span className="price">{order.price.toFixed(2)}€</span>
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
        <div className="btn" onClick={()=>props.checkOut(props.index)}>
          Checkout
        </div>
        <h5>Total: {total.toFixed(2)}€</h5>
      </nav>
    </div>
  );
};

export default Table;