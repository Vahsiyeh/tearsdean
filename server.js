const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Uploads klasörü
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Tüm cihazların ortak göreceği global içerik dosyası (contents.json)
const dbFile = path.join(__dirname, 'contents.json');

function getContents() {
    if (!fs.existsSync(dbFile)) return [];
    try {
        return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    } catch {
        return [];
    }
}

function saveContents(contents) {
    fs.writeFileSync(dbFile, JSON.stringify(contents, null, 2));
}

// Tüm dünyadan (Ankara, İstanbul vs.) atılan içerikleri ortak getir
app.get('/api/contents', (req, res) => {
    const contents = getContents();
    res.json(contents);
});

// Yeni içerik yükle ve herkes için global yap
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Dosya yüklenmedi' });
    }

    const newContent = {
        id: Date.now(),
        title: req.body.title || 'Untitled',
        description: req.body.description || '',
        type: req.body.type || 'video',
        fileUrl: `/uploads/${req.file.filename}`,
        thumbnailUrl: req.body.thumbnailUrl || `/uploads/${req.file.filename}`,
        duration: req.body.duration || '0:30',
        authorName: req.body.authorName || 'FreezyOfficial0',
        authorHandle: req.body.authorHandle || 'freezyofficial',
        authorAvatar: req.body.authorAvatar || '',
        authorBg: req.body.authorBg || '#a855f7',
        views: 1,
        viewedUsers: [req.body.authorEmail || 'guest']
    };

    const contents = getContents();
    contents.push(newContent);
    saveContents(contents);

    res.json({ success: true, content: newContent });
});

// İçerik silme
app.delete('/api/contents/:id', (req, res) => {
    const id = Number(req.params.id);
    let contents = getContents();
    contents = contents.filter(c => c.id !== id);
    saveContents(contents);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🔥 Sunucu fişek gibi çalışıyor: http://localhost:${PORT}`);
});
