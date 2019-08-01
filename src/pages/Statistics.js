import React from 'react';
import moment from 'moment';
import 'moment/locale/lt';
moment.locale('lt')

const Statistics = (props) => {

  const total = props.turnover.reduce((total, item) => {
    return total + item.price
  }, 0);

  // isvesti visa sarasa uzsakymu i puslapi kur matytusi name ir price


  const list = props.turnover.map((order, i) => {
    return <li key={i}>
      {order.name} -
      {order.price.toFixed(2)}€
      <span>{moment(order.date).format('MMMM-DD h:mm:ss')}</span>
    </li>
  });

  return (
    <div className='stats'>
      <h3>Statistics</h3>
      <h4>{total.toFixed(2)}€</h4>
      <ul>
        {list}
      </ul>
    </div>
  );
};

export default Statistics;