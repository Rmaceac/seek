import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import ButtonAppBar from "./components/Nav/NavBar"
import Theme from './theme/themeOptions';
import { ThemeProvider } from "@mui/material/styles"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div className="App">
          <ButtonAppBar />
          <h1>{ this.state.message }</h1>
          <button onClick={this.fetchData} >
            Fetch Data
          </button>        
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
