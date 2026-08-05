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
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });
const dbFile = path.join(__dirname, 'contents.json');
const usersFile = path.join(__dirname, 'users.json');

function getContents() {
    if (!fs.existsSync(dbFile)) return [];
    try { return JSON.parse(fs.readFileSync(dbFile, 'utf8')); } catch { return []; }
}
function saveContents(contents) {
    fs.writeFileSync(dbFile, JSON.stringify(contents, null, 2));
}

function getUsers() {
    if (!fs.existsSync(usersFile)) return {};
    try { return JSON.parse(fs.readFileSync(usersFile, 'utf8')); } catch { return {}; }
}
function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.get('/api/contents', (req, res) => {
    res.json(getContents());
});

// Kullanıcı Senkronizasyonu (Mail tabanlı cihaz bağımsız)
app.post('/api/sync-user', (req, res) => {
    const { email, name, handle, avatarUrl, bgColor } = req.body;
    if (!email) return res.status(400).json({ error: 'Email gerekli' });

    let users = getUsers();
    if (!users[email]) {
        // Eğer özel mailinse veya ilk kez açılıyorsa
        let finalHandle = handle || email.split('@')[0];
        let finalName = name || 'User';
        if (email === 'ugakegqreoqte@gmail.com') {
            finalName = 'FreezyOfficial0';
            finalHandle = 'freezyofficial0';
        }
        users[email] = {
            email,
            name: finalName,
            handle: finalHandle,
            avatarUrl: avatarUrl || '',
            bgColor: bgColor || '#a855f7',
            subscribersCount: 15 // Otomatik 10 üstü (tik için)
        };
        saveUsers(users);
    }
    res.json({ success: true, user: users[email] });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    const newContent = {
        id: Date.now(),
        title: req.body.title || 'Untitled',
        description: req.body.description || '',
        type: req.body.type || 'video',
        fileUrl: req.file ? `/uploads/${req.file.filename}` : '',
        thumbnailUrl: req.body.thumbnailUrl || (req.file ? `/uploads/${req.file.filename}` : ''),
        duration: req.body.duration || '0:00',
        pollOptions: req.body.pollOptions ? JSON.parse(req.body.pollOptions) : null,
        pollVotes: req.body.pollOptions ? [0, 0, 0, 0] : null,
        votedUsers: [],
        authorName: req.body.authorName || 'User',
        authorHandle: req.body.authorHandle || 'user',
        authorAvatar: req.body.authorAvatar || '',
        authorBg: req.body.authorBg || '#a855f7',
        authorEmail: req.body.authorEmail || '',
        views: 1,
        viewedUsers: [req.body.authorEmail || 'guest'],
        likes: 0,
        likedUsers: [],
        repostedUsers: [],
        comments: []
    };

    const contents = getContents();
    contents.push(newContent);
    saveContents(contents);
    res.json({ success: true, content: newContent });
});

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

app.post('/api/contents/:id/repost', (req, res) => {
    const id = Number(req.params.id);
    const { email, handle } = req.body;
    let contents = getContents();
    const item = contents.find(c => c.id === id);
    if (!item) return res.status(404).json({ error: 'Bulunamadı' });

    if (!item.repostedUsers) item.repostedUsers = [];
    const index = item.repostedUsers.indexOf(handle);
    let reposted = false;

    if (index > -1) {
        item.repostedUsers.splice(index, 1);
    } else {
        item.repostedUsers.push(handle);
        reposted = true;
    }

    saveContents(contents);
    res.json({ success: true, reposted, repostCount: item.repostedUsers.length });
});

app.post('/api/contents/:id/vote', (req, res) => {
    const id = Number(req.params.id);
    const { optionIndex, email } = req.body;
    let contents = getContents();
    const item = contents.find(c => c.id === id);
    if (!item || !item.pollOptions) return res.status(404).json({ error: 'Bulunamadı' });

    if (!item.votedUsers) item.votedUsers = [];
    if (item.votedUsers.includes(email)) {
        return res.json({ success: false, error: 'Zaten oy verdiniz' });
    }

    item.votedUsers.push(email);
    if (!item.pollVotes) item.pollVotes = [0,0,0,0];
    item.pollVotes[optionIndex] = (item.pollVotes[optionIndex] || 0) + 1;

    saveContents(contents);
    res.json({ success: true, pollVotes: item.pollVotes });
});

app.post('/api/contents/:id/comment', (req, res) => {
    const id = Number(req.params.id);
    const { text, authorName, authorHandle, authorAvatar, authorBg, authorEmail } = req.body;
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
        authorEmail,
        time: Date.now()
    };
    item.comments.push(newComment);
    saveContents(contents);
    res.json({ success: true, comments: item.comments });
});

app.listen(PORT, () => console.log(`Sunucu aktif: http://localhost:${PORT}`));
