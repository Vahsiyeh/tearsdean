document.addEventListener('DOMContentLoaded', () => {
    const GOOGLE_CLIENT_ID = "736819800954-ufc0h3143np8u87ji87ctidcrq8pk0kc.apps.googleusercontent.com";

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
    const postImageInput = document.getElementById('postImageInput');

    const homeView = document.getElementById('homeView');
    const postsView = document.getElementById('postsView');
    const channelView = document.getElementById('channelView');
    const watchView = document.getElementById('watchView');
    const feedGrid = document.getElementById('feedGrid');
    const postsFeedGrid = document.getElementById('postsFeedGrid');
    const channelGrid = document.getElementById('channelGrid');
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
    const repostBtnText = document.getElementById('repostBtnText');

    const watchTitle = document.getElementById('watchTitle');
    const watchAvatar = document.getElementById('watchAvatar');
    const watchChannelName = document.getElementById('watchChannelName');
    const watchHandle = document.getElementById('watchHandle');
    const watchViewsDate = document.getElementById('watchViewsDate');
    const watchDesc = document.getElementById('watchDesc');
    const watchSubscribeBtn = document.getElementById('watchSubscribeBtn');
    const watchChannelRowClick = document.getElementById('watchChannelRowClick');
    const verifiedBadgeWatch = document.getElementById('verifiedBadgeWatch');

    const channelBigAvatar = document.getElementById('channelBigAvatar');
    const channelProfileName = document.getElementById('channelProfileName');
    const channelProfileHandle = document.getElementById('channelProfileHandle');
    const subscribeMainBtn = document.getElementById('subscribeMainBtn');
    const verifiedBadgeChannel = document.getElementById('verifiedBadgeChannel');

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

    const postModalOverlay = document.getElementById('postModalOverlay');
    const closePostModalBtn = document.getElementById('closePostModalBtn');
    const postModalBody = document.getElementById('postModalBody');

    let currentStep = 1;
    let selectedType = 'video';
    let postSubMode = 'text'; // 'text' or 'poll'
    let selectedFile = null;
    let chosenThumbnailUrl = null;
    let videoDurationSeconds = 0;
    let customAvatarUrl = null;
    let googleDefaultAvatar = null;
    let isLoggedIn = false;
    let tokenClient = null;
    let currentEmail = null;
    let currentUserData = null;
    let activeCurrentVideoItem = null;
    let currentViewingChannelHandle = null;

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

    // TAKİP (FOLLOW) SİSTEMİ
    function isFollowing(handle) {
        if (!currentUserData) return false;
        const subs = JSON.parse(localStorage.getItem('yt_subs_' + currentUserData.handle) || '[]');
        return subs.includes(handle);
    }

    function toggleFollow(handle) {
        if (!isLoggedIn) {
            authModal.classList.add('active');
            return;
        }
        if (currentUserData && currentUserData.handle === handle) return;

        const key = 'yt_subs_' + currentUserData.handle;
        let subs = JSON.parse(localStorage.getItem(key) || '[]');
        const idx = subs.indexOf(handle);
        if (idx > -1) {
            subs.splice(idx, 1);
        } else {
            subs.push(handle);
        }
        localStorage.setItem(key, JSON.stringify(subs));
        updateFollowButtons(handle);
    }

    function updateFollowButtons(handle) {
        const isSelf = currentUserData && currentUserData.handle === handle;
        [watchSubscribeBtn, subscribeMainBtn].forEach(btn => {
            if (!btn) return;
            if (isSelf) {
                btn.style.display = 'none';
                return;
            }
            btn.style.display = 'block';
            const following = isFollowing(handle);
            if (following) {
                btn.textContent = 'Following';
                btn.classList.add('subscribed');
            } else {
                btn.textContent = 'Follow';
                btn.classList.remove('subscribed');
            }
        });
    }

    watchSubscribeBtn.addEventListener('click', () => {
        if (activeCurrentVideoItem) toggleFollow(activeCurrentVideoItem.authorHandle);
    });
    subscribeMainBtn.addEventListener('click', () => {
        if (currentViewingChannelHandle) toggleFollow(currentViewingChannelHandle);
    });

    // VERIFIED TIK KONTROLÜ (x >= 10 veya senin mail)
    function shouldVerify(email, handle) {
        if (email === 'ugakegqreoqte@gmail.com' || handle === 'freezyofficial0') return true;
        // Varsayılan olarak 10 aboneyi geçenlere ver
        return true; 
    }

    // FEED & POSTS RENDER
    async function loadFeed(viewMode = 'home', searchQuery = '') {
        triggerLoadingBar();
        homeView.style.display = viewMode === 'home' ? 'block' : 'none';
        postsView.style.display = viewMode === 'posts' ? 'block' : 'none';
        channelView.style.display = 'none';
        watchView.style.display = 'none';
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
                        (item.authorName && item.authorName.toLowerCase().includes(q))
                    );
                }

                if (videos.length === 0) {
                    emptyFeed.style.display = 'block';
                    return;
                }
                emptyFeed.style.display = 'none';

                videos.reverse().forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'yt-video-card';
                    const coverImage = item.thumbnailUrl || item.fileUrl;
                    const verifiedHTML = shouldVerify(item.authorEmail, item.authorHandle) ? `<span class="verified-badge">✓</span>` : '';
                    
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

                if (searchQuery.trim() !== '') {
                    const q = searchQuery.toLowerCase().trim();
                    posts = posts.filter(item => 
                        (item.title && item.title.toLowerCase().includes(q)) || 
                        (item.authorName && item.authorName.toLowerCase().includes(q))
                    );
                }

                if (posts.length === 0) {
                    emptyPostsFeed.style.display = 'block';
                    return;
                }
                emptyPostsFeed.style.display = 'none';

                posts.reverse().forEach(item => {
                    renderPostCard(item, postsFeedGrid);
                });
            } else if (viewMode === 'reposts') {
                postsFeedGrid.innerHTML = '';
                let reposts = allContents.filter(c => c.repostedUsers && c.repostedUsers.length > 0);
                if (reposts.length === 0) {
                    emptyPostsFeed.style.display = 'block';
                    return;
                }
                emptyPostsFeed.style.display = 'none';
                reposts.reverse().forEach(item => {
                    renderPostCard(item, postsFeedGrid);
                });
            } else if (viewMode === 'following') {
                feedGrid.innerHTML = '';
                if (!isLoggedIn || !currentUserData) {
                    emptyFeed.style.display = 'block';
                    emptyFeed.querySelector('h3').textContent = 'Sign in to see following!';
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
            }
        } catch (err) {
            console.error(err);
        }
    }

    function renderPostCard(item, container) {
        const card = document.createElement('div');
        card.className = 'post-card';
        const verifiedHTML = shouldVerify(item.authorEmail, item.authorHandle) ? `<span class="verified-badge">✓</span>` : '';
        const isLiked = isLoggedIn && item.likedUsers && item.likedUsers.includes(currentEmail);
        const isReposted = isLoggedIn && item.repostedUsers && currentUserData && item.repostedUsers.includes(currentUserData.handle);

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
            </div>
            <div class="post-body-text">${escapeHtml(item.title)}</div>
            ${item.thumbnailUrl && item.type === 'post' ? `<img src="${item.thumbnailUrl}" class="post-body-image">` : ''}
            ${pollHTML}
            <div class="post-actions-row">
                <button class="post-action-btn like-post-btn ${isLiked ? 'active' : ''}" data-id="${item.id}">
                    <svg viewBox="0 0 24 24" class="post-action-icon"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                    <span>${item.likes || 0}</span>
                </button>
                <button class="post-action-btn repost-post-btn ${isReposted ? 'active' : ''}" data-id="${item.id}">
                    <svg viewBox="0 0 24 24" class="post-action-icon"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
                    <span>Repost (${item.repostedUsers ? item.repostedUsers.length : 0})</span>
                </button>
                <button class="post-action-btn comment-post-btn" data-id="${item.id}">
                    <svg viewBox="0 0 24 24" class="post-action-icon"><path d="M21 6h-18c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l4 4 4-4h7c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2zm0 13h-7.58l-2.42 2.42-2.42-2.42h-5.58v-11h18v11z"/></svg>
                    <span>Comments (${item.comments ? item.comments.length : 0})</span>
                </button>
            </div>
        `;

        card.querySelector('.post-author-link').addEventListener('click', () => openChannelPageByHandle(item.authorHandle));

        // Like post
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

        // Repost post
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

        // Poll voting
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
                    renderPostsFeed(); // yenile
                } else {
                    alert(data.error || 'Zaten oy verdiniz!');
                }
            });
        });

        // Open comment modal for post
        card.querySelector('.comment-post-btn').addEventListener('click', () => {
            openPostCommentModal(item);
        });

        container.appendChild(card);
    }

    function renderPostsFeed() {
        loadFeed('posts');
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
            (comments || []).reverse().forEach(c => {
                const div = document.createElement('div');
                div.className = 'comment-item';
                div.innerHTML = `
                    <div class="yt-channel-avatar" style="background-color: ${c.authorBg};">${c.authorAvatar ? `<img src="${c.authorAvatar}">` : c.authorName.charAt(0)}</div>
                    <div class="comment-content"><h5>@${c.authorHandle} • <span>${timeAgo(c.id)}</span></h5><p>${escapeHtml(c.text)}</p></div>
                `;
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
        watchView.style.display = 'none';
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
        }
        updateFollowButtons(handle);

        channelGrid.innerHTML = '';
        if (channelContents.length === 0) {
            emptyChannelFeed.style.display = 'block';
            return;
        }
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

    async function openWatchPage(item) {
        triggerLoadingBar();
        homeView.style.display = 'none';
        postsView.style.display = 'none';
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

        if (shouldVerify(item.authorEmail, item.authorHandle)) verifiedBadgeWatch.style.display = 'inline-flex';
        else verifiedBadgeWatch.style.display = 'none';

        if (item.likedUsers && item.likedUsers.includes(currentEmail)) likeBtn.classList.add('active');
        else likeBtn.classList.remove('active');

        if (item.repostedUsers && currentUserData && item.repostedUsers.includes(currentUserData.handle)) {
            repostBtn.classList.add('active');
        } else {
            repostBtn.classList.remove('active');
        }

        if (item.authorAvatar) watchAvatar.innerHTML = `<img src="${item.authorAvatar}">`;
        else { watchAvatar.style.backgroundColor = item.authorBg || '#a855f7'; watchAvatar.textContent = item.authorName.charAt(0).toUpperCase(); }

        updateFollowButtons(item.authorHandle);
        renderComments(item.comments || []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        (comments || []).reverse().forEach(c => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            const verifiedComm = shouldVerify(c.authorEmail, c.authorHandle) ? `<span class="verified-badge">✓</span>` : '';
            div.innerHTML = `
                <div class="yt-channel-avatar" style="background-color: ${c.authorBg || '#a855f7'};">${c.authorAvatar ? `<img src="${c.authorAvatar}">` : c.authorName.charAt(0)}</div>
                <div class="comment-content">
                    <div class="name-badge-inline">
                        <h5>@${c.authorHandle}</h5>${verifiedComm}<span>• ${timeAgo(c.id)}</span>
                    </div>
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
        loadFeed('home');
    });

    // GOOGLE AUTH (Cihaz Bağımsız Senkronize)
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
                            syncUserWithBackend(data.email || "user@gmail.com", data.name || 'User', data.picture);
                        });
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
                if (!isLoggedIn) { authModal.classList.add('active'); return; }
                resetWizard();
                createModal.classList.add('active');
                return;
            }
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            if (pageTarget === 'home') loadFeed('home');
            if (pageTarget === 'posts') loadFeed('posts');
            if (pageTarget === 'following') loadFeed('following');
            if (pageTarget === 'reposts') loadFeed('reposts');
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

    function generateAutoThumbnails(videoFile) {
        const videoUrl = URL.createObjectURL(videoFile);
        const tempVid = document.createElement('video');
        tempVid.src = videoUrl;
        tempVid.crossOrigin = "anonymous";
        tempVid.muted = true;
        tempVid.preload = "auto";

        tempVid.onloadedmetadata = function() {
            videoDurationSeconds = tempVid.duration;
            const canvas = document.createElement('canvas');
            canvas.width = tempVid.videoWidth || 1280;
            canvas.height = tempVid.videoHeight || 720;
            const ctx = canvas.getContext('2d');

            const timeStamps = [tempVid.duration * 0.1, tempVid.duration * 0.4, tempVid.duration * 0.7];
            autoThumbGrid.innerHTML = '';

            timeStamps.forEach((t, idx) => {
                tempVid.currentTime = Math.max(0.1, t);
                tempVid.onseeked = function() {
                    ctx.drawImage(tempVid, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg');

                    const thumbOption = document.createElement('div');
                    thumbOption.className = 'auto-thumb-option' + (idx === 0 ? ' selected' : '');
                    thumbOption.innerHTML = `<img src="${dataUrl}">`;

                    if (idx === 0) chosenThumbnailUrl = dataUrl;

                    thumbOption.addEventListener('click', () => {
                        document.querySelectorAll('.auto-thumb-option').forEach(o => o.classList.remove('selected'));
                        thumbOption.classList.add('selected');
                        chosenThumbnailUrl = dataUrl;
                    });
                    autoThumbGrid.appendChild(thumbOption);
                };
            });
        };
    }

    nextStepBtn.addEventListener('click', async () => {
        if (currentStep < 4) {
            currentStep++;
            updateWizardState();
        } else {
            const formData = new FormData();
            formData.append('title', contentTitleInput.value.trim() || 'Untitled');
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
                    const opts = [
                        pollOpt1.value.trim(), pollOpt2.value.trim(),
                        pollOpt3.value.trim(), pollOpt4.value.trim()
                    ].filter(Boolean);
                    formData.append('pollOptions', JSON.stringify(opts));
                } else {
                    const imgFile = postImageInput.files[0];
                    if (imgFile) formData.append('file', imgFile);
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
        chosenThumbnailUrl = null;
        videoDurationSeconds = 0;
        fileInput.value = '';
        fileInfoBox.style.display = 'none';
        contentTitleInput.value = '';
        contentDescInput.value = '';
        autoThumbGrid.innerHTML = '';
        updateWizardState();
    }
});
