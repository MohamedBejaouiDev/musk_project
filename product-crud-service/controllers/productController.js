import { supabase } from '../config/database.js';

export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, minPrice, maxPrice } = req.query;
    let query = supabase.from('products').select('*, categories(name, slug)');

    if (search) query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%`);
    if (category) query = query.eq('category_id', category);
    if (minPrice) query = query.gte('price', minPrice);
    if (maxPrice) query = query.lte('price', maxPrice);

    const offset = (page - 1) * limit;
    query = query.order('popularity', { ascending: false }).range(offset, offset + limit - 1);

    const { data: products, error, count } = await query.select('*', { count: 'exact' });
    if (error) throw error;

    res.json({ products, pagination: { page: Number(page), limit: Number(limit), total: count } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: product, error } = await supabase.from('products').select('*, categories(name, slug)').eq('id', id).single();
    if (error || !product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    // Basic checks
    if (!payload.title || !payload.price) return res.status(400).json({ error: 'Missing fields' });

    const { data: product, error } = await supabase.from('products').insert([payload]).select().single();
    if (error) throw error;
    res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { data: product, error } = await supabase.from('products').update(payload).eq('id', id).select().single();
    if (error) throw error;
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Promo endpoint: toggles or sets a promo badge/discount
export const setPromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { badge, discount } = req.body;
    const payload = {};
    if (badge !== undefined) payload.badge = badge;
    if (discount !== undefined) payload.discount = discount;

    const { data: product, error } = await supabase.from('products').update(payload).eq('id', id).select().single();
    if (error) throw error;
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to set promo' });
  }
};
