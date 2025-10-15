import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (filters = {}) => {
  await delay(200);
  let products = [...productsData];
  
  if (filters.categoryId) {
    products = products.filter(p => p.categoryId === filters.categoryId);
  }
  
  if (filters.search) {
    products = products.filter(p => 
      p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.brand.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  return products;
};

export const getProduct = async (id) => {
  await delay(150);
  return productsData.find(p => p.id === parseInt(id));
};

export const getCategories = async () => {
  await delay(100);
  return categoriesData;
};