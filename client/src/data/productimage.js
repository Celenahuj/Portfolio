// Module minimal pour les images de produits
const sampleImages = [
  { id: 1, product_id: 1, name: "images/chair-1.jpg" },
  { id: 2, product_id: 1, name: "images/chair-2.jpg" },
  { id: 3, product_id: 2, name: "images/table-1.jpg" }
];

export const ProductImageData = {
  async fetchAll() {
    return new Promise((res) => setTimeout(() => res(sampleImages.slice()), 10));
  }
};

export default ProductImageData;
