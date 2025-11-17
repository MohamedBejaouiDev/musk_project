import { supabase } from '../config/database.js';

export const getCart = async (req, res) => {
  try {
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', req.user.id);

    if (error) {
      console.error('Cart fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch cart' });
    }

    res.json({ cartItems });
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check product stock
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ error: `Only ${product.stock} items available in stock` });
      }

      // Update quantity
      const { data: updatedItem, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: 'Failed to update cart item' });
      }

      return res.json({ message: 'Cart updated', cartItem: updatedItem });
    }

    // Validate stock for new item
    if (quantity > product.stock) {
      return res.status(400).json({ error: `Only ${product.stock} items available in stock` });
    }

    // Add new item
    const { data: cartItem, error } = await supabase
      .from('cart_items')
      .insert([{
        user_id: req.user.id,
        product_id: productId,
        quantity
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to add to cart' });
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Get cart item with product info
    const { data: cartItem, error: cartError } = await supabase
      .from('cart_items')
      .select('*, products(stock)')
      .eq('id', itemId)
      .eq('user_id', req.user.id)
      .single();

    if (cartError || !cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Validate stock
    if (quantity > cartItem.products.stock) {
      return res.status(400).json({ error: `Only ${cartItem.products.stock} items available in stock` });
    }

    const { data: updatedItem, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update cart item' });
    }

    res.json({ message: 'Cart item updated', cartItem: updatedItem });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(500).json({ error: 'Failed to remove item' });
    }

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(500).json({ error: 'Failed to clear cart' });
    }

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};