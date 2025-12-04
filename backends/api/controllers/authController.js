import { supabase } from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { data: existing } = await supabase.from('users').select('id').eq('email', email).maybeSingle();
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await hashPassword(password);
    const { data: user, error } = await supabase.from('users').insert([{ first_name: firstName, last_name: lastName, email, password: hashed }]).select('id, email, first_name, last_name').single();
    if (error) throw error;

    const token = generateToken(user.id);
    const isAdmin = user.email && user.email.endsWith('@admin.com');
    res.status(201).json({ token, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, isAdmin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { data: user, error } = await supabase.from('users').select('id, email, password, first_name, last_name').eq('email', email).single();
    if (error || !user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id);
    const isAdmin = user.email && user.email.endsWith('@admin.com');
    res.json({ token, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, isAdmin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
