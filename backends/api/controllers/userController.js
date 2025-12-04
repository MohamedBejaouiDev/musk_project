import { supabase } from '../config/database.js';

export async function listUsers(req, res) {
  try {
    const { search, limit = 50, offset = 0 } = req.query;
    
    let query = supabase
      .from('users')
      .select('id, email, first_name, last_name, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);
    
    if (search) {
      query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
    }
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    res.json({
      users: data || [],
      total: count || 0,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('List users error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch users' });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, created_at')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });
    
    res.json(data);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch user' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    
    // Don't allow deleting admin user
    const { data: user } = await supabase
      .from('users')
      .select('email')
      .eq('id', id)
      .single();
    
    if (user && user.email === 'admin@admin.com') {
      return res.status(403).json({ error: 'Cannot delete admin user' });
    }
    
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete user' });
  }
}
