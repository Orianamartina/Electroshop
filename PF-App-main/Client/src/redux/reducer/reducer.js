import { GET_USER, GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_CART, ALL_FILTERS } from "../actions/actions-types";
import { handleFilters } from "../../functions/utils.js";

const initialState = {
  user: {},
  allProducts: [],
  productDetail: {},
  cartProducts: [],
  cartDetail: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case GET_CART:
      return {
        ...state,
        cartProducts: action.payload.cartProducts,
        cartDetail: {
          totalPrice: action.payload.totalPrice,
          totalQuantity: action.payload.totalQuantity,
          discountPrice: action.payload.discountPrice,
        },
      };

    case ALL_FILTERS:
      const { brand, category, order } = action.payload.condition;
      const filteredProducts = handleFilters(action.payload.response, {
        brand,
        category,
        order,
      });
      return { ...state, allProducts: filteredProducts };
    case GET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    default:
      return state;
  }
}
