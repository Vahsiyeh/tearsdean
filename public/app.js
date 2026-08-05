document.addEventListener('DOMContentLoaded', () => {
    const GOOGLE_CLIENT_ID = "736819800954-ufc0h3143np8u87ji87ctidcrq8pk0kc.apps.googleusercontent.com";
    const takenHandles = ['tearsdean', 'youtube', 'admin', 'roblox', 'developer', 'garda'];

    const createBtn = document.getElementById('createBtn');
    const createModal = document.getElementById('createModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const stepItems = document.querySelectorAll('.step-item');
    const wizardPages = document.querySelectorAll('.wizard-page');
    
    const typeCards = document.querySelectorAll('.type-card');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const fileNameDisplay = document.getElementById('fileName');
    const fileInfoBox = document.getElementById('fileInfo');
    const dropzone = document.getElementById('dropzone');
    const uploadText = document.getElementById('uploadText');
    const contentTitleInput = document.getElementById('contentTitle');
    const contentDescInput = document.getElementById('contentDesc');

    const homeView = document.getElementById('homeView');
    const channelView = document.getElementById('channelView');
    const watchView = document.getElementById('watchView');
    const feedGrid = document.getElementById('feedGrid');
    const channelGrid = document.getElementById('channelGrid');
    const emptyFeed = document.getElementById('emptyFeed');
    const emptyChannelFeed = document.getElementById('emptyChannelFeed');
    const homeLogoBtn = document.getElementById('homeLogoBtn');

    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const topLoadingBar = document.getElementById('topLoadingBar');
    const toastNotification = document.getElementById('toastNotification');

    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const videoContainer = document.getElementById('videoContainer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const muteBtn = document.getElementById('muteBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const muteIcon = document.getElementById('muteIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const timeDisplay = document.getElementById('timeDisplay');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBarPlayed = document.getElementById('progressBarPlayed');
    const progressBarHandle = document.getElementById('progressBarHandle');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    const likeBtn = document.getElementById('likeBtn');
    const likeCountSpan = document.getElementById('likeCount');
    const repostBtn = document.getElementById('repostBtn');

    const watchTitle = document.getElementById('watchTitle');
    const watchAvatar = document.getElementById('watchAvatar');
    const watchChannelName = document.getElementById('watchChannelName');
    const watchHandle = document.getElementById('watchHandle');
    const watchViewsDate = document.getElementById('watchViewsDate');
    const watchDesc = document.getElementById('watchDesc');
    const watchSubscribeBtn = document.getElementById('watchSubscribeBtn');
    const watchChannelRowClick = document.getElementById('watchChannelRowClick');

    const channelBigAvatar = document.getElementById('channelBigAvatar');
    const channelProfileName = document.getElementById('channelProfileName');
    const channelProfileHandle = document.getElementById('channelProfileHandle');
    const subscribeMainBtn = document.getElementById('subscribeMainBtn');

    const commentInput = document.getElementById('commentInput');
    const commentSubmitBtn = document.getElementById('commentSubmitBtn');
    const commentsList = document.getElementById('commentsList');
    const commentUserAvatar = document.getElementById('commentUserAvatar');

    const openAuthBtn = document.getElementById('openAuthBtn');
    const authModal = document.getElementById('authModal');
    const authStepLogin = document.getElementById('authStepLogin');
    const authStepProfile = document.getElementById('authStepProfile');
    const googleAuthBtn = document.getElementById('googleAuthBtn');
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');

    const avatarPreview = document.getElementById('avatarPreview');
    const customAvatarInput = document.getElementById('customAvatarInput');
    const selectPictureBtn = document.getElementById('selectPictureBtn');
    const profileNameInput = document.getElementById('profileNameInput');
    const profileHandleInput = document.getElementById('profileHandleInput');
    const confirmProfileBtn = document.getElementById('confirmProfileBtn');

    const userProfile = document.getElementById('userProfile');
    const userAvatarBtn = document.getElementById('userAvatarBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdownAvatar = document.getElementById('dropdownAvatar');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownHandle = document.getElementById('dropdownHandle');
    const menuYourChannel = document.getElementById('menuYourChannel');
    const logoutBtn = document.getElementById('logoutBtn');
    const navItems = document.querySelectorAll('.sidebar .nav-item');

    let currentStep = 1;
    let selectedType = 'video';
    let selectedFile = null;
    let customAvatarUrl = null;
    let googleDefaultAvatar = null;
    let isLoggedIn = false;
    let tokenClient = null;
    let currentEmail = null;
    let currentUserData = null;
    let activeCurrentVideoItem = null;

    const googleAvatarColors = ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047', '#fb8c00', '#f4511e'];

    function getRandomColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
        return googleAvatarColors[Math.abs(hash) % googleAvatarColors.length];
    }

    function showToast(msg) {
        toastNotification.textContent = msg;
        toastNotification.classList.add('active');
        setTimeout(() => toastNotification.classList.remove('active'), 2500);
    }

    function triggerLoadingBar() {
        if (!topLoadingBar) return;
        topLoadingBar.style.width = '0%';
        topLoadingBar.style.opacity = '1';
        setTimeout(() => topLoadingBar.style.width = '70%', 50);
        setTimeout(() => {
            topLoadingBar.style.width = '100%';
            setTimeout(() => topLoadingBar.style.opacity = '0', 200);
        }, 300);
    }

    function timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} days ago`;
        return `${Math.floor(days / 30)} months ago`;
    }

    function formatDuration(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function checkSavedSession() {
        const activeEmail = localStorage.getItem('yt_active_email');
        const allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
        if (activeEmail && allChannels[activeEmail]) {
            currentEmail = activeEmail;
            currentUserData = allChannels[activeEmail];
            isLoggedIn = true;
            applyUserSession(currentUserData);
        } else {
            isLoggedIn = false;
            currentUserData = null;
        }
        loadFeed('all');
    }

    function applyUserSession(user) {
        isLoggedIn = true;
        currentUserData = user;
        openAuthBtn.style.display = 'none';

        if (user.avatarUrl) {
            userAvatarBtn.innerHTML = `<img src="${user.avatarUrl}">`;
            dropdownAvatar.innerHTML = `<img src="${user.avatarUrl}">`;
            commentUserAvatar.innerHTML = `<img src="${user.avatarUrl}">`;
        } else {
            const bg = user.bgColor || getRandomColor(user.name);
            userAvatarBtn.style.backgroundColor = bg;
            userAvatarBtn.textContent = user.name.charAt(0).toUpperCase();
            dropdownAvatar.style.backgroundColor = bg;
            dropdownAvatar.textContent = user.name.charAt(0).toUpperCase();
            commentUserAvatar.style.backgroundColor = bg;
            commentUserAvatar.textContent = user.name.charAt(0).toUpperCase();
        }

        dropdownName.textContent = user.name;
        dropdownHandle.textContent = `@${user.handle}`;
        userProfile.style.display = 'block';
    }

    checkSavedSession();

    // PLAYER KONTROLLERİ
    function togglePlayPause() {
        if (mainVideoPlayer.paused) {
            mainVideoPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            mainVideoPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    mainVideoPlayer.addEventListener('click', togglePlayPause);

    mainVideoPlayer.addEventListener('timeupdate', () => {
        if (!mainVideoPlayer.duration) return;
        const current = mainVideoPlayer.currentTime;
        const duration = mainVideoPlayer.duration;
        const percent = (current / duration) * 100;
        progressBarPlayed.style.width = `${percent}%`;
        progressBarHandle.style.left = `${percent}%`;
        timeDisplay.textContent = `${formatDuration(current)} / ${formatDuration(duration)}`;
    });

    progressBarContainer.addEventListener('click', (e) => {
        const rect = progressBarContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        mainVideoPlayer.currentTime = pos * mainVideoPlayer.duration;
    });

    muteBtn.addEventListener('click', () => {
        mainVideoPlayer.muted = !mainVideoPlayer.muted;
        volumeIcon.style.display = mainVideoPlayer.muted ? 'none' : 'block';
        muteIcon.style.display = mainVideoPlayer.muted ? 'block' : 'none';
    });

    volumeSlider.addEventListener('input', (e) => {
        mainVideoPlayer.volume = e.target.value;
        mainVideoPlayer.muted = e.target.value == 0;
        volumeIcon.style.display = mainVideoPlayer.muted ? 'none' : 'block';
        muteIcon.style.display = mainVideoPlayer.muted ? 'block' : 'none';
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen().catch(err => alert(err.message));
        } else {
            document.exitFullscreen();
        }
    });

    // FEED & GÖSTERİM
    async function loadFeed(filterType = 'all', searchQuery = '') {
        triggerLoadingBar();
        homeView.style.display = 'block';
        channelView.style.display = 'none';
        watchView.style.display = 'none';
        if (mainVideoPlayer) mainVideoPlayer.pause();

        try {
            const res = await fetch('/api/contents');
            const allContents = await res.json();
            feedGrid.innerHTML = '';

            let filtered = allContents;
            if (filterType === 'posts') filtered = allContents.filter(c => c.type === 'post');
            else if (filterType === 'videos') filtered = allContents.filter(c => c.type === 'video');

            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase().trim();
                filtered = filtered.filter(item => 
                    (item.title && item.title.toLowerCase().includes(q)) || 
                    (item.authorName && item.authorName.toLowerCase().includes(q))
                );
            }

            if (filtered.length === 0) {
                emptyFeed.style.display = 'block';
                return;
            }
            emptyFeed.style.display = 'none';

            filtered.reverse().forEach(item => {
                const card = document.createElement('div');
                card.className = 'yt-video-card';
                const coverImage = item.thumbnailUrl || item.fileUrl;
                
                card.innerHTML = `
                    <div class="yt-thumbnail-wrapper">
                        <img src="${coverImage}" alt="Thumbnail" class="yt-thumbnail-img">
                        ${item.type === 'video' ? `<span class="video-duration-badge">${item.duration || '0:00'}</span>` : ''}
                    </div>
                    <div class="yt-video-details">
                        <div class="yt-channel-avatar" style="background-color: ${item.authorBg || '#a855f7'};">
                            ${item.authorAvatar ? `<img src="${item.authorAvatar}">` : item.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div class="yt-meta-info">
                            <h4>${escapeHtml(item.title)}</h4>
                            <span class="yt-channel-name" data-handle="${item.authorHandle}">${escapeHtml(item.authorName)}</span>
                            <span class="yt-video-stats">${item.viewedUsers ? item.viewedUsers.length : 1} views • ${timeAgo(item.id)}</span>
                        </div>
                    </div>
                `;

                card.querySelector('.yt-channel-name').addEventListener('click', (e) => {
                    e.stopPropagation();
                    openChannelPageByHandle(item.authorHandle);
                });

                card.addEventListener('click', () => {
                    if (item.type === 'video') openWatchPage(item);
                });

                feedGrid.appendChild(card);
            });
        } catch (err) {
            console.error(err);
        }
    }

    // KANAL SAYFASI AÇMA
    async function openChannelPageByHandle(handle) {
        triggerLoadingBar();
        homeView.style.display = 'none';
        watchView.style.display = 'none';
        channelView.style.display = 'block';
        if (mainVideoPlayer) mainVideoPlayer.pause();

        const res = await fetch('/api/contents');
        const allContents = await res.json();
        const channelContents = allContents.filter(c => c.authorHandle === handle);

        if (channelContents.length > 0) {
            const ch = channelContents[0];
            channelProfileName.textContent = ch.authorName;
            channelProfileHandle.textContent = `@${ch.authorHandle}`;
            if (ch.authorAvatar) {
                channelBigAvatar.innerHTML = `<img src="${ch.authorAvatar}">`;
            } else {
                channelBigAvatar.style.backgroundColor = ch.authorBg || '#a855f7';
                channelBigAvatar.textContent = ch.authorName.charAt(0).toUpperCase();
            }
        }

        channelGrid.innerHTML = '';
        if (channelContents.length === 0) {
            emptyChannelFeed.style.display = 'block';
            return;
        }
        emptyChannelFeed.style.display = 'none';

        channelContents.reverse().forEach(item => {
            const card = document.createElement('div');
            card.className = 'yt-video-card';
            card.innerHTML = `
                <div class="yt-thumbnail-wrapper">
                    <img src="${item.thumbnailUrl || item.fileUrl}" class="yt-thumbnail-img">
                    <span class="video-duration-badge">${item.duration || '0:00'}</span>
                </div>
                <div class="yt-video-details">
                    <div class="yt-meta-info">
                        <h4>${escapeHtml(item.title)}</h4>
                        <span class="yt-video-stats">${item.viewedUsers ? item.viewedUsers.length : 1} views • ${timeAgo(item.id)}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openWatchPage(item));
            channelGrid.appendChild(card);
        });
    }

    async function openWatchPage(item) {
        triggerLoadingBar();
        homeView.style.display = 'none';
        channelView.style.display = 'none';
        watchView.style.display = 'flex';
        activeCurrentVideoItem = item;

        mainVideoPlayer.src = item.fileUrl;
        mainVideoPlayer.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';

        watchTitle.textContent = item.title;
        watchChannelName.textContent = item.authorName;
        watchHandle.textContent = `@${item.authorHandle}`;
        watchViewsDate.textContent = `${item.viewedUsers ? item.viewedUsers.length : 1} views • Uploaded ${timeAgo(item.id)}`;
        watchDesc.textContent = item.description || 'No description provided.';
        likeCountSpan.textContent = item.likes || 0;

        if (item.likedUsers && item.likedUsers.includes(currentEmail)) {
            likeBtn.classList.add('active');
        } else {
            likeBtn.classList.remove('active');
        }

        if (item.authorAvatar) {
            watchAvatar.innerHTML = `<img src="${item.authorAvatar}">`;
        } else {
            watchAvatar.style.backgroundColor = item.authorBg || '#a855f7';
            watchAvatar.textContent = item.authorName.charAt(0).toUpperCase();
        }

        renderComments(item.comments || []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // LİKE İŞLEMİ
    likeBtn.addEventListener('click', async () => {
        if (!isLoggedIn) {
            authModal.classList.add('active');
            return;
        }
        if (!activeCurrentVideoItem) return;

        const res = await fetch(`/api/contents/${activeCurrentVideoItem.id}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentEmail })
        });
        const data = await res.json();
        if (data.success) {
            activeCurrentVideoItem.likes = data.likes;
            likeCountSpan.textContent = data.likes;
            if (data.liked) likeBtn.classList.add('active');
            else likeBtn.classList.remove('active');
        }
    });

    repostBtn.addEventListener('click', () => {
        repostBtn.classList.toggle('active');
        showToast(repostBtn.classList.contains('active') ? "Reposted to your profile!" : "Repost removed.");
    });

    // YORUM EKLEME
    commentSubmitBtn.addEventListener('click', async () => {
        if (!isLoggedIn) {
            authModal.classList.add('active');
            return;
        }
        const text = commentInput.value.trim();
        if (!text || !activeCurrentVideoItem) return;

        const res = await fetch(`/api/contents/${activeCurrentVideoItem.id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text,
                authorName: currentUserData.name,
                authorHandle: currentUserData.handle,
                authorAvatar: currentUserData.avatarUrl || '',
                authorBg: currentUserData.bgColor
            })
        });
        const data = await res.json();
        if (data.success) {
            activeCurrentVideoItem.comments = data.comments;
            renderComments(data.comments);
            commentInput.value = '';
        }
    });

    function renderComments(comments) {
        commentsList.innerHTML = '';
        comments.reverse().forEach(c => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            const avHTML = c.authorAvatar ? `<img src="${c.authorAvatar}">` : c.authorName.charAt(0).toUpperCase();
            div.innerHTML = `
                <div class="yt-channel-avatar" style="background-color: ${c.authorBg || '#a855f7'};">${avHTML}</div>
                <div class="comment-content">
                    <h5>@${c.authorHandle} • <span>${timeAgo(c.id)}</span></h5>
                    <p>${escapeHtml(c.text)}</p>
                </div>
            `;
            commentsList.appendChild(div);
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    watchChannelRowClick.addEventListener('click', () => {
        if (activeCurrentVideoItem) openChannelPageByHandle(activeCurrentVideoItem.authorHandle);
    });

    homeLogoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = '';
        navItems.forEach(n => n.classList.remove('active'));
        document.querySelector('.nav-item[data-nav="home"]').classList.add('active');
        loadFeed('all');
    });

    // GOOGLE AUTH
    function initGoogleAuth() {
        if (typeof google !== 'undefined' && google.accounts) {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: 'profile email',
                callback: (resp) => {
                    if (resp.access_token) {
                        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: { Authorization: `Bearer ${resp.access_token}` }
                        })
                        .then(res => res.json())
                        .then(data => {
                            processGoogleLoginFlow(data.email || "user@gmail.com", data.name || 'User', data.picture);
                        });
                    }
                }
            });
        }
    }
    setTimeout(initGoogleAuth, 600);

    googleAuthBtn.addEventListener('click', () => {
        if (tokenClient) tokenClient.requestAccessToken({ prompt: 'select_account' });
        else processGoogleLoginFlow("user@gmail.com", "Google User", null);
    });

    function processGoogleLoginFlow(email, defaultName, defaultAvatar) {
        currentEmail = email;
        const allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
        if (allChannels[email]) {
            localStorage.setItem('yt_active_email', email);
            authModal.classList.remove('active');
            applyUserSession(allChannels[email]);
            return;
        }
        authStepLogin.style.display = 'none';
        authStepProfile.style.display = 'block';
        profileNameInput.value = defaultName;
        profileHandleInput.value = defaultName.toLowerCase().replace(/[^a-z0-9]/g, '');
        googleDefaultAvatar = defaultAvatar;
    }

    confirmProfileBtn.addEventListener('click', () => {
        const name = profileNameInput.value.trim() || 'User';
        const handle = profileHandleInput.value.trim().toLowerCase();
        const avatarUrl = customAvatarUrl || googleDefaultAvatar || null;
        const bgColor = getRandomColor(name);
        const userData = { name, handle, avatarUrl, bgColor, email: currentEmail };

        let allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
        allChannels[currentEmail] = userData;
        localStorage.setItem('yt_all_channels', JSON.stringify(allChannels));
        localStorage.setItem('yt_active_email', currentEmail);

        applyUserSession(userData);
        authModal.classList.remove('active');
    });

    userAvatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });
    document.addEventListener('click', () => profileDropdown.classList.remove('active'));

    menuYourChannel.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        if (currentUserData) openChannelPageByHandle(currentUserData.handle);
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('yt_active_email');
        isLoggedIn = false;
        currentUserData = null;
        userProfile.style.display = 'none';
        openAuthBtn.style.display = 'flex';
        loadFeed('all');
    });

    openAuthBtn.addEventListener('click', () => {
        authStepLogin.style.display = 'block';
        authStepProfile.style.display = 'none';
        authModal.classList.add('active');
    });
    closeAuthModalBtn.addEventListener('click', () => authModal.classList.remove('active'));

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageTarget = item.dataset.nav;
            if (pageTarget === 'upload') {
                if (!isLoggedIn) {
                    authModal.classList.add('active');
                    return;
                }
                resetWizard();
                createModal.classList.add('active');
                return;
            }
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            if (pageTarget === 'home') loadFeed('all');
            if (pageTarget === 'posts') loadFeed('posts');
        });
    });

    createBtn.addEventListener('click', () => {
        if (!isLoggedIn) {
            authModal.classList.add('active');
            return;
        }
        resetWizard();
        createModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => createModal.classList.remove('active'));

    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.dataset.type;
            fileInput.accept = selectedType === 'video' ? 'video/*' : 'image/*';
            selectedFile = null;
            fileInfoBox.style.display = 'none';
        });
    });

    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = selectedFile.name;
            fileInfoBox.style.display = 'block';
        }
    });

    nextStepBtn.addEventListener('click', async () => {
        if (currentStep < 4) {
            currentStep++;
            updateWizardState();
        } else {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', contentTitleInput.value.trim() || 'Untitled');
            formData.append('description', contentDescInput.value.trim());
            formData.append('type', selectedType);
            formData.append('authorName', currentUserData.name);
            formData.append('authorHandle', currentUserData.handle);
            formData.append('authorAvatar', currentUserData.avatarUrl || '');
            formData.append('authorBg', currentUserData.bgColor);
            formData.append('authorEmail', currentEmail);

            nextStepBtn.textContent = 'Publishing...';
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            if (res.ok) {
                createModal.classList.remove('active');
                loadFeed('all');
                showToast("Content published globally!");
            }
            nextStepBtn.textContent = 'Publish';
        }
    });

    prevStepBtn.addEventListener('click', () => {
        if (currentStep > 1) { currentStep--; updateWizardState(); }
    });

    function updateWizardState() {
        wizardPages.forEach((p, idx) => p.classList.toggle('active', idx + 1 === currentStep));
        stepItems.forEach((s, idx) => s.classList.toggle('active', idx + 1 === currentStep));
        prevStepBtn.style.display = currentStep === 1 ? 'none' : 'block';
        nextStepBtn.textContent = currentStep === 4 ? 'Publish' : 'Next';
        if (currentStep === 4) {
            document.getElementById('sumType').textContent = selectedType.toUpperCase();
            document.getElementById('sumTitle').textContent = contentTitleInput.value || 'Untitled';
        }
    }

    function resetWizard() {
        currentStep = 1;
        selectedFile = null;
        fileInput.value = '';
        fileInfoBox.style.display = 'none';
        contentTitleInput.value = '';
        contentDescInput.value = '';
        updateWizardState();
    }
});
