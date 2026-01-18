import { ProductData } from "./product.js";

const sampleCategories = [
  { id: 1, name: "Chaises" },
  { id: 2, name: "Tables" },
  { id: 3, name: "Luminaires" }
];

export const CategoryData = {
  async fetchAll() {
    return new Promise((res) => setTimeout(() => res(sampleCategories.slice()), 10));
  },

  async fetchByCategory(categoryId) {
    const products = await ProductData.fetchAll();
    return products.filter(p => String(p.category_id) === String(categoryId));
  }
};

export default CategoryData;
