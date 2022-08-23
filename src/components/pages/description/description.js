import "./description.scss";
import React from "react";
import Attributes from "../../UI/attribute/attribute";
import Price from "../../UI/price/price";
import createDescriptionHTML from "./createDescriptionHTML";

import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import { connect } from "react-redux";
import { GetDescription } from "../../../graphql/queueries.js";
import { addProduct } from "../../../store/cartSlice";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAllSelected: false, currentImage: "" };
    this.addProductHandler = (product) => {
      if (
        product.attributes.filter((attribute) => {
          return attribute.selected !== undefined;
        }).length === product.attributes.length
          ? true
          : false
      ) {
        this.props.addProduct(product);
      } else {
        alert("Choose options first, please!");
      }
    };
  }
  render() {
    return (
      <Query query={GetDescription} variables={this.props.match.params}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error </p>;
          const preparedProduct = JSON.parse(JSON.stringify(data.product)),
            descriptionHTML = createDescriptionHTML(preparedProduct);

          return preparedProduct.inStock ? (
            <div className="description">
              <div className="description__additional-images">
                {preparedProduct.gallery.map((imageURL) => {
                  return (
                    <img
                      src={imageURL}
                      alt="additional"
                      onClick={() => {
                        this.setState({ currentImage: imageURL });
                      }}
                    />
                  );
                })}
              </div>
              <div className="description__main-image">
                <img
                  src={
                    this.state.currentImage || preparedProduct.gallery[0]
                  }
                  alt="main"
                />
              </div>
              <div className="description__content">
                <h1>{preparedProduct.brand} </h1>
                <h2>{preparedProduct.name}</h2>
                <Attributes
                  disabled={false}
                  attributes={preparedProduct.attributes}
                />
                <p className="description__price-text">price:</p>
                <p className="description__price-count">
                  <Price product={preparedProduct} />
                </p>
                <button
                  onClick={() => {
                    this.addProductHandler(preparedProduct);
                  }}
                >
                  add to cart
                </button>
                <span
                  dangerouslySetInnerHTML={{
                    __html: descriptionHTML.outerHTML,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="description__out-of-stock">
              <h1>
                Sorry, but {preparedProduct.brand} {preparedProduct.name}{" "}
                is unavaible now, please check it later.
              </h1>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = function () {
  return {};
};

const mapDispatchToProps = function () {
  return {
    addProduct,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps())(Description)
);
