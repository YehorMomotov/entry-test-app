import "./App.scss";
import React from "react";
import Header from "./components/UI/header/header.js";
import Catalog from "./components/pages/catalog/catalog.js";
import Description from "./components/pages/description/description";
import Cart from "./components/pages/cart/cart";

import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/catalog" children={<Catalog />} />
          <Route path="/description/:id" children={<Description />} />
          <Route path="/cart" children={<Cart />} />
        </Switch>
      </div>
    );
  }
}

export default App;
