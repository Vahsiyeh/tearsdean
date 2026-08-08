document.addEventListener('DOMContentLoaded', () => {
    const GOOGLE_CLIENT_ID = "736819800954-ufc0h3143np8u87ji87ctidcrq8pk0kc.apps.googleusercontent.com";
    const socket = io();

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

    const postImageInput = document.getElementById('postImageInput');
    const selectPostFileBtn = document.getElementById('selectPostFileBtn');
    const postFileName = document.getElementById('postFileName');
    const postFileInfo = document.getElementById('postFileInfo');

    const contentTitleInput = document.getElementById('contentTitle');
    const contentDescInput = document.getElementById('contentDesc');
    const autoThumbGrid = document.getElementById('autoThumbGrid');

    const videoUploadSection = document.getElementById('videoUploadSection');
    const postCreationSection = document.getElementById('postCreationSection');
    const tabTextPost = document.getElementById('tabTextPost');
    const tabPollPost = document.getElementById('tabPollPost');
    const pollInputsContainer = document.getElementById('pollInputsContainer');
    const imagePostInputsContainer = document.getElementById('imagePostInputsContainer');
    const pollQuestionInput = document.getElementById('pollQuestionInput');
    const pollOpt1 = document.getElementById('pollOpt1');
    const pollOpt2 = document.getElementById('pollOpt2');
    const pollOpt3 = document.getElementById('pollOpt3');
    const pollOpt4 = document.getElementById('pollOpt4');

    const homeView = document.getElementById('homeView');
    const postsView = document.getElementById('postsView');
    const channelView = document.getElementById('channelView');
    const studioView = document.getElementById('studioView');
    const watchView = document.getElementById('watchView');
    const creatorsView = document.getElementById('creatorsView');
    const messagesView = document.getElementById('messagesView');

    const feedGrid = document.getElementById('feedGrid');
    const postsFeedGrid = document.getElementById('postsFeedGrid');
    const channelGrid = document.getElementById('channelGrid');
    const creatorsGrid = document.getElementById('creatorsGrid');
    const creatorSearchInput = document.getElementById('creatorSearchInput');
    
    const igDmChatsList = document.getElementById('igDmChatsList');
    const igDmChatArea = document.getElementById('igDmChatArea');
    const igUserSearchInput = document.getElementById('igUserSearchInput');
    const igNewChatBtn = document.getElementById('igNewChatBtn');

    const emptyFeed = document.getElementById('emptyFeed');
    const emptyPostsFeed = document.getElementById('emptyPostsFeed');
    const emptyChannelFeed = document.getElementById('emptyChannelFeed');
    const homeLogoBtn = document.getElementById('homeLogoBtn');

    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const topLoadingBar = document.getElementById('topLoadingBar');

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
    const adminDeleteWatchBtn = document.getElementById('adminDeleteWatchBtn');

    const watchTitle = document.getElementById('watchTitle');
    const watchAvatar = document.getElementById('watchAvatar');
    const watchChannelName = document.getElementById('watchChannelName');
    const watchHandle = document.getElementById('watchHandle');
    const watchViewsDate = document.getElementById('watchViewsDate');
    const watchDesc = document.getElementById('watchDesc');
    const watchSubscribeBtn = document.getElementById('watchSubscribeBtn');
    const watchMessageBtn = document.getElementById('watchMessageBtn');
    const watchChannelRowClick = document.getElementById('watchChannelRowClick');
    const verifiedBadgeWatch = document.getElementById('verifiedBadgeWatch');
    const suggestedVideosList = document.getElementById('suggestedVideosList');

    const channelBigAvatar = document.getElementById('channelBigAvatar');
    const channelProfileName = document.getElementById('channelProfileName');
    const channelProfileHandle = document.getElementById('channelProfileHandle');
    const subscribeMainBtn = document.getElementById('subscribeMainBtn');
    const messageChannelBtn = document.getElementById('messageChannelBtn');
    const channelStudioBtn = document.getElementById('channelStudioBtn');
    const verifiedBadgeChannel = document.getElementById('verifiedBadgeChannel');
    const studioUploadNewBtn = document.getElementById('studioUploadNewBtn');

    const commentInput = document.getElementById('commentInput');
    const commentSubmitBtn = document.getElementById('commentSubmitBtn');
    const commentsList = document.getElementById('commentsList');
    const commentUserAvatar = document.getElementById('commentUserAvatar');

    const openAuthBtn = document.getElementById('openAuthBtn');
    const authModal = document.getElementById('authModal');
    const googleAuthBtn = document.getElementById('googleAuthBtn');
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');

    const userProfile = document.getElementById('userProfile');
    const userAvatarBtn = document.getElementById('userAvatarBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdownAvatar = document.getElementById('dropdownAvatar');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownHandle = document.getElementById('dropdownHandle');
    const menuYourChannel = document.getElementById('menuYourChannel');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const navItems = document.querySelectorAll('.sidebar .nav-item, .mobile-bottom-nav .mobile-nav-item');

    const postModalOverlay = document.getElementById('postModalOverlay');
    const closePostModalBtn = document.getElementById('closePostModalBtn');
    const postModalBody = document.getElementById('postModalBody');

    let currentStep = 1;
    let selectedType = 'video';
    let postSubMode = 'text';
    let selectedFile = null;
    let selectedPostImageFile = null;
    let chosenThumbnailUrl = null;
    let videoDurationSeconds = 0;
    let isLoggedIn = false;
    let tokenClient = null;
    let currentEmail = null;
    let currentUserData = null;
    let activeCurrentVideoItem = null;
    let currentViewingChannelHandle = null;
    let activeChatRoom = null;
    let activeTargetUser = null;

    const googleAvatarColors = ['#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#3949ab', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#43a047', '#fb8c00', '#f4511e'];

    function getRandomColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
        return googleAvatarColors[Math.abs(hash) % googleAvatarColors.length];
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
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;
        return `${Math.floor(days / 30)}mo ago`;
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
        loadFeed('home');
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

    function isFollowing(handle) {
        if (!currentUserData) return false;
        const subs = JSON.parse(localStorage.getItem('yt_subs_' + currentUserData.handle) || '[]');
        return subs.includes(handle);
    }

    function checkMutualFollow(handleA, handleB) {
        const subsA = JSON.parse(localStorage.getItem('yt_subs_' + handleA) || '[]');
        const subsB = JSON.parse(localStorage.getItem('yt_subs_' + handleB) || '[]');
        const aFollowsB = subsA.includes(handleB);
        const bFollowsA = subsB.includes(handleA);
        return { aFollowsB, bFollowsA, mutual: aFollowsB && bFollowsA };
    }

    function toggleFollow(handle) {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        if (currentUserData && currentUserData.handle === handle) return;

        const key = 'yt_subs_' + currentUserData.handle;
        let subs = JSON.parse(localStorage.getItem(key) || '[]');
        const idx = subs.indexOf(handle);
        if (idx > -1) subs.splice(idx, 1);
        else subs.push(handle);
        localStorage.setItem(key, JSON.stringify(subs));
        updateFollowButtons(handle);
    }

    function updateFollowButtons(handle) {
        const isSelf = currentUserData && currentUserData.handle === handle;
        [watchSubscribeBtn, subscribeMainBtn].forEach(btn => {
            if (!btn) return;
            if (isSelf) { btn.style.display = 'none'; return; }
            btn.style.display = 'block';
            const following = isFollowing(handle);
            if (following) { btn.textContent = 'Following'; btn.classList.add('subscribed'); }
            else { btn.textContent = 'Follow'; btn.classList.remove('subscribed'); }
        });
    }

    watchSubscribeBtn.addEventListener('click', () => {
        if (activeCurrentVideoItem) toggleFollow(activeCurrentVideoItem.authorHandle);
    });
    subscribeMainBtn.addEventListener('click', () => {
        if (currentViewingChannelHandle) toggleFollow(currentViewingChannelHandle);
    });

    watchMessageBtn.addEventListener('click', async () => {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        if (activeCurrentVideoItem) {
            const userRes = await fetch('/api/users');
            const users = await userRes.json();
            const target = Object.values(users).find(u => u.handle === activeCurrentVideoItem.authorHandle);
            if (target) openMessagesWithUser(target);
        }
    });

    messageChannelBtn.addEventListener('click', async () => {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        if (currentViewingChannelHandle) {
            const userRes = await fetch('/api/users');
            const users = await userRes.json();
            const target = Object.values(users).find(u => u.handle === currentViewingChannelHandle);
            if (target) openMessagesWithUser(target);
        }
    });

    function openMessagesWithUser(targetUser) {
        navItems.forEach(n => n.classList.remove('active'));
        document.querySelectorAll('[data-nav="messages"]').forEach(el => el.classList.add('active'));
        loadFeed('messages');
        setTimeout(() => {
            openChatWithUser(targetUser);
        }, 150);
    }

    function shouldVerify(email, handle) {
        if (email === 'ugakegqreoqte@gmail.com' || handle === 'freezyofficial0') return true;
        return true;
    }

    const verifiedSVG = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;

    async function loadFeed(viewMode = 'home', searchQuery = '') {
        triggerLoadingBar();
        homeView.style.display = viewMode === 'home' ? 'block' : 'none';
        postsView.style.display = viewMode === 'posts' ? 'block' : 'none';
        channelView.style.display = 'none';
        studioView.style.display = 'none';
        watchView.style.display = 'none';
        creatorsView.style.display = viewMode === 'creators' ? 'block' : 'none';
        messagesView.style.display = viewMode === 'messages' ? 'block' : 'none';
        if (mainVideoPlayer) mainVideoPlayer.pause();

        try {
            const res = await fetch('/api/contents');
            const allContents = await res.json();

            if (viewMode === 'home') {
                feedGrid.innerHTML = '';
                let videos = allContents.filter(c => c.type === 'video');

                if (searchQuery.trim() !== '') {
                    const q = searchQuery.toLowerCase().trim();
                    videos = videos.filter(item => 
                        (item.title && item.title.toLowerCase().includes(q)) || 
                        (item.authorName && item.authorName.toLowerCase().includes(q)) ||
                        (item.authorHandle && item.authorHandle.toLowerCase().includes(q))
                    );
                }

                if (videos.length === 0) { emptyFeed.style.display = 'block'; return; }
                emptyFeed.style.display = 'none';

                videos.reverse().forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'yt-video-card';
                    const coverImage = item.thumbnailUrl || item.fileUrl;
                    const verifiedHTML = shouldVerify(item.authorEmail, item.authorHandle) ? `<span class="verified-badge" title="Verified">${verifiedSVG}</span>` : '';
                    
                    card.innerHTML = `
                        <div class="yt-thumbnail-wrapper">
                            <img src="${coverImage}" alt="Thumbnail" class="yt-thumbnail-img">
                            <span class="video-duration-badge">${item.duration || '0:00'}</span>
                        </div>
                        <div class="yt-video-details">
                            <div class="yt-channel-avatar" style="background-color: ${item.authorBg || '#a855f7'};">
                                ${item.authorAvatar ? `<img src="${item.authorAvatar}">` : item.authorName.charAt(0).toUpperCase()}
                            </div>
                            <div class="yt-meta-info">
                                <h4>${escapeHtml(item.title)}</h4>
                                <div class="name-badge-inline">
                                    <span class="yt-channel-name" data-handle="${item.authorHandle}">${escapeHtml(item.authorName)}</span>
                                    ${verifiedHTML}
                                </div>
                                <span class="yt-video-stats">${item.viewedUsers ? item.viewedUsers.length : 1} views • ${timeAgo(item.id)}</span>
                            </div>
                        </div>
                    `;

                    card.querySelector('.yt-channel-name').addEventListener('click', (e) => {
                        e.stopPropagation();
                        openChannelPageByHandle(item.authorHandle);
                    });
                    card.addEventListener('click', () => openWatchPage(item));
                    feedGrid.appendChild(card);
                });

            } else if (viewMode === 'posts') {
                postsFeedGrid.innerHTML = '';
                let posts = allContents.filter(c => c.type === 'post');
                if (posts.length === 0) { emptyPostsFeed.style.display = 'block'; return; }
                emptyPostsFeed.style.display = 'none';
                posts.reverse().forEach(item => renderPostCard(item, postsFeedGrid));
            } else if (viewMode === 'reposts') {
                postsFeedGrid.innerHTML = '';
                let reposts = allContents.filter(c => c.repostedUsers && c.repostedUsers.length > 0);
                if (reposts.length === 0) { emptyPostsFeed.style.display = 'block'; return; }
                emptyPostsFeed.style.display = 'none';
                reposts.reverse().forEach(item => renderPostCard(item, postsFeedGrid));
            } else if (viewMode === 'following') {
                feedGrid.innerHTML = '';
                if (!isLoggedIn || !currentUserData) {
                    emptyFeed.style.display = 'block';
                    emptyFeed.querySelector('h3').textContent = 'Sign in to see following channels!';
                    return;
                }
                const subs = JSON.parse(localStorage.getItem('yt_subs_' + currentUserData.handle) || '[]');
                let followedContents = allContents.filter(c => subs.includes(c.authorHandle) && c.type === 'video');
                if (followedContents.length === 0) {
                    emptyFeed.style.display = 'block';
                    emptyFeed.querySelector('h3').textContent = 'No videos from followed channels.';
                    return;
                }
                emptyFeed.style.display = 'none';
                followedContents.reverse().forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'yt-video-card';
                    card.innerHTML = `
                        <div class="yt-thumbnail-wrapper"><img src="${item.thumbnailUrl || item.fileUrl}" class="yt-thumbnail-img"><span class="video-duration-badge">${item.duration}</span></div>
                        <div class="yt-video-details">
                            <div class="yt-channel-avatar" style="background-color: ${item.authorBg};">${item.authorAvatar ? `<img src="${item.authorAvatar}">` : item.authorName.charAt(0)}</div>
                            <div class="yt-meta-info"><h4>${escapeHtml(item.title)}</h4><span class="yt-channel-name">${escapeHtml(item.authorName)}</span></div>
                        </div>`;
                    card.addEventListener('click', () => openWatchPage(item));
                    feedGrid.appendChild(card);
                });
            } else if (viewMode === 'studio') {
                openStudioDashboard(allContents);
            } else if (viewMode === 'creators') {
                loadCreatorsList();
            } else if (viewMode === 'messages') {
                loadMessagesView();
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function loadCreatorsList(filter = '') {
        creatorsGrid.innerHTML = '';
        try {
            const res = await fetch('/api/users');
            const usersObj = await res.json();
            const users = Object.values(usersObj).filter(u => u.handle !== (currentUserData ? currentUserData.handle : ''));

            let filtered = users;
            if (filter.trim() !== '') {
                const q = filter.toLowerCase().trim();
                filtered = users.filter(u => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
            }

            if (filtered.length === 0) {
                creatorsGrid.innerHTML = `<p style="color:#777;">No creators found.</p>`;
                return;
            }

            filtered.forEach(u => {
                const card = document.createElement('div');
                card.className = 'creator-card';
                const verifiedHTML = shouldVerify(u.email, u.handle) ? `<span class="verified-badge" title="Verified">${verifiedSVG}</span>` : '';
                card.innerHTML = `
                    <div class="creator-avatar" style="background-color: ${u.bgColor || '#a855f7'};">
                        ${u.avatarUrl ? `<img src="${u.avatarUrl}">` : u.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="creator-info">
                        <div class="name-badge-inline">
                            <h4>${escapeHtml(u.name)}</h4>
                            ${verifiedHTML}
                        </div>
                        <span>@${escapeHtml(u.handle)}</span>
                    </div>
                `;
                card.addEventListener('click', () => openChannelPageByHandle(u.handle));
                creatorsGrid.appendChild(card);
            });
        } catch (e) { console.error(e); }
    }

    creatorSearchInput.addEventListener('input', (e) => {
        loadCreatorsList(e.target.value);
    });

    async function loadMessagesView(filter = '') {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        igDmChatsList.innerHTML = '';
        try {
            const res = await fetch('/api/users');
            const usersObj = await res.json();
            const users = Object.values(usersObj).filter(u => u.handle !== currentUserData.handle);

            let filtered = users;
            if (filter.trim() !== '') {
                const q = filter.toLowerCase().trim();
                filtered = users.filter(u => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
            }

            if (filtered.length === 0) {
                igDmChatsList.innerHTML = `<p style="padding:16px; color:#8e8e8e; font-size:12px;">No chats found.</p>`;
                return;
            }

            filtered.forEach(u => {
                const item = document.createElement('div');
                item.className = 'ig-dm-user-item';
                if (activeTargetUser && activeTargetUser.handle === u.handle) item.classList.add('active');
                
                const verifiedHTML = shouldVerify(u.email, u.handle) ? `<span class="verified-badge" title="Verified">${verifiedSVG}</span>` : '';
                item.innerHTML = `
                    <div class="creator-avatar" style="width:44px; height:44px; font-size:16px; background-color: ${u.bgColor || '#a855f7'};">
                        ${u.avatarUrl ? `<img src="${u.avatarUrl}">` : u.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ig-dm-user-info">
                        <div class="name-badge-inline">
                            <h4>${escapeHtml(u.name)}</h4>
                            ${verifiedHTML}
                        </div>
                        <span>@${escapeHtml(u.handle)}</span>
                    </div>
                `;
                item.addEventListener('click', () => {
                    document.querySelectorAll('.ig-dm-user-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    openChatWithUser(u);
                });
                igDmChatsList.appendChild(item);
            });
        } catch (e) { console.error(e); }
    }

    igUserSearchInput.addEventListener('input', (e) => {
        loadMessagesView(e.target.value);
    });

    igNewChatBtn.addEventListener('click', () => {
        igUserSearchInput.focus();
    });

    function openChatWithUser(targetUser) {
        activeTargetUser = targetUser;
        const room = [currentUserData.handle, targetUser.handle].sort().join('_');
        activeChatRoom = room;
        socket.emit('join_room', room);

        const { aFollowsB, bFollowsA, mutual } = checkMutualFollow(currentUserData.handle, targetUser.handle);

        igDmChatArea.innerHTML = `
            <div class="ig-chat-box-active">
                <div class="ig-chat-header">
                    <div class="creator-avatar" style="width:40px; height:40px; font-size:15px; background-color:${targetUser.bgColor};">
                        ${targetUser.avatarUrl ? `<img src="${targetUser.avatarUrl}">` : targetUser.name.charAt(0)}
                    </div>
                    <div>
                        <h4 style="font-size:14px; color:#fff; font-weight:600;">${escapeHtml(targetUser.name)}</h4>
                        <span style="font-size:12px; color:#8e8e8e;">@${escapeHtml(targetUser.handle)}</span>
                    </div>
                </div>
                <div id="igMsgBannerContainer"></div>
                <div class="ig-chat-messages-list" id="igDmMessagesList"></div>
                <div class="ig-chat-input-area" id="igChatInputAreaWrapper">
                    <input type="text" id="igChatInput" placeholder="Message..." class="ig-chat-input">
                    <button class="ig-chat-send-btn" id="igChatSendBtn">Send</button>
                </div>
            </div>
        `;

        fetch(`/api/messages/${room}`)
            .then(res => res.json())
            .then(msgs => {
                const list = document.getElementById('igDmMessagesList');
                list.innerHTML = '';
                msgs.forEach(m => appendIgMessageBubble(m));
                checkMessagePermission(msgs, currentUserData.handle);
            });

        const sendHandler = () => {
            const input = document.getElementById('igChatInput');
            const text = input.value.trim();
            if (!text) return;
            socket.emit('send_message', {
                room, senderHandle: currentUserData.handle,
                senderName: currentUserData.name, text
            });
            input.value = '';
        };

        document.getElementById('igChatSendBtn').addEventListener('click', sendHandler);
        document.getElementById('igChatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendHandler();
        });
    }

    function checkMessagePermission(msgs, myHandle) {
        const { mutual } = checkMutualFollow(currentUserData.handle, activeTargetUser.handle);
        const bannerContainer = document.getElementById('igMsgBannerContainer');
        const inputArea = document.getElementById('igChatInputAreaWrapper');
        if (!bannerContainer || !inputArea) return;

        if (mutual) {
            bannerContainer.innerHTML = '';
            inputArea.style.display = 'flex';
            return;
        }

        const myMessages = msgs.filter(m => m.senderHandle === myHandle);
        const aFollowsB = isFollowing(activeTargetUser.handle);
        const bFollowsA = isFollowing(currentUserData.handle);

        if (!aFollowsB && bFollowsA) {
            bannerContainer.innerHTML = `<div class="ig-msg-request-banner">You sent a message request. You can only send 1 message until they follow you back.</div>`;
            if (myMessages.length >= 1) {
                inputArea.style.display = 'none';
                bannerContainer.innerHTML += `<div class="ig-msg-request-banner" style="color:#ff4444; border-top:none;">Message request pending. Limit reached.</div>`;
            }
        } else if (aFollowsB && !bFollowsA) {
            bannerContainer.innerHTML = `<div class="ig-msg-request-banner">They are requesting to message you.</div>`;
            inputArea.style.display = 'flex';
        } else {
            bannerContainer.innerHTML = `<div class="ig-msg-request-banner">Message request sent. You can send 1 message.</div>`;
            if (myMessages.length >= 1) {
                inputArea.style.display = 'none';
            }
        }
    }

    socket.on('receive_message', (msg) => {
        if (msg.room === activeChatRoom) {
            appendIgMessageBubble(msg);
            fetch(`/api/messages/${msg.room}`)
                .then(res => res.json())
                .then(msgs => checkMessagePermission(msgs, currentUserData.handle));
        }
    });

    function appendIgMessageBubble(msg) {
        const list = document.getElementById('igDmMessagesList');
        if (!list) return;
        const div = document.createElement('div');
        const isMe = (msg.senderHandle === currentUserData.handle);
        div.className = `ig-msg-bubble ${isMe ? 'sent' : 'received'}`;
        div.textContent = msg.text;
        list.appendChild(div);
        list.scrollTop = list.scrollHeight;
    }

    function openStudioDashboard(allContents) {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        homeView.style.display = 'none';
        postsView.style.display = 'none';
        channelView.style.display = 'none';
        watchView.style.display = 'none';
        creatorsView.style.display = 'none';
        messagesView.style.display = 'none';
        studioView.style.display = 'block';

        const isAdmin = (currentEmail === 'ugakegqreoqte@gmail.com');
        const displayContents = isAdmin ? allContents : allContents.filter(c => c.authorHandle === currentUserData.handle);
        const totalViews = displayContents.reduce((acc, curr) => acc + (curr.viewedUsers ? curr.viewedUsers.length : 1), 0);

        document.getElementById('studioTotalVideos').textContent = displayContents.length;
        document.getElementById('studioTotalViews').textContent = totalViews;
        document.getElementById('studioFollowerCount').textContent = currentUserData.followersCount || 15;

        const tableBody = document.getElementById('studioTableBody');
        tableBody.innerHTML = '';

        if (displayContents.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#777;">No content uploaded yet.</td></tr>`;
            return;
        }

        displayContents.reverse().forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="display:flex; align-items:center; gap:12px;">
                    <img src="${item.thumbnailUrl || item.fileUrl}" style="width:60px; height:34px; object-fit:cover; border-radius:4px;">
                    <span>${escapeHtml(item.title)}</span>
                </td>
                <td>@${escapeHtml(item.authorHandle)}</td>
                <td>${timeAgo(item.id)}</td>
                <td>${item.viewedUsers ? item.viewedUsers.length : 1}</td>
                <td>
                    <button class="studio-del-btn" data-id="${item.id}">
                        <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        Delete
                    </button>
                </td>
            `;
            tr.querySelector('.studio-del-btn').addEventListener('click', async () => {
                if (confirm('Are you sure you want to delete this content?')) {
                    await fetch(`/api/contents/${item.id}?email=${encodeURIComponent(currentEmail)}`, { method: 'DELETE' });
                    loadFeed('studio');
                }
            });
            tableBody.appendChild(tr);
        });
    }

    studioUploadNewBtn.addEventListener('click', () => {
        resetWizard();
        createModal.classList.add('active');
    });

    function renderPostCard(item, container) {
        const card = document.createElement('div');
        card.className = 'post-card';
        const verifiedHTML = shouldVerify(item.authorEmail, item.authorHandle) ? `<span class="verified-badge" title="Verified">${verifiedSVG}</span>` : '';
        const isLiked = isLoggedIn && item.likedUsers && item.likedUsers.includes(currentEmail);
        const isReposted = isLoggedIn && item.repostedUsers && currentUserData && item.repostedUsers.includes(currentUserData.handle);
        const isAdmin = (currentEmail === 'ugakegqreoqte@gmail.com');
        const canDeletePost = isLoggedIn && (isAdmin || item.authorEmail === currentEmail);

        let pollHTML = '';
        if (item.pollOptions && item.pollOptions.length > 0) {
            const totalVotes = item.pollVotes ? item.pollVotes.reduce((a, b) => a + b, 0) : 0;
            pollHTML = `<div class="poll-container">`;
            item.pollOptions.forEach((opt, idx) => {
                if (!opt) return;
                const votes = item.pollVotes ? item.pollVotes[idx] || 0 : 0;
                const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                pollHTML += `
                    <button class="poll-option-btn" data-content-id="${item.id}" data-opt-idx="${idx}">
                        <div class="poll-bar" style="width: ${pct}%;"></div>
                        <div class="poll-option-text"><span>${escapeHtml(opt)}</span><span>${pct}% (${votes})</span></div>
                    </button>
                `;
            });
            pollHTML += `</div>`;
        }

        card.innerHTML = `
            <div class="post-header">
                <div class="yt-channel-avatar" style="background-color: ${item.authorBg || '#a855f7'};">
                    ${item.authorAvatar ? `<img src="${item.authorAvatar}">` : item.authorName.charAt(0).toUpperCase()}
                </div>
                <div class="post-header-info">
                    <div class="name-badge-inline">
                        <h4 class="post-author-link" data-handle="${item.authorHandle}" style="cursor:pointer;">${escapeHtml(item.authorName)}</h4>
                        ${verifiedHTML}
                    </div>
                    <span>${timeAgo(item.id)}</span>
                </div>
                ${canDeletePost ? `<button class="admin-delete-post-btn" data-id="${item.id}" style="margin-left:auto; background:none; border:none; color:#ff4444; cursor:pointer;" title="Delete Post"><svg viewBox="0 0 24 24" style="width:18px; height:18px; fill:currentColor;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>` : ''}
            </div>
            <div class="post-body-text">${escapeHtml(item.title)}</div>
            ${item.thumbnailUrl && item.type === 'post' ? `<img src="${item.thumbnailUrl}" class="post-body-image">` : ''}
            ${pollHTML}
            <div class="post-actions-row">
                <div class="like-dislike-group">
                    <button class="action-btn like-post-btn ${isLiked ? 'active' : ''}" data-id="${item.id}">
                        <svg viewBox="0 0 24 24" class="action-icon"><path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                        <span>${item.likes || 0}</span>
                    </button>
                </div>
                <button class="action-btn repost-post-btn repost-action-btn ${isReposted ? 'active' : ''}" data-id="${item.id}">
                    <svg viewBox="0 0 24 24" class="action-icon"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
                    <span>Repost (${item.repostedUsers ? item.repostedUsers.length : 0})</span>
                </button>
                <button class="action-btn comment-post-btn" data-id="${item.id}">
                    <svg viewBox="0 0 24 24" class="action-icon"><path fill="currentColor" d="M21 6h-18c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l4 4 4-4h7c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm0 13h-7.58l-2.42 2.42-2.42-2.42h-5.58v-11h18v11z"/></svg>
                    <span>Comments (${item.comments ? item.comments.length : 0})</span>
                </button>
            </div>
        `;

        card.querySelector('.post-author-link').addEventListener('click', () => openChannelPageByHandle(item.authorHandle));

        if (canDeletePost) {
            card.querySelector('.admin-delete-post-btn').addEventListener('click', async () => {
                if (confirm('Are you sure you want to delete this post?')) {
                    await fetch(`/api/contents/${item.id}?email=${encodeURIComponent(currentEmail)}`, { method: 'DELETE' });
                    loadFeed('posts');
                }
            });
        }

        card.querySelector('.like-post-btn').addEventListener('click', async (e) => {
            if (!isLoggedIn) { authModal.classList.add('active'); return; }
            const res = await fetch(`/api/contents/${item.id}/like`, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: currentEmail })
            });
            const data = await res.json();
            if (data.success) {
                item.likes = data.likes;
                e.currentTarget.querySelector('span').textContent = data.likes;
                if (data.liked) e.currentTarget.classList.add('active');
                else e.currentTarget.classList.remove('active');
            }
        });

        card.querySelector('.repost-post-btn').addEventListener('click', async (e) => {
            if (!isLoggedIn) { authModal.classList.add('active'); return; }
            const res = await fetch(`/api/contents/${item.id}/repost`, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: currentEmail, handle: currentUserData.handle })
            });
            const data = await res.json();
            if (data.success) {
                e.currentTarget.querySelector('span').textContent = `Repost (${data.repostCount})`;
                if (data.reposted) e.currentTarget.classList.add('active');
                else e.currentTarget.classList.remove('active');
            }
        });

        card.querySelectorAll('.poll-option-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!isLoggedIn) { authModal.classList.add('active'); return; }
                const optIdx = Number(btn.dataset.optIdx);
                const res = await fetch(`/api/contents/${item.id}/vote`, {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ optionIndex: optIdx, email: currentEmail })
                });
                const data = await res.json();
                if (data.success) {
                    item.pollVotes = data.pollVotes;
                    loadFeed('posts');
                } else {
                    alert(data.error || 'Already voted!');
                }
            });
        });

        card.querySelector('.comment-post-btn').addEventListener('click', () => openPostCommentModal(item));
        container.appendChild(card);
    }

    function openPostCommentModal(item) {
        postModalOverlay.classList.add('active');
        postModalBody.innerHTML = `
            <div class="post-card" style="border:none; box-shadow:none; padding:0; background:transparent;">
                <div class="post-header">
                    <div class="yt-channel-avatar" style="background-color: ${item.authorBg};">${item.authorAvatar ? `<img src="${item.authorAvatar}">` : item.authorName.charAt(0)}</div>
                    <div class="post-header-info"><h4>${escapeHtml(item.authorName)}</h4><span>${timeAgo(item.id)}</span></div>
                </div>
                <div class="post-body-text">${escapeHtml(item.title)}</div>
            </div>
            <div class="comments-section" style="margin-top:16px;">
                <h3>Comments</h3>
                <div class="add-comment-box">
                    <div class="comment-avatar" id="modalCommentAvatar">U</div>
                    <input type="text" id="modalCommentInput" placeholder="Add a comment..." class="comment-input">
                    <button class="comment-submit-btn" id="modalCommentSubmit">Comment</button>
                </div>
                <div class="comments-list" id="modalCommentsList"></div>
            </div>
        `;

        if (currentUserData) {
            const av = document.getElementById('modalCommentAvatar');
            if (currentUserData.avatarUrl) av.innerHTML = `<img src="${currentUserData.avatarUrl}">`;
            else { av.style.backgroundColor = currentUserData.bgColor; av.textContent = currentUserData.name.charAt(0); }
        }

        const renderModalComments = (comments) => {
            const list = document.getElementById('modalCommentsList');
            list.innerHTML = '';
            const isAdmin = (currentEmail === 'ugakegqreoqte@gmail.com');
            (comments || []).reverse().forEach(c => {
                const div = document.createElement('div');
                div.className = 'comment-item';
                const canDelete = isLoggedIn && (isAdmin || c.authorEmail === currentEmail || (currentUserData && c.authorHandle === currentUserData.handle));
                div.innerHTML = `
                    <div class="comment-left">
                        <div class="yt-channel-avatar" style="background-color: ${c.authorBg};">${c.authorAvatar ? `<img src="${c.authorAvatar}">` : c.authorName.charAt(0)}</div>
                        <div class="comment-content"><h5>@${c.authorHandle} • <span>${timeAgo(c.id)}</span></h5><p>${escapeHtml(c.text)}</p></div>
                    </div>
                    ${canDelete ? `<button class="delete-comment-btn" data-comment-id="${c.id}"><svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>` : ''}
                `;
                if (canDelete) {
                    div.querySelector('.delete-comment-btn').addEventListener('click', async () => {
                        const delRes = await fetch(`/api/contents/${item.id}/comment/${c.id}`, { method: 'DELETE' });
                        const delData = await delRes.json();
                        if (delData.success) {
                            item.comments = delData.comments;
                            renderModalComments(item.comments);
                        }
                    });
                }
                list.appendChild(div);
            });
        };
        renderModalComments(item.comments);

        document.getElementById('modalCommentSubmit').addEventListener('click', async () => {
            if (!isLoggedIn) { authModal.classList.add('active'); return; }
            const txt = document.getElementById('modalCommentInput').value.trim();
            if (!txt) return;
            const res = await fetch(`/api/contents/${item.id}/comment`, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    text: txt, authorName: currentUserData.name, authorHandle: currentUserData.handle,
                    authorAvatar: currentUserData.avatarUrl || '', authorBg: currentUserData.bgColor, authorEmail: currentEmail
                })
            });
            const data = await res.json();
            if (data.success) {
                item.comments = data.comments;
                renderModalComments(data.comments);
                document.getElementById('modalCommentInput').value = '';
            }
        });
    }

    closePostModalBtn.addEventListener('click', () => postModalOverlay.classList.remove('active'));

    async function openChannelPageByHandle(handle) {
        triggerLoadingBar();
        homeView.style.display = 'none';
        postsView.style.display = 'none';
        studioView.style.display = 'none';
        watchView.style.display = 'none';
        creatorsView.style.display = 'none';
        messagesView.style.display = 'none';
        channelView.style.display = 'block';
        if (mainVideoPlayer) mainVideoPlayer.pause();
        currentViewingChannelHandle = handle;

        const res = await fetch('/api/contents');
        const allContents = await res.json();
        const channelContents = allContents.filter(c => c.authorHandle === handle);

        if (channelContents.length > 0) {
            const ch = channelContents[0];
            channelProfileName.textContent = ch.authorName;
            channelProfileHandle.textContent = `@${ch.authorHandle}`;
            if (ch.authorAvatar) channelBigAvatar.innerHTML = `<img src="${ch.authorAvatar}">`;
            else { channelBigAvatar.style.backgroundColor = ch.authorBg || '#a855f7'; channelBigAvatar.textContent = ch.authorName.charAt(0).toUpperCase(); }

            if (shouldVerify(ch.authorEmail, ch.authorHandle)) verifiedBadgeChannel.style.display = 'inline-flex';
            else verifiedBadgeChannel.style.display = 'none';
        } else {
            const userRes = await fetch('/api/users');
            const users = await userRes.json();
            const foundUser = Object.values(users).find(u => u.handle === handle);
            if (foundUser) {
                channelProfileName.textContent = foundUser.name;
                channelProfileHandle.textContent = `@${foundUser.handle}`;
                if (foundUser.avatarUrl) channelBigAvatar.innerHTML = `<img src="${foundUser.avatarUrl}">`;
                else { channelBigAvatar.style.backgroundColor = foundUser.bgColor || '#a855f7'; channelBigAvatar.textContent = foundUser.name.charAt(0).toUpperCase(); }
            }
        }

        const isSelf = isLoggedIn && currentUserData && currentUserData.handle === handle;
        if (isSelf) {
            subscribeMainBtn.style.display = 'none';
            messageChannelBtn.style.display = 'none';
            channelStudioBtn.style.display = 'inline-block';
        } else {
            channelStudioBtn.style.display = 'none';
            messageChannelBtn.style.display = 'inline-block';
            updateFollowButtons(handle);
        }

        channelGrid.innerHTML = '';
        if (channelContents.length === 0) { emptyChannelFeed.style.display = 'block'; return; }
        emptyChannelFeed.style.display = 'none';

        channelContents.reverse().forEach(item => {
            if (item.type === 'video') {
                const card = document.createElement('div');
                card.className = 'yt-video-card';
                card.innerHTML = `
                    <div class="yt-thumbnail-wrapper"><img src="${item.thumbnailUrl || item.fileUrl}" class="yt-thumbnail-img"><span class="video-duration-badge">${item.duration || '0:00'}</span></div>
                    <div class="yt-video-details"><div class="yt-meta-info"><h4>${escapeHtml(item.title)}</h4><span class="yt-video-stats">${item.viewedUsers ? item.viewedUsers.length : 1} views • ${timeAgo(item.id)}</span></div></div>
                `;
                card.addEventListener('click', () => openWatchPage(item));
                channelGrid.appendChild(card);
            }
        });
    }

    channelStudioBtn.addEventListener('click', () => loadFeed('studio'));

    async function openWatchPage(item) {
        triggerLoadingBar();
        homeView.style.display = 'none';
        postsView.style.display = 'none';
        channelView.style.display = 'none';
        studioView.style.display = 'none';
        creatorsView.style.display = 'none';
        messagesView.style.display = 'none';
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

        if (shouldVerify(item.authorEmail, item.authorHandle)) verifiedBadgeWatch.style.display = 'inline-flex';
        else verifiedBadgeWatch.style.display = 'none';

        if (item.likedUsers && item.likedUsers.includes(currentEmail)) likeBtn.classList.add('active');
        else likeBtn.classList.remove('active');

        if (item.repostedUsers && currentUserData && item.repostedUsers.includes(currentUserData.handle)) repostBtn.classList.add('active');
        else repostBtn.classList.remove('active');

        const isAdmin = (currentEmail === 'ugakegqreoqte@gmail.com');
        if (isLoggedIn && (isAdmin || item.authorEmail === currentEmail)) {
            adminDeleteWatchBtn.style.display = 'flex';
        } else {
            adminDeleteWatchBtn.style.display = 'none';
        }

        if (item.authorAvatar) watchAvatar.innerHTML = `<img src="${item.authorAvatar}">`;
        else { watchAvatar.style.backgroundColor = item.authorBg || '#a855f7'; watchAvatar.textContent = item.authorName.charAt(0).toUpperCase(); }

        updateFollowButtons(item.authorHandle);
        renderComments(item.comments || []);
        renderSuggestedVideos(item.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    adminDeleteWatchBtn.addEventListener('click', async () => {
        if (!activeCurrentVideoItem) return;
        if (confirm('Are you sure you want to delete this video?')) {
            const res = await fetch(`/api/contents/${activeCurrentVideoItem.id}?email=${encodeURIComponent(currentEmail)}`, { method: 'DELETE' });
            if (res.ok) loadFeed('home');
        }
    });

    async function renderSuggestedVideos(currentId) {
        suggestedVideosList.innerHTML = '';
        try {
            const res = await fetch('/api/contents');
            const all = await res.json();
            const videos = all.filter(c => c.type === 'video' && c.id !== currentId);
            videos.reverse().forEach(item => {
                const div = document.createElement('div');
                div.className = 'suggested-card';
                div.innerHTML = `
                    <div class="suggested-thumb"><img src="${item.thumbnailUrl || item.fileUrl}"><span class="video-duration-badge">${item.duration}</span></div>
                    <div class="suggested-info">
                        <h4>${escapeHtml(item.title)}</h4>
                        <span>${escapeHtml(item.authorName)}</span>
                        <span>${item.viewedUsers ? item.viewedUsers.length : 1} views • ${timeAgo(item.id)}</span>
                    </div>
                `;
                div.addEventListener('click', () => openWatchPage(item));
                suggestedVideosList.appendChild(div);
            });
        } catch (e) { console.error(e); }
    }

    likeBtn.addEventListener('click', async () => {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        if (!activeCurrentVideoItem) return;

        const res = await fetch(`/api/contents/${activeCurrentVideoItem.id}/like`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
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

    repostBtn.addEventListener('click', async () => {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        if (!activeCurrentVideoItem) return;

        const res = await fetch(`/api/contents/${activeCurrentVideoItem.id}/repost`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: currentEmail, handle: currentUserData.handle })
        });
        const data = await res.json();
        if (data.success) {
            if (data.reposted) repostBtn.classList.add('active');
            else repostBtn.classList.remove('active');
        }
    });

    commentSubmitBtn.addEventListener('click', async () => {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        const text = commentInput.value.trim();
        if (!text || !activeCurrentVideoItem) return;

        const res = await fetch(`/api/contents/${activeCurrentVideoItem.id}/comment`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text, authorName: currentUserData.name, authorHandle: currentUserData.handle,
                authorAvatar: currentUserData.avatarUrl || '', authorBg: currentUserData.bgColor, authorEmail: currentEmail
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
        const isAdmin = (currentEmail === 'ugakegqreoqte@gmail.com');
        (comments || []).reverse().forEach(c => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            const verifiedComm = shouldVerify(c.authorEmail, c.authorHandle) ? `<span class="verified-badge" title="Verified">${verifiedSVG}</span>` : '';
            const canDelete = isLoggedIn && (isAdmin || c.authorEmail === currentEmail || (currentUserData && c.authorHandle === currentUserData.handle));
            
            div.innerHTML = `
                <div class="comment-left">
                    <div class="yt-channel-avatar" style="background-color: ${c.authorBg || '#a855f7'};">${c.authorAvatar ? `<img src="${c.authorAvatar}">` : c.authorName.charAt(0)}</div>
                    <div class="comment-content">
                        <div class="name-badge-inline">
                            <h5>@${c.authorHandle}</h5>${verifiedComm}<span>• ${timeAgo(c.id)}</span>
                        </div>
                        <p>${escapeHtml(c.text)}</p>
                    </div>
                </div>
                ${canDelete ? `<button class="delete-comment-btn" data-comment-id="${c.id}"><svg viewBox="0 0 24 24" class="delete-comment-icon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>` : ''}
            `;

            if (canDelete) {
                div.querySelector('.delete-comment-btn').addEventListener('click', async () => {
                    if (!activeCurrentVideoItem) return;
                    const delRes = await fetch(`/api/contents/${activeCurrentVideoItem.id}/comment/${c.id}`, { method: 'DELETE' });
                    const delData = await delRes.json();
                    if (delData.success) {
                        activeCurrentVideoItem.comments = delData.comments;
                        renderComments(activeCurrentVideoItem.comments);
                    }
                });
            }
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
        document.querySelectorAll('.nav-item[data-nav="home"], .mobile-nav-item[data-nav="home"]').forEach(el => el.classList.add('active'));
        loadFeed('home');
    });

    searchInput.addEventListener('input', (e) => {
        loadFeed('home', e.target.value);
    });
    searchSubmitBtn.addEventListener('click', () => {
        loadFeed('home', searchInput.value);
    });

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
                        .then(data => syncUserWithBackend(data.email || "user@gmail.com", data.name || 'User', data.picture));
                    }
                }
            });
        }
    }
    setTimeout(initGoogleAuth, 600);

    googleAuthBtn.addEventListener('click', () => {
        if (tokenClient) tokenClient.requestAccessToken({ prompt: 'select_account' });
        else syncUserWithBackend("ugakegqreoqte@gmail.com", "FreezyOfficial0", null);
    });

    async function syncUserWithBackend(email, defaultName, defaultAvatar) {
        currentEmail = email;
        const res = await fetch('/api/sync-user', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, name: defaultName, avatarUrl: defaultAvatar })
        });
        const data = await res.json();
        if (data.success) {
            const userData = data.user;
            let allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
            allChannels[email] = userData;
            localStorage.setItem('yt_all_channels', JSON.stringify(allChannels));
            localStorage.setItem('yt_active_email', email);
            authModal.classList.remove('active');
            applyUserSession(userData);
            loadFeed('home');
        }
    }

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
        loadFeed('home');
    });

    openAuthBtn.addEventListener('click', () => authModal.classList.add('active'));
    closeAuthModalBtn.addEventListener('click', () => authModal.classList.remove('active'));

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageTarget = item.dataset.nav;
            if (pageTarget === 'upload') {
                if (!isLoggedIn) { authModal.classList.add('active'); return; }
                resetWizard();
                createModal.classList.add('active');
                return;
            }
            if (pageTarget === 'profile') {
                if (!isLoggedIn) { authModal.classList.add('active'); return; }
                openChannelPageByHandle(currentUserData.handle);
                return;
            }

            navItems.forEach(n => n.classList.remove('active'));
            document.querySelectorAll(`[data-nav="${pageTarget}"]`).forEach(el => el.classList.add('active'));

            if (pageTarget === 'home') loadFeed('home');
            if (pageTarget === 'posts') loadFeed('posts');
            if (pageTarget === 'following') loadFeed('following');
            if (pageTarget === 'reposts') loadFeed('reposts');
            if (pageTarget === 'studio') loadFeed('studio');
            if (pageTarget === 'creators') loadFeed('creators');
            if (pageTarget === 'messages') loadFeed('messages');
        });
    });

    createBtn.addEventListener('click', () => {
        if (!isLoggedIn) { authModal.classList.add('active'); return; }
        resetWizard();
        createModal.classList.add('active');
    });
    closeModalBtn.addEventListener('click', () => createModal.classList.remove('active'));

    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.dataset.type;
            if (selectedType === 'video') {
                videoUploadSection.style.display = 'block';
                postCreationSection.style.display = 'none';
            } else {
                videoUploadSection.style.display = 'none';
                postCreationSection.style.display = 'block';
            }
        });
    });

    tabTextPost.addEventListener('click', () => {
        tabTextPost.classList.add('active');
        tabPollPost.classList.remove('active');
        postSubMode = 'text';
        pollInputsContainer.style.display = 'none';
        imagePostInputsContainer.style.display = 'block';
    });
    tabPollPost.addEventListener('click', () => {
        tabPollPost.classList.add('active');
        tabTextPost.classList.remove('active');
        postSubMode = 'poll';
        pollInputsContainer.style.display = 'block';
        imagePostInputsContainer.style.display = 'none';
    });

    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = selectedFile.name;
            fileInfoBox.style.display = 'block';
            generateAutoThumbnails(selectedFile);
        }
    });

    selectPostFileBtn.addEventListener('click', () => postImageInput.click());
    postImageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedPostImageFile = e.target.files[0];
            postFileName.textContent = selectedPostImageFile.name;
            postFileInfo.style.display = 'block';
        }
    });

    function generateAutoThumbnails(videoFile) {
        const videoUrl = URL.createObjectURL(videoFile);
        const tempVid = document.createElement('video');
        tempVid.src = videoUrl;
        tempVid.crossOrigin = "anonymous";
        tempVid.muted = true;
        tempVid.preload = "auto";

        tempVid.onloadedmetadata = function() {
            videoDurationSeconds = tempVid.duration;
            tempVid.currentTime = Math.min(1.0, tempVid.duration * 0.1);
        };

        tempVid.onseeked = function() {
            const canvas = document.createElement('canvas');
            canvas.width = tempVid.videoWidth || 1280;
            canvas.height = tempVid.videoHeight || 720;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempVid, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');

            chosenThumbnailUrl = dataUrl;
            autoThumbGrid.innerHTML = `<div class="auto-thumb-option selected"><img src="${dataUrl}"></div>`;
        };
    }

    nextStepBtn.addEventListener('click', async () => {
        if (currentStep === 2) {
            if (selectedType === 'video' && !selectedFile) { alert('Please select a video file!'); return; }
            if (selectedType === 'post' && postSubMode === 'poll') {
                if (!pollQuestionInput.value.trim() || !pollOpt1.value.trim() || !pollOpt2.value.trim()) {
                    alert('Please fill in the poll question and at least 2 options!');
                    return;
                }
            }
        }
        if (currentStep === 3) {
            if (!contentTitleInput.value.trim()) { alert('Please fill in the title!'); return; }
        }

        if (currentStep < 4) {
            currentStep++;
            updateWizardState();
        } else {
            const formData = new FormData();
            formData.append('title', contentTitleInput.value.trim());
            formData.append('description', contentDescInput.value.trim());
            formData.append('type', selectedType);
            formData.append('authorName', currentUserData.name);
            formData.append('authorHandle', currentUserData.handle);
            formData.append('authorAvatar', currentUserData.avatarUrl || '');
            formData.append('authorBg', currentUserData.bgColor);
            formData.append('authorEmail', currentEmail);

            if (selectedType === 'video') {
                formData.append('file', selectedFile);
                formData.append('thumbnailUrl', chosenThumbnailUrl || '');
                formData.append('duration', formatDuration(videoDurationSeconds));
            } else {
                if (postSubMode === 'poll') {
                    const opts = [pollOpt1.value.trim(), pollOpt2.value.trim(), pollOpt3.value.trim(), pollOpt4.value.trim()].filter(Boolean);
                    formData.append('pollOptions', JSON.stringify(opts));
                    formData.append('thumbnailUrl', '');
                } else {
                    if (selectedPostImageFile) {
                        formData.append('file', selectedPostImageFile);
                        formData.append('thumbnailUrl', URL.createObjectURL(selectedPostImageFile));
                    } else {
                        formData.append('thumbnailUrl', '');
                    }
                }
            }

            nextStepBtn.textContent = 'Publishing...';
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            if (res.ok) {
                createModal.classList.remove('active');
                loadFeed(selectedType === 'video' ? 'home' : 'posts');
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
        selectedPostImageFile = null;
        chosenThumbnailUrl = null;
        videoDurationSeconds = 0;
        fileInput.value = '';
        if (postImageInput) postImageInput.value = '';
        if (fileInfoBox) fileInfoBox.style.display = 'none';
        if (postFileInfo) postFileInfo.style.display = 'none';
        contentTitleInput.value = '';
        contentDescInput.value = '';
        if(pollQuestionInput) pollQuestionInput.value = '';
        if(pollOpt1) pollOpt1.value = '';
        if(pollOpt2) pollOpt2.value = '';
        if(pollOpt3) pollOpt3.value = '';
        if(pollOpt4) pollOpt4.value = '';
        autoThumbGrid.innerHTML = '';
        updateWizardState();
    }
});
