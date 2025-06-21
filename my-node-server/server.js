const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer(async (req, res) => {
  try {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Home Page');
    } 
    else if (req.method === 'GET' && req.url === '/about') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('About Page');
    }
    else if (req.method === 'POST' && req.url === '/echo') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(Date.now().toString());
    }
    else if (req.method === 'GET' && req.url === '/htmlfile') {
      try {
        const html = await fs.readFile(path.join(PUBLIC_DIR, 'file.html'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      } catch {
        res.writeHead(404);
        res.end('HTML file not found');
      }
    }
    else if (req.method === 'GET' && req.url === '/image') {
      try {
        const image = await fs.readFile(path.join(PUBLIC_DIR, 'image.png'));
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image);
      } catch {
        res.writeHead(404);
        res.end('Image not found');
      }
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});