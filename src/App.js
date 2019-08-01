import React, {Component} from 'react';
import Header from "./components/Header";
import Menu from "./components/Menu";
import axios from 'axios';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import shortid from 'shortid';

const URL = 'https://enigmatic-cliffs-25405.herokuapp.com/menu/';

class App extends Component {
  state = {
    categories: ['drinks', 'dishes', 'deserts', 'special'],
    active: 'drinks',
    menu: null,
    navItems: ['Orders', 'Statistics', 'Settings'],
    activeTab: 0,
    orders: [],
    turnover: [],
    tables: ['table 1', 'table 2', 'table 3', 'table 4',],
    activeTable: 0,
  };



  checkOut = (tableNr) => {
    // isvesti i konsole tableNr ant kurio buvo paspaustas checkout
    console.log(tableNr)
    // istrinti is orders visus uzsakymus kuriu stalo nr lygus tableNr
    const updatedOrders = this.state.orders.filter(order => order.tableNr !== tableNr);
    // duomenys statistikai
    const turnover = this.state.orders.filter(order => order.tableNr === tableNr)

    // apkeiciam state
    this.setState({
      orders: updatedOrders,
      turnover: [...this.state.turnover, ...turnover]
    })
  };

  switchTable = (index) => {
    this.setState({activeTable: index})
  };

  deleteOrder = id => {
    const updatedOrders = this.state.orders.filter(order => order.id !== id)
    this.setState({orders: updatedOrders})
  };

  addOrder = (order) => {
    console.log(order)
    // ideti objekta i orders masyva
    this.setState({
      orders: [...this.state.orders,
        {
          ...order,
          tableNr: this.state.activeTable,
          date: Date.now(),
          id: shortid.generate()
        }
      ]
    })
    // idetas objektas turi tureti stalo numeri kuriam jis priklauso
    // idetas objektas turi tureti data kada buvo sukurtas
  };

  switchTab = index => this.setState({activeTab: index});

  /* Promise
  componentDidMount(){
    // 1. uzklausa i serveri
    axios.get(URL).then((response)=>{
        console.log(response)
    });
    // 2. update state
  }]
  */

  // async await
  // isorine funk. pasymima kaip asinchronine (async)
  // veiksmas kuris bus veluos pazymimas su zodziu await

  componentDidMount = async () => {
    const response = await axios.get(URL);
    this.setState({menu: response.data.menu})
  };


  switchCategory = (i) => {
    this.setState({active: i})
  };

  addSpecial = async item => {
    // update menu.special
    const menu = {...this.state.menu, special:[...this.state.menu.special,
        {...item, id:shortid.generate()} ]};

    // axios.post(adresas, objektas su duomenim)  -> siunciam duomenis
    await axios.post(URL, item);

    this.setState({menu:menu})
  };
  
  deleteSpecial = async name =>{
    // isfiltruojam visus special
    const special = this.state.menu.special.filter(item=>item.name!==name);
    // update server
    await axios.delete(URL+name);
    // update state
    this.setState({menu:{...this.state.menu, special}})
  };

  render() {
    const content = [
      <Orders orders={this.state.orders}
              switchTable={this.switchTable}
              activeTable={this.state.activeTable}
              deleteOrder={this.deleteOrder}
              checkOut={this.checkOut}
              tables={this.state.tables}/>,
      <Statistics turnover={this.state.turnover}/>,
      <Settings addSpecial={this.addSpecial}
                deleteSpecial={this.deleteSpecial}
                menu={this.state.menu}
                name='settings'/>
    ];
    return (
      <div>
        <Header switchTab={this.switchTab}
                activeTab={this.state.activeTab}
                navItems={this.state.navItems}/>
        <Menu active={this.state.active}
              switchCategory={this.switchCategory}
              menu={this.state.menu}
              addOrder={this.addOrder}
              categories={this.state.categories}/>
        {content[this.state.activeTab]}
      </div>
    );
  }
}

export default App;