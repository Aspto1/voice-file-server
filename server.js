const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Store uploaded audio in the /public folder
const storage = multer.diskStorage({
  destination: 'public/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Serve static audio
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
