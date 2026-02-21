import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();
const db = new Database('verse.db');
const JWT_SECRET = process.env.JWT_SECRET || 'verse-secret-key-123';

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    username TEXT,
    avatar_url TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS stats (
    key TEXT PRIMARY KEY,
    value INTEGER
  );
  INSERT OR IGNORE INTO stats (key, value) VALUES ('views', 0);
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  };

  // Auth Routes
  app.post('/api/auth/signup', async (req, res) => {
    const { email, password, username } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
      const stmt = db.prepare('INSERT INTO users (email, password, username, avatar_url) VALUES (?, ?, ?, ?)');
      const result = stmt.run(email, hashedPassword, username, avatarUrl);
      
      const token = jwt.sign({ id: result.lastInsertRowid, email, username, avatarUrl }, JWT_SECRET);
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.json({ user: { id: result.lastInsertRowid, email, username, avatarUrl } });
    } catch (error: any) {
      res.status(400).json({ error: 'Email already exists or invalid data' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email, username: user.username, avatarUrl: user.avatar_url }, JWT_SECRET);
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.json({ user: { id: user.id, email: user.email, username: user.username, avatarUrl: user.avatar_url } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  app.get('/api/auth/me', authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
  });

  // Feed Routes
  app.get('/api/posts', async (req, res) => {
    const posts = db.prepare(`
      SELECT posts.*, users.username, users.avatar_url 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ORDER BY posts.created_at DESC
    `).all();
    res.json(posts);
  });

  app.post('/api/posts', authenticateToken, (req: any, res) => {
    const { content } = req.body;
    const stmt = db.prepare('INSERT INTO posts (user_id, content) VALUES (?, ?)');
    const result = stmt.run(req.user.id, content);
    
    const newPost = db.prepare(`
      SELECT posts.*, users.username, users.avatar_url 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.id = ?
    `).get(result.lastInsertRowid);
    
    res.json(newPost);
  });

  // Stats Routes
  app.get('/api/stats/views', (req, res) => {
    db.prepare("UPDATE stats SET value = value + 1 WHERE key = 'views'").run();
    const row: any = db.prepare("SELECT value FROM stats WHERE key = 'views'").get();
    res.json({ views: row.value });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
