import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Switch from "react-router-dom/es/Switch";
import ShoppingList from "./ShoppingList";
import Home from "./Home";
import Drawer from "./Drawer";

class App extends Component {
  render() {
    return (
        <Drawer />
    );
  }
}

export default App;
