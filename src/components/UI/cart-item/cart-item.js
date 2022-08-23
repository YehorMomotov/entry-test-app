import "./cart-item.scss";
import React from "react";

import Price from "../price/price";
import Attributes from "../attribute/attribute";

import { connect } from "react-redux";
import { addProduct, deleteProduct } from "../../../store/cartSlice";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { galleryIndex: 0 };
    this.handleGallerySliderClick = (action, galleryLength) => {
      if (action === "next") {
        this.setState({
          galleryIndex:
            this.state.galleryIndex + 1 > galleryLength - 1
              ? 0
              : this.state.galleryIndex + 1,
        });
      } else if (action === "previous") {
        this.setState({
          galleryIndex:
            this.state.galleryIndex - 1 < 0
              ? galleryLength - 1
              : this.state.galleryIndex - 1,
        });
      }
    };
  }
  render() {
    return (
      <div
        className={["item", this.props.minimised ? "minimised" : ""].join(
          " "
        )}
      >
        <div className="item__description">
          <h1>{this.props.item.brand}</h1>
          <h2>{this.props.item.name}</h2>
          <Price product={this.props.item} />
          <Attributes
            disabled={true}
            attributes={this.props.item.attributes}
            minimised={this.props.minimised}
          />
        </div>
        <div className="item__quantity">
          <div
            className="item__increment"
            onClick={() => {
              this.props.addProduct(this.props.item);
            }}
          >
            <span>+</span>
          </div>
          <p>{this.props.item.quantity}</p>
          <div
            className="item__decrement"
            onClick={() => {
              this.props.deleteProduct(this.props.item);
            }}
          >
            <span>-</span>
          </div>
        </div>
        <div
          className="item__image"
          style={{
            backgroundImage: `url(${
              this.props.item.gallery[this.state.galleryIndex]
            })`,
          }}
        >
          {!this.props.minimised && (
            <div className="gallery-slider">
              <div
                onClick={() => {
                  this.handleGallerySliderClick(
                    "previous",
                    this.props.item.gallery.length
                  );
                }}
                className="gallery-slider__previous"
              >
                <span></span>
              </div>
              <div
                onClick={() => {
                  this.handleGallerySliderClick(
                    "next",
                    this.props.item.gallery.length
                  );
                }}
                className="gallery-slider__next"
              >
                <span></span>
              </div>
            </div>
          )}
        </div>
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
    addProduct,
    deleteProduct,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CartItem);
