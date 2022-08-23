import "./select.scss";
import React from "react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrency } from "../../../store/cartSlice";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selected: props.selected,
      items: props.items,
    };

    this.props.setCurrency(this.props.selected);

    this.handleToggleClick = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    this.handleChangeSelectedClick = (item) => {
      this.setState({
        selected: { label: item.label, symbol: item.symbol },
      });
      const query = new URLSearchParams(
        this.props.history.location.search
      );
      query.set("currency", item.label);
      this.props.history.replace(
        `${this.props.location.pathname}?${query}`
      );
      this.props.setCurrency(item);
    };
  }
  render() {
    return (
      <div
        style={{
          "--angle": this.state.isOpen ? "225deg" : "45deg",
        }}
        onClick={() => {
          this.handleToggleClick();
        }}
        className="select "
      >
        <span>
          {this.state.selected.symbol || this.state.selected.label || ""}
        </span>
        {this.state.isOpen && (
          <div className="select__options">
            {this.state.items.map((item) => {
              return (
                <span
                  className="select__option"
                  key={item.label}
                  onClick={() => {
                    this.handleChangeSelectedClick(item);
                  }}
                >
                  {item.symbol + " " + item.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    currency: state.cart.currency,
  };
};
const mapDispatchToProps = function () {
  return {
    setCurrency,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps())(Select)
);
