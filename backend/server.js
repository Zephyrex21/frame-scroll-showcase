const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin:[
        "http://localhost:5173",
        "https://your-vercel-url.vercel.app"
    ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Static Files (compressed watch frames) ────────────────────────────────────
app.use('/frames', express.static(path.join(__dirname, 'public/frames'), {
  maxAge: '7d',                // Cache frames for 7 days
  immutable: true,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
  },
}));

// ─── MongoDB Connection ────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => {
    console.warn('⚠ MongoDB not connected (running without DB):', err.message);
  });

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/api', require('./routes/api'));

// ─── Frame Meta Endpoint ───────────────────────────────────────────────────────
app.get('/api/frames/meta', (req, res) => {
  res.json({
    count: 240,
    baseUrl: '/frames',
    format: 'jpg',
    width: 1280,
    height: 720,
    fps: 24,
  });
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏆 HALCYON Backend running on http://localhost:${PORT}`);
  console.log(`   Frames: http://localhost:${PORT}/frames/frame_00000.jpg`);
  console.log(`   API:    http://localhost:${PORT}/api/watch\n`);
});
