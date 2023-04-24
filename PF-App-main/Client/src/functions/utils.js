import { toast } from "react-toastify";

export const handleOrder = (allProducts, orderProducts) => {
  const sortedProducts = allProducts.sort((a, b) => {
    if (orderProducts === "menor") {
      return a.price - b.price;
    } else if (orderProducts === "mayor") {
      return b.price - a.price;
    } else if (orderProducts === "none") {
      return allProducts;
    }
  });
  return sortedProducts;
};

export const handleFilters = (products, condition) => {
  const { brand, category, order } = condition;
  let filteredProducts = products;
  if (brand !== "") filteredProducts = filteredProducts.filter((product) => product.brand === brand);
  if (category !== "") filteredProducts = filteredProducts.filter((product) => product.category === category);
  if (order !== "none") filteredProducts = handleOrder(filteredProducts, order);
  return filteredProducts;
};
