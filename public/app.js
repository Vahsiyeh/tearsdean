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
    const uploadHint = document.getElementById('uploadHint');
    const contentTitleInput = document.getElementById('contentTitle');
    const contentDescInput = document.getElementById('contentDesc');
    const step2Desc = document.getElementById('step2Desc');
    const audienceGroupContainer = document.getElementById('audienceGroupContainer');
    const sumAudienceRow = document.getElementById('sumAudienceRow');

    const thumbnailInput = document.getElementById('thumbnailInput');
    const selectThumbBtn = document.getElementById('selectThumbBtn');
    const thumbFileName = document.getElementById('thumbFileName');
    const thumbnailGroup = document.getElementById('thumbnailGroup');
    const autoThumbnailsContainer = document.getElementById('autoThumbnailsContainer');
    const autoThumbGrid = document.getElementById('autoThumbGrid');

    const fileErrorMsg = document.getElementById('fileErrorMsg');
    const titleErrorMsg = document.getElementById('titleErrorMsg');

    const homeView = document.getElementById('homeView');
    const channelView = document.getElementById('channelView');
    const watchView = document.getElementById('watchView');
    const feedGrid = document.getElementById('feedGrid');
    const channelGrid = document.getElementById('channelGrid');
    const emptyFeed = document.getElementById('emptyFeed');
    const emptyChannelFeed = document.getElementById('emptyChannelFeed');
    const homeLogoBtn = document.getElementById('homeLogoBtn');

    const myAccountToggleBtn = document.getElementById('myAccountToggleBtn');
    const myAccountSubmenu = document.getElementById('myAccountSubmenu');
    const myAccountArrow = document.getElementById('myAccountArrow');

    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const topLoadingBar = document.getElementById('topLoadingBar');

    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const watchTitle = document.getElementById('watchTitle');
    const watchAvatar = document.getElementById('watchAvatar');
    const watchChannelName = document.getElementById('watchChannelName');
    const watchHandle = document.getElementById('watchHandle');
    const watchViewsDate = document.getElementById('watchViewsDate');
    const watchDesc = document.getElementById('watchDesc');

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
    const handleStatusMsg = document.getElementById('handleStatusMsg');
    const confirmProfileBtn = document.getElementById('confirmProfileBtn');

    const userProfile = document.getElementById('userProfile');
    const userAvatarBtn = document.getElementById('userAvatarBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdownAvatar = document.getElementById('dropdownAvatar');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownHandle = document.getElementById('dropdownHandle');
    
    const menuYourChannel = document.getElementById('menuYourChannel');
    const menuSettings = document.getElementById('menuSettings');
    const logoutBtn = document.getElementById('logoutBtn');
    const navItems = document.querySelectorAll('.sidebar .nav-item:not(.nav-header-btn)');

    let currentStep = 1;
    let selectedType = 'video';
    let selectedFile = null;
    let selectedThumbnailFile = null;
    let chosenThumbnailUrl = null;
    let videoDurationSeconds = 0;
    let customAvatarUrl = null;
    let googleDefaultAvatar = null;
    let isLoggedIn = false;
    let tokenClient = null;
    let currentEmail = null;
    let currentUserData = null;

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
        setTimeout(() => { topLoadingBar.style.width = '70%'; }, 50);
        setTimeout(() => {
            topLoadingBar.style.width = '100%';
            setTimeout(() => { topLoadingBar.style.opacity = '0'; }, 200);
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
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} months ago`;
        return `${Math.floor(months / 12)} years ago`;
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
        } else {
            const bg = user.bgColor || getRandomColor(user.name);
            userAvatarBtn.style.backgroundColor = bg;
            userAvatarBtn.textContent = user.name.charAt(0).toUpperCase();
            dropdownAvatar.style.backgroundColor = bg;
            dropdownAvatar.textContent = user.name.charAt(0).toUpperCase();
        }

        dropdownName.textContent = user.name;
        dropdownHandle.textContent = `@${user.handle}`;
        userProfile.style.display = 'block';
    }

    checkSavedSession();

    myAccountToggleBtn.addEventListener('click', () => {
        const isOpen = myAccountSubmenu.style.display === 'flex';
        myAccountSubmenu.style.display = isOpen ? 'none' : 'flex';
        myAccountArrow.classList.toggle('rotated', !isOpen);
    });

    // SUNUCUDAN ORTAK İÇERİKLERİ ÇEK (Ankara, İstanbul vb. her yerden ortak görünür)
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
            if (filterType === 'posts') {
                filtered = allContents.filter(c => c.type === 'post');
            } else if (filterType === 'videos') {
                filtered = allContents.filter(c => c.type === 'video');
            }

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

                let mediaHTML = '';
                if (item.type === 'video') {
                    const coverImage = item.thumbnailUrl || item.fileUrl; 
                    mediaHTML = `
                        <div class="yt-thumbnail-wrapper">
                            <img src="${coverImage}" alt="Thumbnail" class="yt-thumbnail-img">
                            <span class="video-duration-badge">${item.duration || '0:00'}</span>
                        </div>
                    `;
                } else {
                    mediaHTML = `
                        <div class="yt-thumbnail-wrapper">
                            <img src="${item.fileUrl}" alt="Post Image" class="yt-post-image">
                        </div>
                    `;
                }

                const avatarHTML = item.authorAvatar 
                    ? `<img src="${item.authorAvatar}">` 
                    : item.authorName.charAt(0).toUpperCase();

                const uniqueViewsCount = item.viewedUsers ? item.viewedUsers.length : (item.views || 1);

                card.innerHTML = `
                    ${mediaHTML}
                    <div class="yt-video-details">
                        <div class="yt-channel-avatar" style="background-color: ${item.authorBg || '#a855f7'};">
                            ${avatarHTML}
                        </div>
                        <div class="yt-meta-info">
                            <h4 class="yt-video-title">${escapeHtml(item.title)}</h4>
                            <span class="yt-channel-name">${escapeHtml(item.authorName)}</span>
                            <span class="yt-video-stats">${uniqueViewsCount} views • ${timeAgo(item.id)}</span>
                        </div>
                    </div>
                `;

                card.addEventListener('click', () => {
                    if (item.type === 'video') openWatchPage(item);
                });

                feedGrid.appendChild(card);
            });
        } catch (err) {
            console.error("Feed yüklenemedi:", err);
        }
    }

    async function loadChannelPage() {
        if (!isLoggedIn || !currentUserData) {
            authStepLogin.style.display = 'block';
            authStepProfile.style.display = 'none';
            authModal.classList.add('active');
            return;
        }
        triggerLoadingBar();
        homeView.style.display = 'none';
        watchView.style.display = 'none';
        channelView.style.display = 'block';
        if (mainVideoPlayer) mainVideoPlayer.pause();

        try {
            const res = await fetch('/api/contents');
            const allContents = await res.json();
            const myContents = allContents.filter(c => c.authorHandle === currentUserData.handle);
            channelGrid.innerHTML = '';

            if (myContents.length === 0) {
                emptyChannelFeed.style.display = 'block';
                return;
            }

            emptyChannelFeed.style.display = 'none';

            myContents.reverse().forEach(item => {
                const card = document.createElement('div');
                card.className = 'yt-video-card';

                const coverImage = item.thumbnailUrl || item.fileUrl;
                let mediaHTML = `
                    <div class="yt-thumbnail-wrapper">
                        <img src="${coverImage}" alt="Thumbnail" class="yt-thumbnail-img">
                        <span class="video-duration-badge">${item.duration || '0:00'}</span>
                        <button class="delete-video-btn" data-id="${item.id}" title="Delete video">
                            <svg viewBox="0 0 24 24" class="delete-icon"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                            <span>Delete</span>
                        </button>
                    </div>
                `;

                card.innerHTML = `
                    ${mediaHTML}
                    <div class="yt-video-details">
                        <div class="yt-channel-avatar" style="background-color: ${currentUserData.bgColor || '#a855f7'};">
                            ${currentUserData.avatarUrl ? `<img src="${currentUserData.avatarUrl}">` : currentUserData.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="yt-meta-info">
                            <h4 class="yt-video-title">${escapeHtml(item.title)}</h4>
                            <span class="yt-channel-name">${escapeHtml(currentUserData.name)}</span>
                            <span class="yt-video-stats">${item.viewedUsers ? item.viewedUsers.length : 1} views • ${timeAgo(item.id)}</span>
                        </div>
                    </div>
                `;

                const deleteBtn = card.querySelector('.delete-video-btn');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this content?')) {
                        deleteContent(item.id);
                    }
                });

                card.addEventListener('click', () => {
                    if (item.type === 'video') openWatchPage(item);
                });

                channelGrid.appendChild(card);
            });
        } catch (err) {
            console.error("Kanal yüklenemedi:", err);
        }
    }

    async function deleteContent(id) {
        try {
            await fetch(`/api/contents/${id}`, { method: 'DELETE' });
            loadChannelPage();
        } catch (err) {
            console.error("Silme hatası:", err);
        }
    }

    searchSubmitBtn.addEventListener('click', () => {
        loadFeed('all', searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadFeed('all', searchInput.value);
        }
    });

    function openWatchPage(item) {
        triggerLoadingBar();
        homeView.style.display = 'none';
        channelView.style.display = 'none';
        watchView.style.display = 'flex';

        mainVideoPlayer.src = item.fileUrl;
        watchTitle.textContent = item.title;
        watchChannelName.textContent = item.authorName;
        watchHandle.textContent = `@${item.authorHandle}`;
        watchViewsDate.textContent = `${item.viewedUsers ? item.viewedUsers.length : 1} views • Uploaded ${timeAgo(item.id)}`;
        watchDesc.textContent = item.description || 'No description provided.';

        if (item.authorAvatar) {
            watchAvatar.innerHTML = `<img src="${item.authorAvatar}">`;
        } else {
            watchAvatar.style.backgroundColor = item.authorBg || '#a855f7';
            watchAvatar.textContent = item.authorName.charAt(0).toUpperCase();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    homeLogoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = '';
        navItems.forEach(nav => nav.classList.remove('active'));
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
                            const email = data.email || "user@gmail.com";
                            processGoogleLoginFlow(email, data.name || 'Google User', data.picture);
                        });
                    }
                }
            });
        }
    }
    setTimeout(initGoogleAuth, 600);

    googleAuthBtn.addEventListener('click', () => {
        if (tokenClient) tokenClient.requestAccessToken({ prompt: 'select_account' });
        else processGoogleLoginFlow("google_user@gmail.com", "Google User", null);
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
        startProfileSetup(defaultName, defaultAvatar);
    }

    function startProfileSetup(defaultName, avatarUrl) {
        authStepLogin.style.display = 'none';
        authStepProfile.style.display = 'block';
        profileNameInput.value = defaultName;
        const suggestedHandle = defaultName.toLowerCase().replace(/[^a-z0-9]/g, '');
        profileHandleInput.value = suggestedHandle;
        googleDefaultAvatar = avatarUrl;
        customAvatarUrl = null;
        updateAvatarPreview(defaultName);
        validateHandle();
    }

    function updateAvatarPreview(name) {
        const initial = (name || 'U').charAt(0).toUpperCase();
        if (customAvatarUrl) avatarPreview.innerHTML = `<img src="${customAvatarUrl}">`;
        else if (googleDefaultAvatar) avatarPreview.innerHTML = `<img src="${googleDefaultAvatar}">`;
        else {
            const bg = getRandomColor(name || 'User');
            avatarPreview.style.backgroundColor = bg;
            avatarPreview.innerHTML = `<span>${initial}</span>`;
        }
    }

    profileNameInput.addEventListener('input', () => {
        if (!customAvatarUrl && !googleDefaultAvatar) updateAvatarPreview(profileNameInput.value);
    });

    selectPictureBtn.addEventListener('click', () => customAvatarInput.click());

    customAvatarInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(evt) {
                customAvatarUrl = evt.target.result;
                updateAvatarPreview(profileNameInput.value);
            };
            reader.readAsDataURL(file);
        }
    });

    profileHandleInput.addEventListener('input', validateHandle);

    function validateHandle() {
        const val = profileHandleInput.value.trim().toLowerCase();
        if (val === '') {
            handleStatusMsg.textContent = '* Handle cannot be empty';
            handleStatusMsg.className = 'handle-status-msg error';
            confirmProfileBtn.style.opacity = '0.5';
            confirmProfileBtn.style.cursor = 'not-allowed';
            return false;
        }
        const allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
        if (allChannels[currentEmail] && allChannels[currentEmail].handle === val) {
            handleStatusMsg.textContent = `✔ @${val} is available`;
            handleStatusMsg.className = 'handle-status-msg success';
            confirmProfileBtn.style.opacity = '1';
            confirmProfileBtn.style.cursor = 'pointer';
            return true;
        }
        if (takenHandles.includes(val)) {
            handleStatusMsg.textContent = `❌ @${val} is already taken.`;
            handleStatusMsg.className = 'handle-status-msg error';
            confirmProfileBtn.style.opacity = '0.5';
            confirmProfileBtn.style.cursor = 'not-allowed';
            return false;
        }
        handleStatusMsg.textContent = `✔ @${val} is available`;
        handleStatusMsg.className = 'handle-status-msg success';
        confirmProfileBtn.style.opacity = '1';
        confirmProfileBtn.style.cursor = 'pointer';
        return true;
    }

    confirmProfileBtn.addEventListener('click', () => {
        if (!validateHandle()) return;
        const name = profileNameInput.value.trim() || 'User';
        const handle = profileHandleInput.value.trim().toLowerCase();
        const avatarUrl = customAvatarUrl || googleDefaultAvatar || null;
        const bgColor = getRandomColor(name);
        const userData = { name, handle, avatarUrl, bgColor, email: currentEmail };

        let allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
        allChannels[currentEmail] = userData;
        localStorage.setItem('yt_all_channels', JSON.stringify(allChannels));
        localStorage.setItem('yt_active_email', currentEmail);

        if (!takenHandles.includes(handle)) takenHandles.push(handle);
        applyUserSession(userData);
        authModal.classList.remove('active');
    });

    userAvatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });
    document.addEventListener('click', () => profileDropdown.classList.remove('active'));
    profileDropdown.addEventListener('click', (e) => e.stopPropagation());

    menuYourChannel.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        loadChannelPage();
    });

    document.querySelector('.submenu-item[data-nav="your-channel"]').addEventListener('click', () => {
        loadChannelPage();
    });

    menuSettings.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        alert('Opening Account Settings...');
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('yt_active_email');
        isLoggedIn = false;
        currentEmail = null;
        currentUserData = null;
        profileDropdown.classList.remove('active');
        userProfile.style.display = 'none';
        openAuthBtn.style.display = 'flex';
        loadFeed('all');
    });

    openAuthBtn.addEventListener('click', () => {
        const activeEmail = localStorage.getItem('yt_active_email');
        const allChannels = JSON.parse(localStorage.getItem('yt_all_channels') || '{}');
        if (activeEmail && allChannels[activeEmail]) {
            applyUserSession(allChannels[activeEmail]);
            return;
        }
        authStepLogin.style.display = 'block';
        authStepProfile.style.display = 'none';
        authModal.classList.add('active');
    });

    if (closeAuthModalBtn) {
        closeAuthModalBtn.addEventListener('click', () => authModal.classList.remove('active'));
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageTarget = item.dataset.nav;
            if (pageTarget === 'upload') {
                if (!isLoggedIn) {
                    authStepLogin.style.display = 'block';
                    authStepProfile.style.display = 'none';
                    authModal.classList.add('active');
                    return;
                }
                resetWizard();
                selectedType = 'video';
                typeCards.forEach(c => c.classList.remove('selected'));
                document.querySelector('.type-card[data-type="video"]').classList.add('selected');
                createModal.classList.add('active');
                return;
            }
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            searchInput.value = '';
            if (pageTarget === 'home') loadFeed('all');
            if (pageTarget === 'posts') loadFeed('posts');
        });
    });

    createBtn.addEventListener('click', () => {
        if (!isLoggedIn) {
            authStepLogin.style.display = 'block';
            authStepProfile.style.display = 'none';
            authModal.classList.add('active');
            return;
        }
        resetWizard();
        createModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => createModal.classList.remove('active'));
    createModal.addEventListener('click', (e) => {
        if (e.target === createModal) createModal.classList.remove('active');
    });

    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.dataset.type;

            if (selectedType === 'video') {
                uploadText.textContent = "Select Video File to Upload";
                uploadHint.textContent = "MP4, WEBM or MOV format (Single file)";
                fileInput.accept = "video/*";
                step2Desc.textContent = "Drag and drop your video file or click to browse:";
                thumbnailGroup.style.display = 'block';
                audienceGroupContainer.style.display = 'block';
                sumAudienceRow.style.display = 'flex';
            } else {
                uploadText.textContent = "Select Image for Post";
                uploadHint.textContent = "JPG, PNG or JPEG format (Single file)";
                fileInput.accept = "image/jpeg, image/png, image/jpg";
                step2Desc.textContent = "Drag and drop your image file or click to browse:";
                thumbnailGroup.style.display = 'none';
                audienceGroupContainer.style.display = 'none';
                sumAudienceRow.style.display = 'none';
            }
            selectedFile = null;
            selectedThumbnailFile = null;
            chosenThumbnailUrl = null;
            fileInput.value = '';
            thumbnailInput.value = '';
            thumbFileName.textContent = 'No custom thumbnail selected';
            autoThumbnailsContainer.style.display = 'none';
            fileInfoBox.style.display = 'none';
            clearErrors();
            validateCurrentStep();
        });
    });

    selectFileBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = selectedFile.name;
            fileInfoBox.style.display = 'block';
            fileErrorMsg.classList.remove('active');
            dropzone.style.borderColor = '#444';

            if (selectedType === 'video') {
                generateAutoThumbnails(selectedFile);
            }
        } else {
            selectedFile = null;
            fileInfoBox.style.display = 'none';
        }
        validateCurrentStep();
    });

    selectThumbBtn.addEventListener('click', () => thumbnailInput.click());
    
    thumbnailInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedThumbnailFile = e.target.files[0];
            thumbFileName.textContent = selectedThumbnailFile.name;
            const reader = new FileReader();
            reader.onload = function(evt) {
                chosenThumbnailUrl = evt.target.result;
            };
            reader.readAsDataURL(selectedThumbnailFile);
        } else {
            selectedThumbnailFile = null;
            thumbFileName.textContent = 'No custom thumbnail selected';
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

            const timeStamps = [
                tempVid.duration * 0.1,
                tempVid.duration * 0.3,
                tempVid.duration * 0.5,
                tempVid.duration * 0.7
            ];

            autoThumbGrid.innerHTML = '';
            let generatedCount = 0;

            timeStamps.forEach((t, index) => {
                tempVid.currentTime = Math.max(0.1, t);
                tempVid.onseeked = function() {
                    ctx.drawImage(tempVid, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg');

                    const thumbOption = document.createElement('div');
                    thumbOption.className = 'auto-thumb-option' + (index === 0 ? ' selected' : '');
                    thumbOption.innerHTML = `<img src="${dataUrl}">`;

                    if (index === 0 && !chosenThumbnailUrl) {
                        chosenThumbnailUrl = dataUrl;
                    }

                    thumbOption.addEventListener('click', () => {
                        document.querySelectorAll('.auto-thumb-option').forEach(opt => opt.classList.remove('selected'));
                        thumbOption.classList.add('selected');
                        chosenThumbnailUrl = dataUrl;
                        selectedThumbnailFile = null;
                        thumbFileName.textContent = 'Auto thumbnail selected';
                    });

                    autoThumbGrid.appendChild(thumbOption);
                    generatedCount++;
                    if (generatedCount === timeStamps.length) {
                        autoThumbnailsContainer.style.display = 'block';
                    }
                };
            });
        };
    }

    contentTitleInput.addEventListener('input', () => {
        if (contentTitleInput.value.trim() !== '') {
            contentTitleInput.style.borderColor = '#383838';
            titleErrorMsg.classList.remove('active');
        }
        validateCurrentStep();
    });

    // SUNUCUYA FORM VERİSİ OLARAK GÖNDERME (Global Feed için)
    nextStepBtn.addEventListener('click', async () => {
        if (!validateCurrentStep(true)) return;

        if (currentStep < 4) {
            currentStep++;
            updateWizardState();
        } else {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', contentTitleInput.value.trim());
            formData.append('description', contentDescInput.value.trim());
            formData.append('type', selectedType);
            formData.append('duration', formatDuration(videoDurationSeconds));
            formData.append('authorName', currentUserData.name);
            formData.append('authorHandle', currentUserData.handle);
            formData.append('authorAvatar', currentUserData.avatarUrl || '');
            formData.append('authorBg', currentUserData.bgColor);
            formData.append('authorEmail', currentEmail);

            nextStepBtn.textContent = 'Publishing...';
            nextStepBtn.disabled = true;

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    createModal.classList.remove('active');
                    searchInput.value = '';
                    loadFeed('all');
                    alert('Content successfully published globally!');
                } else {
                    alert('Upload failed la!');
                }
            } catch (err) {
                console.error("Upload error:", err);
            } finally {
                nextStepBtn.textContent = 'Publish';
                nextStepBtn.disabled = false;
            }
        }
    });

    prevStepBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateWizardState();
        }
    });

    function clearErrors() {
        fileErrorMsg.classList.remove('active');
        titleErrorMsg.classList.remove('active');
        dropzone.style.borderColor = '#444';
        contentTitleInput.style.borderColor = '#383838';
    }

    function validateCurrentStep(showWarning = false) {
        let isValid = true;
        if (currentStep === 2) {
            if (!selectedFile) {
                isValid = false;
                if (showWarning) {
                    fileErrorMsg.classList.add('active');
                    dropzone.style.borderColor = '#ff4e4e';
                }
            } else {
                fileErrorMsg.classList.remove('active');
                dropzone.style.borderColor = '#444';
            }
        } else if (currentStep === 3) {
            if (contentTitleInput.value.trim() === '') {
                isValid = false;
                if (showWarning) {
                    titleErrorMsg.classList.add('active');
                    contentTitleInput.style.borderColor = '#ff4e4e';
                    contentTitleInput.focus();
                }
            } else {
                titleErrorMsg.classList.remove('active');
                contentTitleInput.style.borderColor = '#383838';
            }
        }

        if (!isValid) {
            nextStepBtn.style.opacity = '0.5';
            nextStepBtn.style.cursor = 'not-allowed';
        } else {
            nextStepBtn.style.opacity = '1';
            nextStepBtn.style.cursor = 'pointer';
        }
        return isValid;
    }

    function updateWizardState() {
        wizardPages.forEach((page, index) => {
            page.classList.toggle('active', index + 1 === currentStep);
        });

        stepItems.forEach((item, index) => {
            const stepNum = index + 1;
            item.classList.remove('active', 'completed');
            if (stepNum === currentStep) item.classList.add('active');
            else if (stepNum < currentStep) item.classList.add('completed');
        });

        prevStepBtn.style.display = currentStep === 1 ? 'none' : 'block';
        nextStepBtn.textContent = currentStep === 4 ? 'Publish' : 'Next';
        validateCurrentStep();

        if (currentStep === 4) {
            document.getElementById('sumType').textContent = selectedType.toUpperCase();
            document.getElementById('sumFile').textContent = selectedFile ? selectedFile.name : 'No file chosen';
            document.getElementById('sumTitle').textContent = contentTitleInput.value || 'Untitled';
            
            if (selectedType === 'video') {
                const isKids = document.querySelector('input[name="audience"]:checked').value === 'yes';
                document.getElementById('sumAudience').textContent = isKids ? 'Yes, made for kids' : 'No, not for kids';
            }
        }
    }

    function resetWizard() {
        currentStep = 1;
        selectedFile = null;
        selectedThumbnailFile = null;
        chosenThumbnailUrl = null;
        videoDurationSeconds = 0;
        fileInput.value = '';
        thumbnailInput.value = '';
        thumbFileName.textContent = 'No custom thumbnail selected';
        autoThumbnailsContainer.style.display = 'none';
        fileInfoBox.style.display = 'none';
        contentTitleInput.value = '';
        contentDescInput.value = '';
        clearErrors();
        updateWizardState();
    }
});
