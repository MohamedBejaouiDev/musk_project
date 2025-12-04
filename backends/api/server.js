import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('SUPABASE_URL / SUPABASE_ANON_KEY must be set in .env');
  process.exit(1);
}

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.ADMIN_PANEL_URL || 'http://localhost:5174',
  'http://localhost:5175' // Fallback if 5174 is in use
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origins
    if (allowedOrigins.some(allowed => origin.startsWith(allowed.split(':').slice(0, 2).join(':')))) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Product CRUD Service',
    status: 'OK',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.get('/debug/orders-schema', async (req, res) => {
  try {
    // Try to fetch one order to see the schema
    const { data, error } = await (await import('./config/database.js')).supabase
      .from('orders')
      .select()
      .limit(1);
    
    if (error) {
      return res.json({ error: error.message });
    }
    
    res.json({ 
      success: true,
      sample: data?.[0] || null,
      columns: data?.[0] ? Object.keys(data[0]) : []
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Product CRUD service listening on ${PORT}`);
  console.log(`CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
