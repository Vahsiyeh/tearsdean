const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Uploads klasörü yoksa otomatik oluşturalım
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Geçici Veritabanı (Başlangıç videosuyla)
let videos = [
    {
        id: "1",
        title: "Gardaşımla İlk Video! 😎🔥",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        uploader: "Kral_Gardaş",
        likes: 12,
        views: 142
    }
];

// Multer Ayarları (Video Dosyası Yüklemek İçin)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API Endpoints

// 1. Tüm videoları getir
app.get('/api/videos', (req, res) => {
    res.json(videos);
});

// 2. Yeni video yükle
app.post('/api/videos/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Lütfen bir video dosyası seç la!' });
    }

    const newVideo = {
        id: String(videos.length + 1),
        title: req.body.title || 'İsimsiz Video',
        videoUrl: `/uploads/${req.file.filename}`,
        uploader: req.body.uploader || 'Anonim Gardaş',
        likes: 0,
        views: 0
    };

    videos.push(newVideo);
    res.status(201).json({ message: 'Video başarıyla yüklendi gardaş!', video: newVideo });
});

// 3. Beğeni ekle
app.post('/api/videos/:id/like', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        video.likes += 1;
        return res.json({ likes: video.likes });
    }
    res.status(404).json({ error: 'Video bulunamadı!' });
});

app.listen(PORT, () => {
    console.log(`🔥 Sunucu fişek gibi çalışıyor: http://localhost:${PORT}`);
});