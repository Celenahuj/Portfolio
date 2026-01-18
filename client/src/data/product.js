// Données de produit minimalistes pour le dev local
const sampleProducts = [
  { id: 1, name: "Chaise Classic", description: "Une chaise confortable.", price: "49.99", image: "images/chair.jpg", category_id: 1 },
  { id: 2, name: "Table Bois", description: "Table en chêne.", price: "129.99", image: "images/table.jpg", category_id: 2 },
  { id: 3, name: "Lampe LED", description: "Lampe moderne.", price: "29.99", image: "images/lamp.jpg", category_id: 3 }
];

export const ProductData = {
  async fetchAll() {
    // Simuler un fetch asynchrone
    return new Promise((res) => setTimeout(() => res(sampleProducts.slice()), 10));
  },

  async fetchById(id) {
    const all = await this.fetchAll();
    return all.find(p => String(p.id) === String(id)) || null;
  }
};

export default ProductData;
