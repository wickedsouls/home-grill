import React from 'react';
import Table from "../components/Table";

const Orders = (props) => {
  const tables = props.tables.map((table,i)=>{
      return <Table table={table}
                    orders={props.orders}
                    key={i}
                    index={i}
                    deleteOrder={props.deleteOrder}
                    checkOut={props.checkOut}
                    activeTable={props.activeTable}
                    switchTable={props.switchTable}/>
  });

  return (
    <div className='orders'>
      {tables}
    </div>
  );
};

export default Orders;