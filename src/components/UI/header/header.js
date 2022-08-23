import "./header.scss";
import React from "react";
import logo from "../../../images/logo.svg";
import Select from "../select/select";
import CartTab from "../cart-tab/cart-tab";

import { Link, withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import {
  GetCurrencies,
  GetCategories,
} from "../../../graphql/queueries.js";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { defaultCurrency: "USD" };
    this.cartLength = (length) => {
      this.setState({ cartLength: length });
    };
  }
  render() {
    const query = new URLSearchParams(this.props.history.location.search);
    return (
      <header className="header">
        <div className="header__categories">
          <Query query={GetCategories}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading…</p>;
              if (error) return <p>Error </p>;
              return data.categories.map((category) => {
                query.set("category", category.name);

                if (
                  this.props.history.location.pathname === "/catalog" &&
                  !new URLSearchParams(
                    this.props.history.location.search
                  ).has("currency")
                ) {
                  query.set("currency", this.state.defaultCurrency);
                  this.props.history.push(`/catalog?${query}`);
                }
                return (
                  <Link
                    className={
                      new URLSearchParams(
                        this.props.history.location.search
                      ).get("category") === category.name
                        ? "category-active"
                        : ""
                    }
                    to={{
                      pathname: "/catalog",
                      search: "?" + query.toString(),
                    }}
                  >
                    {category.name}
                  </Link>
                );
              });
            }}
          </Query>
        </div>
        <Link
          className="header__logo"
          to={{
            pathname: "/cart",
            search: "?" + query.toString(),
          }}
        >
          <img
            src={logo}
            alt="logo"
            className={this.state.cartLength ? "" : "semi-transparent"}
          />
        </Link>
        <div className="header__cart-and-currency">
          <Query query={GetCurrencies}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading…</p>;
              if (error) return <p>Error </p>;

              const currency = data.currencies.find(
                (currency) =>
                  currency.label ===
                  new URLSearchParams(this.props.location.search).get(
                    "currency"
                  )
              );
              return (
                <Select selected={currency} items={data.currencies} />
              );
            }}
          </Query>
          <CartTab
            cartLength={this.cartLength}
            currency={new URLSearchParams(this.props.location.search).get(
              "currency"
            )}
          />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
