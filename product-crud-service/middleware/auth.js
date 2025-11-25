import { verifyToken } from '../utils/jwt.js';
import { supabase } from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  try {
    const decoded = verifyToken(token);
    
    // Fetch user from DB to verify existence and get role
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, address')
      .eq('id', decoded.userId)
      .single();
    
    if (error || !user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = { 
      id: user.id, 
      email: user.email,
      isAdmin: user.email && user.email.endsWith('@admin.com') // Simple admin check
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
