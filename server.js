const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
const messagesFile = path.join(__dirname, 'messages.json');

function getContents() {
    if (!fs.existsSync(dbFile)) return [];
    try { return JSON.parse(fs.readFileSync(dbFile, 'utf8')); } catch { return []; }
}
function saveContents(contents) {
    fs.writeFileSync(dbFile, JSON.stringify(contents, null, 2), 'utf8');
}

function getUsers() {
    if (!fs.existsSync(usersFile)) return {};
    try { return JSON.parse(fs.readFileSync(usersFile, 'utf8')); } catch { return {}; }
}
function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

function getMessages() {
    if (!fs.existsSync(messagesFile)) return [];
    try { return JSON.parse(fs.readFileSync(messagesFile, 'utf8')); } catch { return []; }
}
function saveMessages(msgs) {
    fs.writeFileSync(messagesFile, JSON.stringify(msgs, null, 2), 'utf8');
}

app.get('/api/contents', (req, res) => {
    res.json(getContents());
});

app.get('/api/users', (req, res) => {
    res.json(getUsers());
});

app.post('/api/sync-user', (req, res) => {
    const { email, name, handle, avatarUrl, bgColor } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    let users = getUsers();
    if (!users[email]) {
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
            followersCount: 15
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
        fileUrl: req.file ? `/uploads/${req.file.filename}` : (req.body.fileUrl || ''),
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

app.delete('/api/contents/:id', (req, res) => {
    const id = Number(req.params.id);
    const requesterEmail = req.query.email || req.body.email;
    let contents = getContents();
    
    const item = contents.find(c => c.id === id);
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (requesterEmail === 'ugakegqreoqte@gmail.com' || item.authorEmail === requesterEmail) {
        contents = contents.filter(c => c.id !== id);
        saveContents(contents);
        return res.json({ success: true });
    } else {
        return res.status(403).json({ error: 'Unauthorized' });
    }
});

app.post('/api/contents/:id/like', (req, res) => {
    const id = Number(req.params.id);
    const { email } = req.body;
    let contents = getContents();
    const item = contents.find(c => c.id === id);
    if (!item) return res.status(404).json({ error: 'Not found' });

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
    if (!item) return res.status(404).json({ error: 'Not found' });

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
    if (!item || !item.pollOptions) return res.status(404).json({ error: 'Not found' });

    if (!item.votedUsers) item.votedUsers = [];
    if (item.votedUsers.includes(email)) {
        return res.json({ success: false, error: 'Already voted' });
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
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (!item.comments) item.comments = [];
    const newComment = {
        id: Date.now(),
        text, authorName, authorHandle, authorAvatar, authorBg, authorEmail, time: Date.now()
    };
    item.comments.push(newComment);
    saveContents(contents);
    res.json({ success: true, comments: item.comments });
});

app.delete('/api/contents/:id/comment/:commentId', (req, res) => {
    const contentId = Number(req.params.id);
    const commentId = Number(req.params.commentId);
    let contents = getContents();
    const item = contents.find(c => c.id === contentId);
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (item.comments) {
        item.comments = item.comments.filter(c => c.id !== commentId);
        saveContents(contents);
    }
    res.json({ success: true, comments: item.comments });
});

io.on('connection', (socket) => {
    socket.on('join_room', (room) => {
        socket.join(room);
    });

    socket.on('send_message', (data) => {
        let messages = getMessages();
        const newMsg = { id: Date.now(), ...data, time: Date.now() };
        messages.push(newMsg);
        saveMessages(messages);
        io.to(data.room).emit('receive_message', newMsg);
    });
});

app.get('/api/messages/:room', (req, res) => {
    const room = req.params.room;
    const messages = getMessages();
    const roomMsgs = messages.filter(m => m.room === room);
    res.json(roomMsgs);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
