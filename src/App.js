import React, {Component} from 'react';
import Header from "./components/Header";
import Menu from "./components/Menu";
import axios from 'axios';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';

const URL = 'https://enigmatic-cliffs-25405.herokuapp.com/menu';

class App extends Component {
  state = {
    categories: ['drinks', 'dishes', 'deserts', 'special'],
    active: 'drinks',
    menu: null,
    navItems: ['Orders', 'Statistics', 'Settings'],
    activeTab: 0,
    orders: [],
    tables: ['table 1', 'table 2', 'table 3', 'table 4',],
    activeTable: 0,
  };

  switchTable = (index) => {
    this.setState({activeTable: index})
  };

  addOrder = (order) => {
    console.log(order)
    // ideti objekta i orders masyva
    this.setState({orders: [...this.state.orders,
        {
          ...order,
          tableNr: this.state.activeTable,
          date:Date.now()
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
    console.log(response)
    this.setState({menu: response.data.menu})
  };


  switchCategory = (i) => {
    this.setState({active: i})
  };

  render() {
    const content = [
      <Orders orders={this.state.orders}
              switchTable={this.switchTable}
              activeTable={this.state.activeTable}
              tables={this.state.tables}/>,
      <Statistics/>,
      <Settings/>
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