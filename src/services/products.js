import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Transform database product to frontend format
const transformProduct = (dbProduct) => ({
  id: dbProduct.id,
  title: dbProduct.title,
  brand: dbProduct.brand,
  categoryId: dbProduct.category_id,
  price: parseFloat(dbProduct.price),
  discount: dbProduct.discount || 0,
  badge: dbProduct.badge,
  stock: dbProduct.stock,
  images: dbProduct.images,
  description: dbProduct.description,
  specs: dbProduct.specs,
  rating: {
    average: parseFloat(dbProduct.rating_average),
    count: dbProduct.rating_count
  },
  popularity: dbProduct.popularity,
  createdAt: dbProduct.created_at
});

export const getProducts = async (filters = {}) => {
  let query = supabase.from('products').select('*');
  
  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }
  
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data.map(transformProduct);
};

export const getProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  return transformProduct(data);
};

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id');
  
  if (error) throw error;
  
  return data;
};