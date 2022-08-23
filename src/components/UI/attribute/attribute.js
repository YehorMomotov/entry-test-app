import "./attribute.scss";
import React from "react";

class Attributes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wasSmthSelected: false };
    this.handleAttributeClick = (attribute, item) => {
      attribute.items.map((item) => {
        item.isSelected = false;
      });
      item.isSelected = true;
      attribute.selected = item;
      this.setState({
        wasSmthSelected: true,
      });
    };
  }
  render() {
    return (
      <div
        className={[
          "attributes",
          this.props.minimised ? "minimised" : "",
        ].join(" ")}
        style={{
          "pointer-events": this.props.disabled ? "none" : "inherit",
        }}
      >
        {this.props.attributes.map((attribute, index) => {
          return (
            <div
              className={["attribute", `type-${attribute.type}`].join(" ")}
            >
              <p>{attribute.name}:</p>
              <div>
                {attribute.items.map((item) => {
                  return (
                    <div
                      className={
                        item.isSelected ? "selected" : "unselected"
                      }
                      onClick={() => {
                        this.handleAttributeClick(attribute, item);
                      }}
                      style={
                        attribute.type === "swatch"
                          ? item.displayValue === "White"
                            ? {
                                "--color": item.value,
                                "--border-color": "black",
                              }
                            : {
                                "--color": item.value,
                                "--border-color": "white",
                              }
                          : {}
                      }
                    >
                      <span>{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Attributes;
