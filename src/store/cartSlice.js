import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: [],

  currency: { label: "USD", sign: "$" },
};

function withoutQuantity(product) {
  const { quantity, ...productWithoutQuantity } = product;
  return productWithoutQuantity;
}

function findSameProduct(state, searchProduct) {
  let index;
  const sameProduct = state.store.find((product, i) => {
    index = i;
    return (
      JSON.stringify(withoutQuantity(product)) ===
      JSON.stringify(withoutQuantity(searchProduct))
    );
  });
  return { sameProduct, index };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = JSON.parse(JSON.stringify(action.payload));
      const { sameProduct } = findSameProduct(state, newProduct);

      if (sameProduct) {
        sameProduct.quantity++;
      } else {
        newProduct.quantity = 1;
        state.store.push(newProduct);
      }
    },

    deleteProduct: (state, action) => {
      const delProduct = JSON.parse(JSON.stringify(action.payload));
      const { sameProduct, index } = findSameProduct(state, delProduct);
      sameProduct.quantity > 1
        ? sameProduct.quantity--
        : state.store.splice(index, 1);
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, setCurrency } =
  cartSlice.actions;

export const total = (state) => {
  let res = 0;
  state.cart.store.map((product) => {
    res +=
      product.prices.find(
        (price) => price.currency.label === state.cart.currency.label
      ).amount * product.quantity;
  });
  return res;
};

export const quantity = (state) => {
  let res = 0;
  state.cart.store.map((product) => {
    res += product.quantity;
  });
  return res;
};

export default cartSlice.reducer;
