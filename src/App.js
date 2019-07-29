import React, {Component} from 'react';
import Header from "./components/Header";
import Menu from "./components/Menu";
import axios from 'axios';

const URL = 'https://enigmatic-cliffs-25405.herokuapp.com/menu';

class App extends Component {
  state={
    categories:['drinks','dishes', 'deserts', 'special'],
    active:'drinks',
    menu:null
  };
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

  componentDidMount = async ()=>{
    const response = await axios.get(URL);
    console.log(response)
    this.setState({menu:response.data.menu})
  };



  switchCategory =(i)=>{
      this.setState({active:i})
  };

  render() {
    return (
      <div>
        <Header/>
        <Menu active={this.state.active}
              switchCategory={this.switchCategory}
              menu={this.state.menu}
              categories={this.state.categories}/>
      </div>
    );
  }
}

export default App;