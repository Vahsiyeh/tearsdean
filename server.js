const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/api/contents', (req, res) => {
    res.json(getContents());
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Dosya yok' });

    const newContent = {
        id: Date.now(),
        title: req.body.title || 'Untitled',
        description: req.body.description || '',
        type: req.body.type || 'video',
        fileUrl: `/uploads/${req.file.filename}`,
        thumbnailUrl: req.body.thumbnailUrl || `/uploads/${req.file.filename}`,
        duration: req.body.duration || '0:30',
        authorName: req.body.authorName || 'User',
        authorHandle: req.body.authorHandle || 'user',
        authorAvatar: req.body.authorAvatar || '',
        authorBg: req.body.authorBg || '#a855f7',
        views: 1,
        viewedUsers: [req.body.authorEmail || 'guest'],
        likes: 0,
        likedUsers: [],
        comments: [],
        subscribers: []
    };

    const contents = getContents();
    contents.push(newContent);
    saveContents(contents);
    res.json({ success: true, content: newContent });
});

// Like Güncelleme
app.post('/api/contents/:id/like', (req, res) => {
    const id = Number(req.params.id);
    const { email } = req.body;
    let contents = getContents();
    const item = contents.find(c => c.id === id);
    if (!item) return res.status(404).json({ error: 'Bulunamadı' });

    if (!item.likedUsers) item.likedUsers = [];
    const index = item.likedUsers.indexOf(email);
    let liked = false;

    if (index > -1) {
        item.likedUsers.splice(index, 1);
        item.likes = Math.max(0, (item.likes || 1) - 1);
    } else {
        item.likedUsers.push(email);
        item.likes = (item.likes || 0) + 1;
        liked = true;
    }

    saveContents(contents);
    res.json({ success: true, likes: item.likes, liked });
});

// Yorum Ekleme
app.post('/api/contents/:id/comment', (req, res) => {
    const id = Number(req.params.id);
    const { text, authorName, authorHandle, authorAvatar, authorBg } = req.body;
    let contents = getContents();
    const item = contents.find(c => c.id === id);
    if (!item) return res.status(404).json({ error: 'Bulunamadı' });

    if (!item.comments) item.comments = [];
    const newComment = {
        id: Date.now(),
        text,
        authorName,
        authorHandle,
        authorAvatar,
        authorBg,
        time: Date.now()
    };
    item.comments.push(newComment);
    saveContents(contents);
    res.json({ success: true, comments: item.comments });
});

app.delete('/api/contents/:id', (req, res) => {
    const id = Number(req.params.id);
    let contents = getContents();
    contents = contents.filter(c => c.id !== id);
    saveContents(contents);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif: http://localhost:${PORT}`);
});
