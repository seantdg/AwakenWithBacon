import React, { Component } from 'react';
import logo from './bacon.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Awaken with Bacon!</h1>
        </header>
        <p className="App-intro">Want a bacon sandwich delivered to your house? Fill in the form below!</p>
        <DeliveryForm/>
      </div>
    );
  }
}

class DeliveryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sauce: '',
        address: '',
        hasOrdered: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }   

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log('An order was submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
    axios.post('http://localhost:3001/delivery/v1/orders',
    {
        "sauce": this.state.sauce,
        "address": this.state.address
    })
    .then((response) => {
        this.setState({hasOrdered: true});
    })
    .catch((error) => {
        this.setState({hasOrdered: true});
        alert(error); 
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Sauce:</label>
        <br/>
        <select name="sauce" value={this.state.sauce} onChange={this.handleChange}>
            <option value="">None</option>
            <option value="red">Ketchup</option>
            <option value="brown">Brown</option>
        </select>
        <br/>
        <label>Address:</label>
        <br/>
        <textarea name="address" rows="5" cols="30" value={this.state.address} onChange={this.handleChange}/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
