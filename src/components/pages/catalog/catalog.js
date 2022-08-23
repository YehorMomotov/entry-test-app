import "./catalog.scss";
import React from "react";
import emptyCart from "../../../images/Empty Cart.svg";
// import heart from "../../../images/heart.svg";
// import check from "../../../images/check.svg";

import Price from "../../UI/price/price";

import { Query } from "react-apollo";
import { GetProducts } from "../../../graphql/queueries.js";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addProduct } from "../../../store/cartSlice";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCurrency: "USD",
      defaultCategory: "all",
    };
    this.addToCart = (product) => {
      this.props.addProduct(product);
    };
  }
  render() {
    const searchParams = new URLSearchParams(
      this.props.history.location.search
    );
    return (
      <main className="catalog">
        <h1 className="catalog__heading">Category name</h1>
        <ul className="items-list">
          <Query
            query={GetProducts}
            variables={{
              title: searchParams.get(
                "category" || this.state.defaultCategory
              ),
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading…</p>;
              if (error) return <p>Error </p>;
              return data.category.products.map((product) => {
                return (
                  <li
                    key={product.id}
                    className={[
                      "items-list__item",
                      product.inStock ? "" : "out-of-stock",
                    ].join(" ")}
                  >
                    <div className="items-list__controls">
                      <img src={product.gallery[0]} alt="content1" />
                      {product.inStock && (
                        <Link
                          className="items-list__link"
                          to={{
                            pathname: `/description/${product.id}`,
                            search: "?" + searchParams.toString(),
                          }}
                        >
                          <img src={emptyCart} alt="desciption link" />
                        </Link>
                      )}
                      {/* elemets below (favorite and discount) was hidden in design,
                       so i made them and commented them out
                      <div className="items-list__favorite">
                        <img src={heart} alt="add to favorite" />
                      </div>
                      <div className="items-list__discount">
                        <div>
                          <img src={check} alt="discount" />
                          <p>-50%</p>
                        </div>
                      </div> */}
                    </div>
                    <h1>{product.brand + " " + product.name}</h1>
                    <p>
                      <Price product={product} />
                    </p>
                  </li>
                );
              });
            }}
          </Query>
        </ul>
      </main>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    cart: state.cart.store,
  };
};

const mapDispatchToProps = function () {
  return {
    addProduct,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps())(Catalog)
);
