const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3100;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const normalizedName = file.originalname.toLowerCase().replace(/\s+/g, '_');
    cb(null, normalizedName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/zip', 'application/x-zip-compressed'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 512 * 1024 }
});

app.post('/upload-file', upload.single('file'), (req, res) => {
  let message = '';
  let isError = true;

  if (!req.file) {
    message = 'only zip files';
  } else if (req.file.size > 512 * 1024) {
    message = 'The file is too large';
  } else {
    message = 'the file was uploaded successfully';
    isError = false;
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Upload Result</title>
        <style>
          #message { margin: 10px 0; padding: 10px; border-radius: 5px; }
          .error { color: #d32f2f; }
          .success { color: #2e7d32; }
        </style>
      </head>
      <body>
        <form action="/upload-file" method="post" enctype="multipart/form-data">
          <input type="file" name="file" required>
          <button type="submit">Upload</button>
        </form>
        <div id="message" class="${isError ? 'error' : 'success'}">${message}</div>
        <script>
          setTimeout(() => {
            document.getElementById('message').textContent = '';
          }, 5000);
        </script>
      </body>
    </html>
  `);
});

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(400).send('The file is too large');
  } else if (err instanceof multer.MulterError) {
    res.status(400).send('file upload error');
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});