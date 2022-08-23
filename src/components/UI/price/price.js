import React from "react";
import { connect } from "react-redux";

class Price extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const price = () => {
      return this.props.product.prices.find(
        (price) => price.currency.label === this.props.currency.label
      );
    };
    return (
      <h3>
        {price().currency.symbol +
          Number(
            this.props.product.quantity
              ? price().amount * this.props.product.quantity
              : price().amount
          ).toFixed(2)}
      </h3>
    );
  }
}
const mapStateToProps = function (state) {
  return {
    currency: state.cart.currency,
  };
};

export default connect(mapStateToProps)(Price);
