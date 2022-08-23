import "./cart.scss";
import React from "react";
import CartItem from "../../UI/cart-item/cart-item";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  addProduct,
  deleteProduct,
  total,
  quantity,
} from "../../../store/cartSlice";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tax: 21 };
  }
  render() {
    return (
      <summary className="cart">
        <h1 className="cart__title">Cart</h1>
        <div className="cart__items">
          {this.props.cart.map((product) => {
            return <CartItem minimised={false} item={product} />;
          })}
        </div>
        <div className="cart__total">
          <div>
            <div>
              <p>Tax {this.state.tax}%:</p>
              <p>Quantity:</p>
              <p>Total:</p>
            </div>
            <div>
              <span>
                {this.props.currency.symbol +
                  Number(
                    (this.props.total * this.state.tax) / 100
                  ).toFixed(2)}
              </span>
              <span>{this.props.quantity}</span>
              <span>
                {this.props.currency.symbol +
                  Number(this.props.total).toFixed(2)}
              </span>
            </div>
          </div>
          <button className="cart__confirm-oreder">Order</button>
        </div>
      </summary>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    cart: state.cart.store,
    total: total(state),
    quantity: quantity(state),
    currency: state.cart.currency,
  };
};

const mapDispatchToProps = function () {
  return {
    addProduct,
    deleteProduct,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps())(Cart)
);
