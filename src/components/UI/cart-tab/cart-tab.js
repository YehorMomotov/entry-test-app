import "./cart-tab.scss";
import React from "react";
import emptyCart from "../../../images/Empty Cart.svg";
import CartItem from "../cart-item/cart-item";

import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { total, quantity } from "../../../store/cartSlice";

class CartTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  render() {
    const query = new URLSearchParams(this.props.history.location.search);
    this.props.cartLength(this.props.cart.length);
    return (
      <div>
        <div
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
          className="cart-tab__cart-image"
        >
          <img src={emptyCart} alt="empty cart" />
          {this.props.cart.length > 0 ? (
            <div className="cart-tab__quantity-tag">
              <span>{this.props.quantity}</span>
            </div>
          ) : (
            ""
          )}
        </div>

        {this.state.isOpen && (
          <div
            className="cart-tab__overlay"
            onClick={() => {
              this.setState({ isOpen: false });
            }}
          >
            <div
              className="cart-tab__content"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="items-list">
                <div className="items-list__header">
                  <h2>My Bag, </h2>
                  <p>{this.props.cart.length} items</p>
                </div>
                <div
                  className="items-list__items"
                  style={{
                    "--height":
                      this.props.cart.length > 2
                        ? `${250 * 2}px`
                        : "fit-content",
                    "--scroll":
                      this.props.cart.length > 2 ? "auto" : "none",
                  }}
                >
                  {this.props.cart.map((product) => {
                    return <CartItem minimised={true} item={product} />;
                  })}
                </div>
                <div className="items-list__footer">
                  <summary className="items-list__total">
                    <h2>Total</h2>

                    <h2>
                      {this.props.currency.symbol +
                        Number(this.props.total).toFixed(2)}
                    </h2>
                  </summary>
                  <div className="items-list__controls">
                    <Link
                      onClick={() => {
                        this.setState({ isOpen: false });
                      }}
                      to={{
                        pathname: "/cart",
                        search: "?" + query.toString(),
                      }}
                    >
                      View bag
                    </Link>
                    <button>Check out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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

export default withRouter(connect(mapStateToProps)(CartTab));
