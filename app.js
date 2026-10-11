/**
 * ScreenCraft Studio - Main Interactive Application
 * High-performance, reactive UI updating phone mockup preview
 */

// Application Presets Configuration
const APP_CONFIGS = {
  freefire: {
    name: 'Free Fire',
    title: 'FREE FIRE',
    icon: '🔥',
    badge: 'SQUAD INVITE',
    avatar: '👑',
    defaultSender: 'SquadLeader_OP',
    defaultMessage: 'Who called you to play? 😂',
    defaultSubtext: 'Ranked Battle Royale • Squad',
    primaryBtn: 'ACCEPT',
    secondaryBtn: 'REJECT',
    themeClass: 'game-theme-freefire',
    defaultBg: 'ff-fiery',
    dim: 35,
    blur: 0,
    defaultPackageName: 'com.dts.freefireth'
  },
  pubg: {
    name: 'PUBG / BGMI',
    title: 'PUBG MOBILE',
    icon: '🪂',
    badge: 'MATCH INVITE',
    avatar: '🎖️',
    defaultSender: 'AirDrop_Hunter',
    defaultMessage: 'Squad room is open! Drop into Erangel now or lose tier rank! 🔥',
    defaultSubtext: 'Erangel • Ranked Squad TPP',
    primaryBtn: 'JOIN TEAM',
    secondaryBtn: 'DECLINE',
    themeClass: 'game-theme-pubg',
    defaultBg: 'battle-smoke',
    dim: 40,
    blur: 0,
    defaultPackageName: 'com.tencent.ig'
  },
  whatsapp: {
    name: 'WhatsApp',
    title: 'WHATSAPP',
    icon: '💬',
    badge: 'NEW MESSAGE',
    avatar: '👤',
    defaultSender: 'Mom 💖',
    defaultMessage: 'Where are you? Dinner is getting cold, come home soon!',
    defaultSubtext: 'Online • Tap to reply',
    primaryBtn: 'REPLY',
    secondaryBtn: 'DISMISS',
    themeClass: 'game-theme-whatsapp',
    defaultBg: 'dark-gaming',
    dim: 30,
    blur: 2,
    defaultPackageName: 'com.whatsapp'
  },
  discord: {
    name: 'Discord',
    title: 'DISCORD',
    icon: '🎮',
    badge: 'VOICE CHANNEL',
    avatar: '🎧',
    defaultSender: 'GhostRider#404',
    defaultMessage: 'Hop on voice chat, we need a 4th player right now for tournament!',
    defaultSubtext: 'Gaming Lounge • 3 connected',
    primaryBtn: 'CONNECT',
    secondaryBtn: 'MUTE',
    themeClass: 'game-theme-discord',
    defaultBg: 'neon-cyber',
    dim: 35,
    blur: 0,
    defaultPackageName: 'com.discord'
  },
  instagram: {
    name: 'Instagram',
    title: 'INSTAGRAM',
    icon: '📸',
    badge: 'DIRECT MESSAGE',
    avatar: '✨',
    defaultSender: 'alex.gaming',
    defaultMessage: 'Sent you a reel: "When your squad leaves you 1v4 in Free Fire" 😂💀',
    defaultSubtext: 'Active 5m ago',
    primaryBtn: 'VIEW REEL',
    secondaryBtn: 'CLOSE',
    themeClass: 'game-theme-instagram',
    defaultBg: 'sunset-gradient',
    dim: 25,
    blur: 3,
    defaultPackageName: 'com.instagram.android'
  },
  custom: {
    name: 'Custom App',
    title: 'CUSTOM APP',
    icon: '⚙️',
    badge: 'NOTIFICATION',
    avatar: '⚡',
    defaultSender: 'CustomSender',
    defaultMessage: 'Custom in-game alert message goes here.',
    defaultSubtext: 'In-app alert prompt',
    primaryBtn: 'CONFIRM',
    secondaryBtn: 'CANCEL',
    themeClass: 'game-theme-custom',
    defaultBg: 'dark-gaming',
    dim: 30,
    blur: 0,
    defaultPackageName: 'com.custom.app'
  }
};

// Current Studio State
const state = {
  selectedApp: 'freefire',
  layoutMode: 'game-dialog', // 'game-dialog' or 'notification' or 'banner'
  senderName: 'SquadLeader_OP',
  messageText: 'Who called you to play? 😂',
  subtext: 'Ranked Battle Royale • Squad',
  timeText: '09:41',
  primaryBtnText: 'ACCEPT',
  secondaryBtnText: 'REJECT',
  wallpaperType: 'preset', // 'preset' or 'custom'
  presetWallpaper: 'ff-fiery',
  customWallpaperData: null,
  customFileName: '',
  bgBrightness: 100,
  bgDim: 35,
  bgBlur: 0,
  phoneModel: 'dynamic-island',
  phoneColor: 'dark-titanium',
  showStatusBar: true,
  showHomeBar: true,
  showWatermark: true,
  customAppTitle: 'Custom Game',
  appIdentifier: 'com.dts.freefireth'
};

// DOM Element References
const elements = {
  // Navigation & Preset Strip
  quickResetBtn: document.getElementById('quick-reset-btn'),
  downloadScreenBtn: document.getElementById('download-screen-btn'),
  exportBtnPreview: document.getElementById('export-btn-preview'),
  copyPreviewTextBtn: document.getElementById('copy-preview-text'),
  presetPills: document.querySelectorAll('.preset-pill'),

  // Step 1: Apps
  appCards: document.querySelectorAll('.app-card'),
  customAppSettings: document.getElementById('custom-app-settings'),
  customAppTitleInput: document.getElementById('custom-app-title'),
  appIdentifierInput: document.getElementById('app-identifier'),

  // Step 2: Screen Mode
  layoutRadios: document.querySelectorAll('input[name="layout-mode"]'),

  // Step 3: Message & Buttons Inputs
  senderInput: document.getElementById('sender-name'),
  messageInput: document.getElementById('message-text'),
  subtextInput: document.getElementById('status-subtext'),
  timeInput: document.getElementById('time-text'),
  primaryBtnInput: document.getElementById('primary-btn-label'),
  secondaryBtnInput: document.getElementById('secondary-btn-label'),
  dialogButtonsRow: document.getElementById('dialog-buttons-row'),
  emojiButtons: document.querySelectorAll('.emoji-btn'),

  // Step 4: Wallpaper, Buttons & Sliders
  uploadTriggerBtn: document.getElementById('upload-trigger-btn'),
  resetWallpaperBtn: document.getElementById('reset-wallpaper-btn'),
  wallpaperUploadInput: document.getElementById('wallpaper-upload'),
  dropzone: document.getElementById('dropzone'),
  dropzoneEmptyState: document.getElementById('dropzone-empty-state'),
  uploadStatusChip: document.getElementById('upload-status'),
  uploadPreviewThumb: document.getElementById('upload-preview-thumb'),
  uploadedFileName: document.getElementById('uploaded-file-name'),
  removeCustomImgBtn: document.getElementById('remove-custom-img'),
  wallpaperThumbs: document.querySelectorAll('.wallpaper-thumb'),
  brightnessSlider: document.getElementById('bg-brightness'),
  brightnessValLabel: document.getElementById('brightness-val'),
  dimSlider: document.getElementById('bg-dim'),
  dimValLabel: document.getElementById('dim-val'),
  blurSlider: document.getElementById('bg-blur'),
  blurValLabel: document.getElementById('blur-val'),

  // Step 5: Phone Frame & Toggles
  phoneModelSelect: document.getElementById('phone-model'),
  phoneColorSelect: document.getElementById('phone-color'),
  showStatusBarToggle: document.getElementById('show-status-bar'),
  showHomeBarToggle: document.getElementById('show-home-bar'),
  showWatermarkToggle: document.getElementById('show-watermark'),

  // Live Preview Elements
  phoneMockup: document.getElementById('phone-mockup'),
  phoneScreen: document.getElementById('phone-screen'),
  screenWallpaper: document.getElementById('screen-wallpaper'),
  screenDim: document.getElementById('screen-dim'),
  statusBarElem: document.getElementById('status-bar-elem'),
  statusTimeDisplay: document.getElementById('status-time-display'),
  phoneNotch: document.getElementById('phone-notch'),
  
  // Dialog Mockup Elements
  dialogElement: document.getElementById('dialog-element'),
  dialogAppIcon: document.getElementById('dialog-app-icon'),
  dialogAppTitle: document.getElementById('dialog-app-title'),
  dialogBadgeText: document.getElementById('dialog-badge-text'),
  dialogAvatar: document.getElementById('dialog-avatar'),
  previewSender: document.getElementById('preview-sender'),
  previewSubtext: document.getElementById('preview-subtext'),
  previewMessage: document.getElementById('preview-message'),
  previewBtnPrimary: document.getElementById('preview-btn-primary'),
  previewBtnSecondary: document.getElementById('preview-btn-secondary'),
  previewButtonsContainer: document.getElementById('preview-buttons-container'),

  // Notification Mockup Elements
  notificationElement: document.getElementById('notification-element'),
  notifIcon: document.getElementById('notif-icon'),
  notifAppName: document.getElementById('notif-app-name'),
  notifSender: document.getElementById('notif-sender'),
  notifMessage: document.getElementById('notif-message'),

  // Watermark & Home Indicator
  previewWatermark: document.getElementById('preview-watermark'),
  homeIndicator: document.getElementById('home-indicator'),

  // Toast
  toast: document.getElementById('toast'),
  toastText: document.getElementById('toast-text'),

  // Export Canvas
  exportCanvas: document.getElementById('export-canvas'),

  // My App Screens Elements
  navScreensCount: document.getElementById('nav-screens-count'),
  headerSaveScreenBtn: document.getElementById('header-save-screen-btn'),
  saveScreenPreviewBtn: document.getElementById('save-screen-preview-btn'),
  screensTotalPill: document.getElementById('screens-total-pill'),
  addStarterScreensBtn: document.getElementById('add-starter-screens-btn'),
  saveCurrentScreenTriggerBtn: document.getElementById('save-current-screen-trigger-btn'),
  clearAllScreensBtn: document.getElementById('clear-all-screens-btn'),
  screensSearchInput: document.getElementById('screens-search-input'),
  filterChips: document.querySelectorAll('.filter-chip'),
  savedScreensGrid: document.getElementById('saved-screens-grid'),
  screensEmptyState: document.getElementById('screens-empty-state'),
  emptySaveBtn: document.getElementById('empty-save-btn'),
  emptyDemoBtn: document.getElementById('empty-demo-btn'),

  // Modal Elements
  screenModal: document.getElementById('screen-modal'),
  modalHeading: document.getElementById('modal-heading'),
  modalSubtitle: document.getElementById('modal-subtitle'),
  modalIcon: document.getElementById('modal-icon'),
  screenTitleInput: document.getElementById('screen-title-input'),
  modalAppIdentifierInput: document.getElementById('modal-app-identifier-input'),
  modalSummaryCard: document.getElementById('modal-summary-card'),
  editingScreenId: document.getElementById('editing-screen-id'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCancelBtn: document.getElementById('modal-cancel-btn'),
  modalSaveBtn: document.getElementById('modal-save-btn'),
  modalSaveBtnText: document.getElementById('modal-save-btn-text')
};

// Initialize Application
function initApp() {
  bindEvents();
  bindMyScreensEvents();
  applyStateToUI();
  updateLivePreview();
  renderSavedScreens();
}

// Bind all interactive event listeners
function bindEvents() {
  // --- Hamburger Mobile Menu ---
  const hamburgerBtn = document.getElementById('nav-hamburger');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navbar) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navbar.classList.toggle('nav-open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when a nav link is clicked
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('nav-open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Close when clicking outside the navbar
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navbar.classList.remove('nav-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('nav-open')) {
        navbar.classList.remove('nav-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // App Selection Cards
  elements.appCards.forEach(card => {
    card.addEventListener('click', () => {
      const appKey = card.getAttribute('data-app');
      selectApp(appKey);
    });
  });


  // Custom App Title Input
  elements.customAppTitleInput.addEventListener('input', (e) => {
    state.customAppTitle = e.target.value.trim() || 'CUSTOM APP';
    updateLivePreview();
  });

  // App Identifier / Package Name Input
  if (elements.appIdentifierInput) {
    elements.appIdentifierInput.addEventListener('input', (e) => {
      state.appIdentifier = e.target.value.trim();
    });
  }

  // Screen Layout Mode Radios
  elements.layoutRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.layoutMode = e.target.value;
      // Show/hide button labels input if layout mode changes
      if (state.layoutMode === 'game-dialog') {
        elements.dialogButtonsRow.classList.remove('hidden');
      } else {
        elements.dialogButtonsRow.classList.add('hidden');
      }
      updateLivePreview();
    });
  });

  // Content Inputs
  elements.senderInput.addEventListener('input', (e) => {
    state.senderName = e.target.value;
    updateLivePreview();
  });

  elements.messageInput.addEventListener('input', (e) => {
    state.messageText = e.target.value;
    updateLivePreview();
  });

  elements.subtextInput.addEventListener('input', (e) => {
    state.subtext = e.target.value;
    updateLivePreview();
  });

  elements.timeInput.addEventListener('input', (e) => {
    state.timeText = e.target.value || '09:41';
    updateLivePreview();
  });

  elements.primaryBtnInput.addEventListener('input', (e) => {
    state.primaryBtnText = e.target.value;
    updateLivePreview();
  });

  elements.secondaryBtnInput.addEventListener('input', (e) => {
    state.secondaryBtnText = e.target.value;
    updateLivePreview();
  });

  // Quick Emojis
  elements.emojiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.innerText;
      elements.messageInput.value += ` ${emoji}`;
      state.messageText = elements.messageInput.value;
      updateLivePreview();
      elements.messageInput.focus();
    });
  });

  // Preset strip buttons
  elements.presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const presetKey = pill.getAttribute('data-preset');
      elements.presetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectApp(presetKey);
    });
  });

  // Prominent Upload Button Click
  if (elements.uploadTriggerBtn) {
    elements.uploadTriggerBtn.addEventListener('click', () => {
      elements.wallpaperUploadInput.click();
    });
  }

  // Reset Wallpaper Button Click
  if (elements.resetWallpaperBtn) {
    elements.resetWallpaperBtn.addEventListener('click', resetWallpaperToDefault);
  }

  // Wallpaper Upload Handling
  elements.wallpaperUploadInput.addEventListener('change', handleFileUpload);

  // Drag and drop for dropzone
  ['dragenter', 'dragover'].forEach(evtName => {
    elements.dropzone.addEventListener(evtName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      elements.dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(evtName => {
    elements.dropzone.addEventListener(evtName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      elements.dropzone.classList.remove('dragover');
    });
  });

  elements.dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  });

  // Clicking dropzone triggers file picker if not clicking remove button
  elements.dropzone.addEventListener('click', (e) => {
    if (e.target.closest('#remove-custom-img')) return;
    elements.wallpaperUploadInput.click();
  });

  // Remove custom uploaded image
  elements.removeCustomImgBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetWallpaperToDefault();
  });

  // Preset Wallpapers Picker
  elements.wallpaperThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const bgId = thumb.getAttribute('data-bg');
      elements.wallpaperThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      state.wallpaperType = 'preset';
      state.presetWallpaper = bgId;
      state.customWallpaperData = null;
      state.customFileName = '';
      if (elements.uploadStatusChip) elements.uploadStatusChip.classList.add('hidden');
      if (elements.dropzoneEmptyState) elements.dropzoneEmptyState.classList.remove('hidden');
      elements.wallpaperUploadInput.value = '';
      updateLivePreview();
      showToast('Switched to preset wallpaper!');
    });
  });

  // Brightness Slider
  if (elements.brightnessSlider) {
    elements.brightnessSlider.addEventListener('input', (e) => {
      state.bgBrightness = parseInt(e.target.value, 10);
      elements.brightnessValLabel.innerText = `${state.bgBrightness}%`;
      updateLivePreview();
    });
  }

  // Sliders
  elements.dimSlider.addEventListener('input', (e) => {
    state.bgDim = parseInt(e.target.value, 10);
    elements.dimValLabel.innerText = `${state.bgDim}%`;
    updateLivePreview();
  });

  elements.blurSlider.addEventListener('input', (e) => {
    state.bgBlur = parseInt(e.target.value, 10);
    elements.blurValLabel.innerText = `${state.bgBlur}px`;
    updateLivePreview();
  });

  // Phone Frame & Device Styling
  elements.phoneModelSelect.addEventListener('change', (e) => {
    state.phoneModel = e.target.value;
    updateLivePreview();
  });

  elements.phoneColorSelect.addEventListener('change', (e) => {
    state.phoneColor = e.target.value;
    updateLivePreview();
  });

  // Toggles
  elements.showStatusBarToggle.addEventListener('change', (e) => {
    state.showStatusBar = e.target.checked;
    updateLivePreview();
  });

  elements.showHomeBarToggle.addEventListener('change', (e) => {
    state.showHomeBar = e.target.checked;
    updateLivePreview();
  });

  elements.showWatermarkToggle.addEventListener('change', (e) => {
    state.showWatermark = e.target.checked;
    updateLivePreview();
  });

  // Reset Button - full reset of all controls to defaults
  elements.quickResetBtn.addEventListener('click', () => {
    // Reset layout mode
    state.layoutMode = 'game-dialog';
    elements.layoutRadios.forEach(r => { r.checked = r.value === 'game-dialog'; });
    elements.dialogButtonsRow.classList.remove('hidden');

    // Reset phone frame options
    state.phoneModel = 'dynamic-island';
    state.phoneColor = 'dark-titanium';
    elements.phoneModelSelect.value = 'dynamic-island';
    elements.phoneColorSelect.value = 'dark-titanium';

    // Reset toggles
    state.showStatusBar = true;
    state.showHomeBar = true;
    state.showWatermark = true;
    elements.showStatusBarToggle.checked = true;
    elements.showHomeBarToggle.checked = true;
    elements.showWatermarkToggle.checked = true;

    // Reset time
    state.timeText = '09:41';
    elements.timeInput.value = '09:41';

    // Reset brightness
    state.bgBrightness = 100;
    if (elements.brightnessSlider) {
      elements.brightnessSlider.value = 100;
      elements.brightnessValLabel.innerText = '100%';
    }

    // Reset custom wallpaper if any
    state.wallpaperType = 'preset';
    state.customWallpaperData = null;
    state.customFileName = '';
    elements.wallpaperUploadInput.value = '';
    if (elements.uploadStatusChip) elements.uploadStatusChip.classList.add('hidden');
    if (elements.dropzoneEmptyState) elements.dropzoneEmptyState.classList.remove('hidden');

    // Finally select freefire preset (handles message/wallpaper/dim/blur fields)
    selectApp('freefire');
    showToast('Reset to default Free Fire screen!');
  });

  // Copy Preview Text
  elements.copyPreviewTextBtn.addEventListener('click', () => {
    const textToCopy = `[${state.senderName}]: "${state.messageText}"`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('Copied preview message to clipboard!');
    }).catch(() => {
      showToast('Text ready to copy!');
    });
  });

  // Export Buttons
  elements.downloadScreenBtn.addEventListener('click', exportHighResSnapshot);
  elements.exportBtnPreview.addEventListener('click', exportHighResSnapshot);
}

// Select an App and update input fields
function selectApp(appKey) {
  if (!APP_CONFIGS[appKey]) return;
  const cfg = APP_CONFIGS[appKey];
  state.selectedApp = appKey;

  // Toggle active app card
  elements.appCards.forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-app') === appKey);
  });

  // Toggle active preset pill if matched
  elements.presetPills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-preset') === appKey);
  });

  // Toggle custom app title input
  if (appKey === 'custom') {
    elements.customAppSettings.classList.remove('hidden');
  } else {
    elements.customAppSettings.classList.add('hidden');
  }

  // Pre-fill inputs with selected app defaults
  elements.senderInput.value = cfg.defaultSender;
  state.senderName = cfg.defaultSender;

  elements.messageInput.value = cfg.defaultMessage;
  state.messageText = cfg.defaultMessage;

  elements.subtextInput.value = cfg.defaultSubtext;
  state.subtext = cfg.defaultSubtext;

  elements.primaryBtnInput.value = cfg.primaryBtn;
  state.primaryBtnText = cfg.primaryBtn;

  elements.secondaryBtnInput.value = cfg.secondaryBtn;
  state.secondaryBtnText = cfg.secondaryBtn;

  // Set default package name for app
  if (cfg.defaultPackageName) {
    state.appIdentifier = cfg.defaultPackageName;
    if (elements.appIdentifierInput) {
      elements.appIdentifierInput.value = cfg.defaultPackageName;
    }
  }

  // Set default wallpaper for app if no custom uploaded
  if (state.wallpaperType === 'preset') {
    state.presetWallpaper = cfg.defaultBg;
    elements.wallpaperThumbs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-bg') === cfg.defaultBg);
    });
  }

  state.bgDim = cfg.dim;
  elements.dimSlider.value = cfg.dim;
  elements.dimValLabel.innerText = `${cfg.dim}%`;

  state.bgBlur = cfg.blur;
  elements.blurSlider.value = cfg.blur;
  elements.blurValLabel.innerText = `${cfg.blur}px`;

  updateLivePreview();
}

// Handle Custom Wallpaper Upload via File Input
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) {
    processImageFile(file);
  }
}

// Read Image File and Convert to Data URL (No backend required)
function processImageFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload a valid image file (PNG, JPG, JPEG, WebP, GIF).');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    state.customWallpaperData = event.target.result;
    state.customFileName = file.name;
    state.wallpaperType = 'custom';

    if (elements.uploadPreviewThumb) {
      elements.uploadPreviewThumb.src = state.customWallpaperData;
    }
    if (elements.uploadedFileName) {
      elements.uploadedFileName.innerText = file.name;
    }
    if (elements.uploadStatusChip) {
      elements.uploadStatusChip.classList.remove('hidden');
    }
    if (elements.dropzoneEmptyState) {
      elements.dropzoneEmptyState.classList.add('hidden');
    }
    elements.wallpaperThumbs.forEach(t => t.classList.remove('active'));

    // Immediately display as phone preview background
    updateLivePreview();
    showToast('Custom wallpaper applied immediately!');
  };
  reader.readAsDataURL(file);
}

// Reset Wallpaper to Default Theme
function resetWallpaperToDefault() {
  const cfg = APP_CONFIGS[state.selectedApp];
  state.wallpaperType = 'preset';
  state.presetWallpaper = cfg.defaultBg;
  state.customWallpaperData = null;
  state.customFileName = '';
  state.bgBrightness = 100;
  state.bgBlur = cfg.blur;
  state.bgDim = cfg.dim;

  if (elements.brightnessSlider) {
    elements.brightnessSlider.value = 100;
    elements.brightnessValLabel.innerText = '100%';
  }
  if (elements.blurSlider) {
    elements.blurSlider.value = cfg.blur;
    elements.blurValLabel.innerText = `${cfg.blur}px`;
  }
  if (elements.dimSlider) {
    elements.dimSlider.value = cfg.dim;
    elements.dimValLabel.innerText = `${cfg.dim}%`;
  }

  elements.wallpaperUploadInput.value = '';
  if (elements.uploadStatusChip) elements.uploadStatusChip.classList.add('hidden');
  if (elements.dropzoneEmptyState) elements.dropzoneEmptyState.classList.remove('hidden');

  elements.wallpaperThumbs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-bg') === cfg.defaultBg);
  });

  updateLivePreview();
  showToast('Wallpaper reset to default!');
}

// Apply State to UI controls
function applyStateToUI() {
  // 1. Content Inputs
  if (elements.senderInput) elements.senderInput.value = state.senderName || '';
  if (elements.messageInput) elements.messageInput.value = state.messageText || '';
  if (elements.subtextInput) elements.subtextInput.value = state.subtext || '';
  if (elements.timeInput) elements.timeInput.value = state.timeText || '09:41';
  if (elements.primaryBtnInput) elements.primaryBtnInput.value = state.primaryBtnText || 'ACCEPT';
  if (elements.secondaryBtnInput) elements.secondaryBtnInput.value = state.secondaryBtnText || 'REJECT';
  if (elements.customAppTitleInput) elements.customAppTitleInput.value = state.customAppTitle || 'Custom Game';
  if (elements.appIdentifierInput) elements.appIdentifierInput.value = state.appIdentifier || (APP_CONFIGS[state.selectedApp] ? APP_CONFIGS[state.selectedApp].defaultPackageName : 'com.custom.app');

  // 2. App Cards & Preset Pills
  elements.appCards.forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-app') === state.selectedApp);
  });
  elements.presetPills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-preset') === state.selectedApp);
  });
  if (elements.customAppSettings) {
    elements.customAppSettings.classList.toggle('hidden', state.selectedApp !== 'custom');
  }

  // 3. Layout Mode
  elements.layoutRadios.forEach(radio => {
    radio.checked = radio.value === state.layoutMode;
  });
  if (elements.dialogButtonsRow) {
    if (state.layoutMode === 'game-dialog') {
      elements.dialogButtonsRow.classList.remove('hidden');
    } else {
      elements.dialogButtonsRow.classList.add('hidden');
    }
  }

  // 4. Wallpaper & Sliders
  if (elements.brightnessSlider) {
    elements.brightnessSlider.value = state.bgBrightness ?? 100;
    if (elements.brightnessValLabel) elements.brightnessValLabel.innerText = `${state.bgBrightness ?? 100}%`;
  }
  if (elements.dimSlider) {
    elements.dimSlider.value = state.bgDim ?? 35;
    if (elements.dimValLabel) elements.dimValLabel.innerText = `${state.bgDim ?? 35}%`;
  }
  if (elements.blurSlider) {
    elements.blurSlider.value = state.bgBlur ?? 0;
    if (elements.blurValLabel) elements.blurValLabel.innerText = `${state.bgBlur ?? 0}px`;
  }

  if (state.wallpaperType === 'custom' && state.customWallpaperData) {
    if (elements.uploadPreviewThumb) elements.uploadPreviewThumb.src = state.customWallpaperData;
    if (elements.uploadedFileName) elements.uploadedFileName.innerText = state.customFileName || 'custom_wallpaper.jpg';
    if (elements.uploadStatusChip) elements.uploadStatusChip.classList.remove('hidden');
    if (elements.dropzoneEmptyState) elements.dropzoneEmptyState.classList.add('hidden');
    elements.wallpaperThumbs.forEach(t => t.classList.remove('active'));
  } else {
    if (elements.uploadStatusChip) elements.uploadStatusChip.classList.add('hidden');
    if (elements.dropzoneEmptyState) elements.dropzoneEmptyState.classList.remove('hidden');
    if (elements.wallpaperUploadInput) elements.wallpaperUploadInput.value = '';
    elements.wallpaperThumbs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-bg') === state.presetWallpaper);
    });
  }

  // 5. Phone Model & Color & Toggles
  if (elements.phoneModelSelect) elements.phoneModelSelect.value = state.phoneModel || 'dynamic-island';
  if (elements.phoneColorSelect) elements.phoneColorSelect.value = state.phoneColor || 'dark-titanium';
  if (elements.showStatusBarToggle) elements.showStatusBarToggle.checked = Boolean(state.showStatusBar);
  if (elements.showHomeBarToggle) elements.showHomeBarToggle.checked = Boolean(state.showHomeBar);
  if (elements.showWatermarkToggle) elements.showWatermarkToggle.checked = Boolean(state.showWatermark);
}

// Update the Live Phone Preview
function updateLivePreview() {
  const cfg = APP_CONFIGS[state.selectedApp];

  // 1. Wallpaper & Visual Effects
  if (state.wallpaperType === 'custom' && state.customWallpaperData) {
    elements.screenWallpaper.className = 'screen-wallpaper';
    elements.screenWallpaper.style.backgroundImage = `url("${state.customWallpaperData}")`;
  } else {
    elements.screenWallpaper.style.backgroundImage = '';
    elements.screenWallpaper.className = `screen-wallpaper bg-${state.presetWallpaper}`;
  }

  // Combined CSS Filter for Brightness & Blur
  const blurCss = state.bgBlur > 0 ? `blur(${state.bgBlur}px)` : '';
  const brightnessCss = state.bgBrightness !== 100 ? `brightness(${state.bgBrightness}%)` : '';
  const filterVal = [brightnessCss, blurCss].filter(Boolean).join(' ') || 'none';
  elements.screenWallpaper.style.filter = filterVal;

  elements.screenDim.style.backgroundColor = `rgba(0, 0, 0, ${state.bgDim / 100})`;

  // 2. Status Bar & Time
  elements.statusTimeDisplay.innerText = state.timeText || '09:41';
  elements.statusBarElem.classList.toggle('hidden', !state.showStatusBar);
  elements.homeIndicator.classList.toggle('hidden', !state.showHomeBar);
  elements.previewWatermark.classList.toggle('hidden', !state.showWatermark);

  // 3. Notch & Phone Model
  elements.phoneNotch.className = 'phone-notch-container';
  if (state.phoneModel === 'punch-hole') {
    elements.phoneNotch.classList.add('punch-hole-notch');
  } else if (state.phoneModel === 'bezel-less') {
    elements.phoneNotch.classList.add('bezel-less-notch');
  }

  // 4. Phone Frame Color
  elements.phoneMockup.className = `phone-frame ${state.phoneColor}`;

  // 5. App Data & Text in Dialog / Notification
  const appDisplayName = state.selectedApp === 'custom' ? state.customAppTitle : cfg.title;
  const appSubtext = state.subtext || cfg.defaultSubtext;

  // Dialog Mockup
  elements.dialogAppTitle.innerText = appDisplayName;
  elements.dialogAppIcon.innerText = cfg.icon;
  elements.dialogBadgeText.innerText = cfg.badge;
  elements.dialogAvatar.innerText = cfg.avatar;

  elements.previewSender.innerText = state.senderName || 'Anonymous';
  elements.previewSubtext.innerText = appSubtext;
  elements.previewMessage.innerText = state.messageText || ' ';

  elements.previewBtnPrimary.innerText = state.primaryBtnText || 'ACCEPT';
  elements.previewBtnSecondary.innerText = state.secondaryBtnText || 'REJECT';

  // Apply Theme Class to Dialog
  elements.dialogElement.className = `dialog-mockup ${cfg.themeClass}`;

  // Notification Mockup
  elements.notifIcon.innerText = cfg.icon;
  elements.notifAppName.innerText = state.selectedApp === 'custom' ? state.customAppTitle : cfg.name;
  elements.notifSender.innerText = state.senderName || 'Anonymous';
  elements.notifMessage.innerText = state.messageText || ' ';

  // 6. Layout Mode Switcher (Game Pop-up vs Notification Banner)
  if (state.layoutMode === 'game-dialog') {
    elements.dialogElement.classList.remove('hidden');
    elements.notificationElement.classList.add('hidden');
  } else if (state.layoutMode === 'notification') {
    elements.dialogElement.classList.add('hidden');
    elements.notificationElement.classList.remove('hidden');
    elements.notificationElement.style.marginTop = '2rem';
  } else if (state.layoutMode === 'banner') {
    elements.dialogElement.classList.add('hidden');
    elements.notificationElement.classList.remove('hidden');
    elements.notificationElement.style.marginTop = '-12rem';
  }
}

// Show Toast feedback message
let toastTimeout = null;
function showToast(msg) {
  elements.toastText.innerText = msg;
  // Reset animation by removing/re-adding the element from flow
  elements.toast.classList.remove('hidden');
  // Force animation retrigger by resetting animation
  elements.toast.style.animation = 'none';
  // Trigger reflow to restart animation
  void elements.toast.offsetWidth;
  elements.toast.style.animation = '';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2800);
}

// High-Res Image Snapshot Generator using HTML5 Canvas
function exportHighResSnapshot() {
  showToast('Generating high-res image...');

  const canvas = elements.exportCanvas;
  const ctx = canvas.getContext('2d');
  
  // Desired high-res phone dimension
  const width = 750;
  const height = 1500;
  canvas.width = width;
  canvas.height = height;

  // Background
  const cfg = APP_CONFIGS[state.selectedApp];

  function renderMockup() {
    // 1. Draw Phone Frame / Border
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, width, height);

    // Bezel outer
    drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 50, '#1c1c24');
    // Screen inner
    ctx.save();
    roundedClip(ctx, 55, 55, width - 110, height - 110, 42);

    // 2. Wallpaper Fill with Brightness & Blur Filters
    const filterParts = [];
    if (state.bgBrightness !== 100) filterParts.push(`brightness(${state.bgBrightness}%)`);
    if (state.bgBlur > 0) filterParts.push(`blur(${state.bgBlur * 2}px)`);
    ctx.filter = filterParts.length > 0 ? filterParts.join(' ') : 'none';

    if (state.wallpaperType === 'custom' && state.customWallpaperData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 55, 55, width - 110, height - 110);
        ctx.filter = 'none';
        finishCanvasDrawing(ctx, width, height, cfg);
      };
      img.onerror = () => {
        fallbackWallpaperGradient(ctx, width, height, state.presetWallpaper);
        ctx.filter = 'none';
        finishCanvasDrawing(ctx, width, height, cfg);
      };
      img.src = state.customWallpaperData;
      return;
    } else {
      fallbackWallpaperGradient(ctx, width, height, state.presetWallpaper);
      ctx.filter = 'none';
      finishCanvasDrawing(ctx, width, height, cfg);
    }
  }

  renderMockup();
}

function finishCanvasDrawing(ctx, width, height, cfg) {
  // Dimming overlay
  ctx.fillStyle = `rgba(0, 0, 0, ${state.bgDim / 100})`;
  ctx.fillRect(55, 55, width - 110, height - 110);

  // Status Bar
  if (state.showStatusBar) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(state.timeText || '09:41', 110, 115);

    // Battery & Signals text
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('5G  📶  🔋 85%', width - 260, 115);
  }

  // Dynamic Island Notch
  if (state.phoneModel === 'dynamic-island') {
    drawRoundedRect(ctx, width / 2 - 100, 75, 200, 45, 22, '#000000');
  } else if (state.phoneModel === 'punch-hole') {
    ctx.beginPath();
    ctx.arc(width / 2, 95, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
  }

  // Center Dialog Card
  const cardX = 100;
  const cardY = height / 2 - 200;
  const cardW = width - 200;
  const cardH = 380;

  if (state.layoutMode === 'game-dialog') {
    // Card background
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 26, 'rgba(20, 18, 16, 0.95)');

    // Banner Header
    const bannerColor = state.selectedApp === 'freefire' ? '#ff5500' :
                        state.selectedApp === 'pubg' ? '#d97706' :
                        state.selectedApp === 'whatsapp' ? '#075e54' :
                        state.selectedApp === 'discord' ? '#5865f2' :
                        state.selectedApp === 'instagram' ? '#833ab4' : '#475569';

    drawRoundedRect(ctx, cardX, cardY, cardW, 65, 26, bannerColor);
    // Flatten lower corners of header band by filling a square-cornered rect over them
    ctx.fillStyle = bannerColor;
    ctx.fillRect(cardX, cardY + 25, cardW, 40);

    // Header Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px "Rajdhani", sans-serif';
    const title = state.selectedApp === 'custom' ? state.customAppTitle : cfg.title;
    ctx.fillText(`${cfg.icon}  ${title}`, cardX + 25, cardY + 44);

    // Badge
    ctx.font = 'bold 18px "Rajdhani", sans-serif';
    ctx.fillStyle = '#ffd000';
    ctx.fillText(cfg.badge, cardX + cardW - 160, cardY + 44);

    // Sender Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Rajdhani", sans-serif';
    ctx.fillText(`${cfg.avatar}  ${state.senderName}`, cardX + 30, cardY + 125);

    // Subtext
    ctx.fillStyle = '#ffb17a';
    ctx.font = '20px sans-serif';
    ctx.fillText(state.subtext || cfg.defaultSubtext, cardX + 30, cardY + 160);

    // Message Box
    drawRoundedRect(ctx, cardX + 25, cardY + 185, cardW - 50, 95, 14, 'rgba(0, 0, 0, 0.55)');
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    wrapText(ctx, `"${state.messageText}"`, cardX + 45, cardY + 225, cardW - 90, 32);

    // Buttons
    // Reject
    drawRoundedRect(ctx, cardX + 25, cardY + 300, (cardW - 65) / 2, 55, 12, 'rgba(255, 255, 255, 0.1)');
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 22px "Rajdhani", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.secondaryBtnText || 'REJECT', cardX + 25 + (cardW - 65) / 4, cardY + 335);

    // Accept
    drawRoundedRect(ctx, cardX + 35 + (cardW - 65) / 2, cardY + 300, (cardW - 65) / 2, 55, 12, bannerColor);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(state.primaryBtnText || 'ACCEPT', cardX + 35 + (cardW - 65) / 2 + (cardW - 65) / 4, cardY + 335);
    ctx.textAlign = 'left';

  } else {
    // Notification Toast Box
    const notifY = state.layoutMode === 'banner' ? 140 : height / 2 - 120;
    drawRoundedRect(ctx, cardX, notifY, cardW, 170, 26, 'rgba(25, 30, 40, 0.9)');

    const displayName = state.selectedApp === 'custom'
      ? (state.customAppTitle || 'Custom App')
      : cfg.name;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`${cfg.icon}  ${displayName} • Now`, cardX + 30, notifY + 45);

    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(state.senderName, cardX + 30, notifY + 85);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px sans-serif';
    wrapText(ctx, state.messageText, cardX + 30, notifY + 122, cardW - 60, 28);
  }

  // Watermark
  if (state.showWatermark) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Created with ScreenCraft Studio', width / 2, height - 110);
  }

  // Home bar
  if (state.showHomeBar) {
    drawRoundedRect(ctx, width / 2 - 110, height - 85, 220, 8, 4, 'rgba(255, 255, 255, 0.8)');
  }

  ctx.restore();

  // Trigger download
  const imageURL = elements.exportCanvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.download = `screencraft-${state.selectedApp}-mockup.png`;
  downloadLink.href = imageURL;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  showToast('Image downloaded successfully! 🎉');
}

// Canvas Helpers
function drawRoundedRect(ctx, x, y, width, height, radius, fillColor) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
}

function roundedClip(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();
}

function fallbackWallpaperGradient(ctx, width, height, preset) {
  let grad;
  if (preset === 'ff-fiery') {
    grad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, 700);
    grad.addColorStop(0, '#ff4500');
    grad.addColorStop(0.5, '#7f1d1d');
    grad.addColorStop(1, '#1e0505');
  } else if (preset === 'battle-smoke') {
    grad = ctx.createRadialGradient(width / 3, height * 0.7, 50, width / 2, height / 2, 700);
    grad.addColorStop(0, '#d97706');
    grad.addColorStop(0.6, '#78350f');
    grad.addColorStop(1, '#1c1917');
  } else if (preset === 'neon-cyber') {
    grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#06b6d4');
    grad.addColorStop(0.5, '#4f46e5');
    grad.addColorStop(1, '#0f172a');
  } else if (preset === 'sunset-gradient') {
    grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#ec4899');
    grad.addColorStop(0.5, '#8b5cf6');
    grad.addColorStop(1, '#1e1b4b');
  } else {
    grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 700);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(1, '#09090b');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// ==========================================================================
// My App Screens Subsystem (Local Browser Storage & Screen Management)
// ==========================================================================

const STORAGE_KEY = 'screencraft_saved_screens';

// Sample starter presets for instant onboarding
const STARTER_PRESETS = [
  {
    id: 'starter_freefire_1',
    uniqueId: 'starter_freefire_1',
    appName: 'Free Fire',
    appIdentifier: 'com.dts.freefireth',
    packageName: 'com.dts.freefireth',
    screenTitle: 'Free Fire Squad Prank',
    title: 'Free Fire Squad Prank',
    senderName: 'SquadLeader_OP',
    message: 'Who called you to play? 😂 Hop in squad right now!',
    messageText: 'Who called you to play? 😂 Hop in squad right now!',
    displayMode: 'game-dialog',
    layoutMode: 'game-dialog',
    wallpaperInfo: {
      type: 'preset',
      presetKey: 'ff-fiery',
      presetWallpaper: 'ff-fiery',
      customData: null,
      customFileName: '',
      brightness: 100,
      dim: 35,
      blur: 0
    },
    buttonLabels: {
      primary: 'ACCEPT',
      secondary: 'REJECT',
      primaryBtnText: 'ACCEPT',
      secondaryBtnText: 'REJECT'
    },
    phoneStyle: {
      model: 'dynamic-island',
      color: 'dark-titanium',
      showStatusBar: true,
      showHomeBar: true,
      showWatermark: true
    },
    createdDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    selectedApp: 'freefire',
    customAppTitle: 'FREE FIRE',
    subtext: 'Ranked Battle Royale • Squad',
    timeText: '09:41',
    primaryBtnText: 'ACCEPT',
    secondaryBtnText: 'REJECT',
    wallpaperType: 'preset',
    presetWallpaper: 'ff-fiery',
    customWallpaperData: null,
    customFileName: '',
    bgBrightness: 100,
    bgDim: 35,
    bgBlur: 0,
    phoneModel: 'dynamic-island',
    phoneColor: 'dark-titanium',
    showStatusBar: true,
    showHomeBar: true,
    showWatermark: true
  },
  {
    id: 'starter_pubg_2',
    uniqueId: 'starter_pubg_2',
    appName: 'PUBG / BGMI',
    appIdentifier: 'com.tencent.ig',
    packageName: 'com.tencent.ig',
    screenTitle: 'PUBG Room Drop Challenge',
    title: 'PUBG Room Drop Challenge',
    senderName: 'AirDrop_Hunter',
    message: 'Squad room is open! Drop into Erangel now or lose tier rank! 🔥',
    messageText: 'Squad room is open! Drop into Erangel now or lose tier rank! 🔥',
    displayMode: 'game-dialog',
    layoutMode: 'game-dialog',
    wallpaperInfo: {
      type: 'preset',
      presetKey: 'battle-smoke',
      presetWallpaper: 'battle-smoke',
      customData: null,
      customFileName: '',
      brightness: 100,
      dim: 40,
      blur: 0
    },
    buttonLabels: {
      primary: 'JOIN TEAM',
      secondary: 'DECLINE',
      primaryBtnText: 'JOIN TEAM',
      secondaryBtnText: 'DECLINE'
    },
    phoneStyle: {
      model: 'punch-hole',
      color: 'midnight-black',
      showStatusBar: true,
      showHomeBar: true,
      showWatermark: true
    },
    createdDate: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedDate: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    selectedApp: 'pubg',
    customAppTitle: 'PUBG MOBILE',
    subtext: 'Erangel • Ranked Squad TPP',
    timeText: '18:30',
    primaryBtnText: 'JOIN TEAM',
    secondaryBtnText: 'DECLINE',
    wallpaperType: 'preset',
    presetWallpaper: 'battle-smoke',
    customWallpaperData: null,
    customFileName: '',
    bgBrightness: 100,
    bgDim: 40,
    bgBlur: 0,
    phoneModel: 'punch-hole',
    phoneColor: 'midnight-black',
    showStatusBar: true,
    showHomeBar: true,
    showWatermark: true
  },
  {
    id: 'starter_whatsapp_3',
    uniqueId: 'starter_whatsapp_3',
    appName: 'WhatsApp',
    appIdentifier: 'com.whatsapp',
    packageName: 'com.whatsapp',
    screenTitle: 'Mom Dinner Alert 💖',
    title: 'Mom Dinner Alert 💖',
    senderName: 'Mom 💖',
    message: 'Where are you? Dinner is getting cold, come home soon!',
    messageText: 'Where are you? Dinner is getting cold, come home soon!',
    displayMode: 'notification',
    layoutMode: 'notification',
    wallpaperInfo: {
      type: 'preset',
      presetKey: 'dark-gaming',
      presetWallpaper: 'dark-gaming',
      customData: null,
      customFileName: '',
      brightness: 95,
      dim: 30,
      blur: 2
    },
    buttonLabels: {
      primary: 'REPLY',
      secondary: 'DISMISS',
      primaryBtnText: 'REPLY',
      secondaryBtnText: 'DISMISS'
    },
    phoneStyle: {
      model: 'dynamic-island',
      color: 'silver-frost',
      showStatusBar: true,
      showHomeBar: true,
      showWatermark: true
    },
    createdDate: new Date(Date.now() - 7200000).toISOString(),
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedDate: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    selectedApp: 'whatsapp',
    customAppTitle: 'WHATSAPP',
    subtext: 'Online • Tap to reply',
    timeText: '20:15',
    primaryBtnText: 'REPLY',
    secondaryBtnText: 'DISMISS',
    wallpaperType: 'preset',
    presetWallpaper: 'dark-gaming',
    customWallpaperData: null,
    customFileName: '',
    bgBrightness: 95,
    bgDim: 30,
    bgBlur: 2,
    phoneModel: 'dynamic-island',
    phoneColor: 'silver-frost',
    showStatusBar: true,
    showHomeBar: true,
    showWatermark: true
  }
];

// Active filter & search query
let currentScreenFilter = 'all';
let currentSearchQuery = '';

// Local Storage Accessors
function getSavedScreens() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read saved screens:', err);
    return [];
  }
}

function setSavedScreens(screens) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(screens));
    return true;
  } catch (err) {
    console.error('Storage write error:', err);
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      showToast('Storage full! Custom wallpaper is too large for local browser storage.');
    } else {
      showToast('Failed to save screen locally.');
    }
    return false;
  }
}

// Bind My Screens interactive events
function bindMyScreensEvents() {
  // Save Triggers
  if (elements.headerSaveScreenBtn) {
    elements.headerSaveScreenBtn.addEventListener('click', () => openSaveModal());
  }
  if (elements.saveScreenPreviewBtn) {
    elements.saveScreenPreviewBtn.addEventListener('click', () => openSaveModal());
  }
  if (elements.saveCurrentScreenTriggerBtn) {
    elements.saveCurrentScreenTriggerBtn.addEventListener('click', () => openSaveModal());
  }
  if (elements.emptySaveBtn) {
    elements.emptySaveBtn.addEventListener('click', () => openSaveModal());
  }

  // Starter presets triggers
  if (elements.addStarterScreensBtn) {
    elements.addStarterScreensBtn.addEventListener('click', loadStarterPresets);
  }
  if (elements.emptyDemoBtn) {
    elements.emptyDemoBtn.addEventListener('click', loadStarterPresets);
  }

  // Clear all
  if (elements.clearAllScreensBtn) {
    elements.clearAllScreensBtn.addEventListener('click', clearAllSavedScreens);
  }

  // Search input
  if (elements.screensSearchInput) {
    elements.screensSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      renderSavedScreens();
    });
  }

  // Filter chips
  elements.filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentScreenFilter = chip.getAttribute('data-filter') || 'all';
      renderSavedScreens();
    });
  });

  // Modal interactions
  if (elements.modalCloseBtn) {
    elements.modalCloseBtn.addEventListener('click', closeSaveModal);
  }
  if (elements.modalCancelBtn) {
    elements.modalCancelBtn.addEventListener('click', closeSaveModal);
  }
  if (elements.screenModal) {
    elements.screenModal.addEventListener('click', (e) => {
      if (e.target === elements.screenModal) closeSaveModal();
    });
  }
  if (elements.modalSaveBtn) {
    elements.modalSaveBtn.addEventListener('click', handleSaveScreenSubmit);
  }
  if (elements.screenTitleInput) {
    elements.screenTitleInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSaveScreenSubmit();
      } else if (e.key === 'Escape') {
        closeSaveModal();
      }
    });
  }

  // Card Grid Event Delegation for Action Buttons
  if (elements.savedScreensGrid) {
    elements.savedScreensGrid.addEventListener('click', (e) => {
      const loadBtn = e.target.closest('.btn-card-load');
      const editBtn = e.target.closest('.btn-card-edit');
      const copyBtn = e.target.closest('.btn-card-copy');
      const delBtn = e.target.closest('.btn-card-del');

      if (loadBtn) {
        const id = loadBtn.getAttribute('data-id');
        loadScreenIntoStudio(id);
      } else if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        openSaveModal(id);
      } else if (copyBtn) {
        const id = copyBtn.getAttribute('data-id');
        duplicateScreen(id);
      } else if (delBtn) {
        const id = delBtn.getAttribute('data-id');
        deleteScreen(id);
      }
    });
  }
}

// Open Save / Edit Modal
function openSaveModal(editingId = null) {
  const cfg = APP_CONFIGS[state.selectedApp] || APP_CONFIGS.freefire;
  const appDisplayName = state.selectedApp === 'custom' ? (state.customAppTitle || 'Custom App') : cfg.name;
  const activeAppIdentifier = state.appIdentifier || (cfg ? cfg.defaultPackageName : 'com.custom.app');

  if (editingId) {
    const screens = getSavedScreens();
    const screen = screens.find(s => s.id === editingId);
    if (!screen) return;

    elements.editingScreenId.value = editingId;
    elements.modalHeading.innerText = 'Edit Screen Configuration';
    elements.modalSubtitle.innerText = 'Update title or overwrite configuration with current studio state';
    elements.modalIcon.innerText = '✏️';
    elements.screenTitleInput.value = screen.screenTitle || screen.title || '';
    if (elements.modalAppIdentifierInput) {
      elements.modalAppIdentifierInput.value = screen.appIdentifier || screen.packageName || activeAppIdentifier;
    }
    elements.modalSaveBtnText.innerText = 'Update Screen';
  } else {
    elements.editingScreenId.value = '';
    elements.modalHeading.innerText = 'Save Custom Screen';
    elements.modalSubtitle.innerText = 'Save current studio configuration to your browser library';
    elements.modalIcon.innerText = '💾';
    elements.screenTitleInput.value = `${appDisplayName} - ${state.senderName || 'My Mockup'}`;
    if (elements.modalAppIdentifierInput) {
      elements.modalAppIdentifierInput.value = activeAppIdentifier;
    }
    elements.modalSaveBtnText.innerText = 'Save Configuration';
  }

  // Build live summary card
  const wallpaperDesc = state.wallpaperType === 'custom'
    ? `🖼️ Custom Image (${state.customFileName || 'Uploaded'})`
    : `🎨 Preset: ${formatWallpaperName(state.presetWallpaper)}`;

  const modeDesc = state.layoutMode === 'game-dialog'
    ? '⚔️ Game Pop-up Dialog'
    : (state.layoutMode === 'notification' ? '🔔 Lockscreen Notification' : '📌 Top Banner');

  elements.modalSummaryCard.innerHTML = `
    <div class="modal-summary-row">
      <span class="modal-summary-label">Application:</span>
      <span class="modal-summary-val">${cfg.icon} ${appDisplayName}</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">App Identifier (Android):</span>
      <span class="modal-summary-val" style="font-family: monospace;">📦 ${escapeHtml(elements.modalAppIdentifierInput ? elements.modalAppIdentifierInput.value : activeAppIdentifier)}</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">Sender Name:</span>
      <span class="modal-summary-val">👤 ${escapeHtml(state.senderName || 'Anonymous')}</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">Message:</span>
      <span class="modal-summary-val">💬 "${escapeHtml(state.messageText || ' ')}"</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">Display Mode:</span>
      <span class="modal-summary-val">${modeDesc}</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">Wallpaper:</span>
      <span class="modal-summary-val">${wallpaperDesc}</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">Button Labels:</span>
      <span class="modal-summary-val">🔘 ${escapeHtml(state.primaryBtnText || 'ACCEPT')} / ${escapeHtml(state.secondaryBtnText || 'REJECT')}</span>
    </div>
    <div class="modal-summary-row">
      <span class="modal-summary-label">Phone Model & Style:</span>
      <span class="modal-summary-val">📱 ${formatPhoneModel(state.phoneModel)} • ${formatPhoneColor(state.phoneColor)}</span>
    </div>
  `;

  elements.screenModal.classList.remove('hidden');
  setTimeout(() => elements.screenTitleInput.focus(), 60);
}

// Close Modal
function closeSaveModal() {
  if (elements.screenModal) {
    elements.screenModal.classList.add('hidden');
  }
}

// Handle Save Screen Submit
function handleSaveScreenSubmit() {
  let title = elements.screenTitleInput.value.trim();
  const cfg = APP_CONFIGS[state.selectedApp] || APP_CONFIGS.freefire;
  const appDisplayName = state.selectedApp === 'custom' ? (state.customAppTitle || 'Custom App') : cfg.name;
  const modalAppId = elements.modalAppIdentifierInput ? elements.modalAppIdentifierInput.value.trim() : '';
  const appIdentifier = modalAppId || state.appIdentifier || (cfg ? cfg.defaultPackageName : 'com.custom.app');

  if (!title) {
    title = `${appDisplayName} Screen`;
  }

  // Update active state appIdentifier as well
  state.appIdentifier = appIdentifier;
  if (elements.appIdentifierInput) {
    elements.appIdentifierInput.value = appIdentifier;
  }

  const screens = getSavedScreens();
  const editingId = elements.editingScreenId.value;
  const nowIso = new Date().toISOString();

  let existingCreatedIso = nowIso;
  let editingScreen = null;
  if (editingId) {
    editingScreen = screens.find(s => s.id === editingId);
    if (editingScreen) {
      existingCreatedIso = editingScreen.createdDate || editingScreen.createdAt || nowIso;
    }
  }

  // Android App Readiness schema + full backward compatibility snapshot
  const currentSnapshot = {
    uniqueId: editingId || ('screen_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)),
    appName: appDisplayName,
    appIdentifier: appIdentifier,
    packageName: appIdentifier,
    screenTitle: title,
    title: title,
    senderName: state.senderName || 'SquadLeader_OP',
    message: state.messageText || '',
    messageText: state.messageText || '',
    displayMode: state.layoutMode || 'game-dialog',
    layoutMode: state.layoutMode || 'game-dialog',
    wallpaperInfo: {
      type: state.wallpaperType || 'preset',
      presetKey: state.presetWallpaper || 'ff-fiery',
      presetWallpaper: state.presetWallpaper || 'ff-fiery',
      customData: state.customWallpaperData || null,
      customFileName: state.customFileName || '',
      brightness: state.bgBrightness ?? 100,
      dim: state.bgDim ?? 35,
      blur: state.bgBlur ?? 0
    },
    buttonLabels: {
      primary: state.primaryBtnText || 'ACCEPT',
      secondary: state.secondaryBtnText || 'REJECT',
      primaryBtnText: state.primaryBtnText || 'ACCEPT',
      secondaryBtnText: state.secondaryBtnText || 'REJECT'
    },
    phoneStyle: {
      model: state.phoneModel || 'dynamic-island',
      color: state.phoneColor || 'dark-titanium',
      showStatusBar: state.showStatusBar !== false,
      showHomeBar: state.showHomeBar !== false,
      showWatermark: state.showWatermark !== false
    },
    createdDate: existingCreatedIso,
    createdAt: existingCreatedIso,
    updatedDate: nowIso,
    updatedAt: nowIso,

    // Top-level legacy fields for 1:1 backward compatibility
    selectedApp: state.selectedApp,
    customAppTitle: state.customAppTitle || 'Custom Game',
    subtext: state.subtext || '',
    timeText: state.timeText || '09:41',
    primaryBtnText: state.primaryBtnText || 'ACCEPT',
    secondaryBtnText: state.secondaryBtnText || 'REJECT',
    wallpaperType: state.wallpaperType || 'preset',
    presetWallpaper: state.presetWallpaper || 'ff-fiery',
    customWallpaperData: state.customWallpaperData,
    customFileName: state.customFileName || '',
    bgBrightness: state.bgBrightness ?? 100,
    bgDim: state.bgDim ?? 35,
    bgBlur: state.bgBlur ?? 0,
    phoneModel: state.phoneModel || 'dynamic-island',
    phoneColor: state.phoneColor || 'dark-titanium',
    showStatusBar: state.showStatusBar !== false,
    showHomeBar: state.showHomeBar !== false,
    showWatermark: state.showWatermark !== false
  };

  if (editingId) {
    const idx = screens.findIndex(s => s.id === editingId);
    if (idx !== -1) {
      screens[idx] = {
        ...screens[idx],
        ...currentSnapshot
      };
      setSavedScreens(screens);
      showToast(`Updated "${title}"! ✨`);
    }
  } else {
    const newScreen = {
      id: currentSnapshot.uniqueId,
      ...currentSnapshot
    };
    screens.unshift(newScreen);
    setSavedScreens(screens);
    showToast(`Saved "${title}" to library! 🎉`);
  }

  closeSaveModal();
  renderSavedScreens();
}

// Load a Saved Screen into the Studio
function loadScreenIntoStudio(id) {
  const screens = getSavedScreens();
  const screen = screens.find(s => s.id === id);
  if (!screen) {
    showToast('Screen configuration not found.');
    return;
  }

  const cfg = APP_CONFIGS[screen.selectedApp] || APP_CONFIGS.freefire;

  // Populate active state supporting both direct & nested readiness schemas
  state.selectedApp = screen.selectedApp || 'freefire';
  state.customAppTitle = screen.customAppTitle || screen.appName || 'Custom Game';
  state.appIdentifier = screen.appIdentifier || screen.packageName || cfg.defaultPackageName || 'com.custom.app';
  state.layoutMode = screen.layoutMode || screen.displayMode || 'game-dialog';
  state.senderName = screen.senderName || '';
  state.messageText = screen.messageText || screen.message || '';
  state.subtext = screen.subtext || '';
  state.timeText = screen.timeText || '09:41';

  // Button labels
  if (screen.buttonLabels) {
    state.primaryBtnText = screen.buttonLabels.primary || screen.buttonLabels.primaryBtnText || 'ACCEPT';
    state.secondaryBtnText = screen.buttonLabels.secondary || screen.buttonLabels.secondaryBtnText || 'REJECT';
  } else {
    state.primaryBtnText = screen.primaryBtnText || 'ACCEPT';
    state.secondaryBtnText = screen.secondaryBtnText || 'REJECT';
  }

  // Wallpaper info
  if (screen.wallpaperInfo) {
    state.wallpaperType = screen.wallpaperInfo.type || screen.wallpaperType || 'preset';
    state.presetWallpaper = screen.wallpaperInfo.presetKey || screen.wallpaperInfo.presetWallpaper || screen.presetWallpaper || 'ff-fiery';
    state.customWallpaperData = screen.wallpaperInfo.customData || screen.customWallpaperData || null;
    state.customFileName = screen.wallpaperInfo.customFileName || screen.customFileName || '';
    state.bgBrightness = screen.wallpaperInfo.brightness ?? screen.bgBrightness ?? 100;
    state.bgDim = screen.wallpaperInfo.dim ?? screen.bgDim ?? 35;
    state.bgBlur = screen.wallpaperInfo.blur ?? screen.bgBlur ?? 0;
  } else {
    state.wallpaperType = screen.wallpaperType || 'preset';
    state.presetWallpaper = screen.presetWallpaper || 'ff-fiery';
    state.customWallpaperData = screen.customWallpaperData || null;
    state.customFileName = screen.customFileName || '';
    state.bgBrightness = screen.bgBrightness ?? 100;
    state.bgDim = screen.bgDim ?? 35;
    state.bgBlur = screen.bgBlur ?? 0;
  }

  // Phone style
  if (screen.phoneStyle) {
    state.phoneModel = screen.phoneStyle.model || screen.phoneModel || 'dynamic-island';
    state.phoneColor = screen.phoneStyle.color || screen.phoneColor || 'dark-titanium';
    state.showStatusBar = screen.phoneStyle.showStatusBar !== false;
    state.showHomeBar = screen.phoneStyle.showHomeBar !== false;
    state.showWatermark = screen.phoneStyle.showWatermark !== false;
  } else {
    state.phoneModel = screen.phoneModel || 'dynamic-island';
    state.phoneColor = screen.phoneColor || 'dark-titanium';
    state.showStatusBar = screen.showStatusBar !== false;
    state.showHomeBar = screen.showHomeBar !== false;
    state.showWatermark = screen.showWatermark !== false;
  }

  // Apply to UI and live phone preview
  applyStateToUI();
  updateLivePreview();

  // Smooth scroll to studio live preview
  if (elements.phoneMockup) {
    elements.phoneMockup.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showToast(`Loaded "${screen.screenTitle || screen.title}" into studio! 🚀`);
}

// Delete Screen
function deleteScreen(id) {
  const screens = getSavedScreens();
  const screen = screens.find(s => s.id === id);
  if (!screen) return;

  const title = screen.screenTitle || screen.title || 'Screen';
  if (confirm(`Are you sure you want to delete "${title}"?`)) {
    const updated = screens.filter(s => s.id !== id);
    setSavedScreens(updated);
    renderSavedScreens();
    showToast(`Deleted "${title}". 🗑️`);
  }
}

// Duplicate Screen
function duplicateScreen(id) {
  const screens = getSavedScreens();
  const screen = screens.find(s => s.id === id);
  if (!screen) return;

  const newId = 'screen_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
  const nowIso = new Date().toISOString();
  const baseTitle = screen.screenTitle || screen.title || 'Screen';

  const clone = {
    ...screen,
    id: newId,
    uniqueId: newId,
    screenTitle: `${baseTitle} (Copy)`,
    title: `${baseTitle} (Copy)`,
    createdDate: nowIso,
    createdAt: nowIso,
    updatedDate: nowIso,
    updatedAt: nowIso
  };

  screens.unshift(clone);
  setSavedScreens(screens);
  renderSavedScreens();
  showToast(`Duplicated "${baseTitle}"! 📋`);
}

// Load Starter Presets
function loadStarterPresets() {
  const existing = getSavedScreens();
  const existingIds = new Set(existing.map(s => s.id));
  let addedCount = 0;

  STARTER_PRESETS.forEach(preset => {
    if (!existingIds.has(preset.id)) {
      existing.push({
        ...preset,
        createdAt: new Date().toISOString(),
        createdDate: new Date().toISOString()
      });
      addedCount++;
    }
  });

  setSavedScreens(existing);
  renderSavedScreens();

  if (addedCount > 0) {
    showToast(`Added ${addedCount} starter presets! ✨`);
  } else {
    showToast('Starter presets are already in your library!');
  }
}

// Clear All Saved Screens
function clearAllSavedScreens() {
  const screens = getSavedScreens();
  if (screens.length === 0) return;

  if (confirm(`Are you sure you want to delete all ${screens.length} saved screens? This cannot be undone.`)) {
    setSavedScreens([]);
    renderSavedScreens();
    showToast('Cleared all saved screens.');
  }
}

// Render Saved Screens Grid
function renderSavedScreens() {
  const allScreens = getSavedScreens();
  const totalCount = allScreens.length;

  // Update Counters
  if (elements.navScreensCount) {
    elements.navScreensCount.innerText = totalCount;
  }
  if (elements.screensTotalPill) {
    elements.screensTotalPill.innerText = `${totalCount} Screen${totalCount === 1 ? '' : 's'}`;
  }

  // Toggle empty state vs grid
  if (totalCount === 0) {
    if (elements.screensEmptyState) elements.screensEmptyState.classList.remove('hidden');
    if (elements.savedScreensGrid) elements.savedScreensGrid.classList.add('hidden');
    if (elements.clearAllScreensBtn) elements.clearAllScreensBtn.classList.add('hidden');
    return;
  }

  if (elements.screensEmptyState) elements.screensEmptyState.classList.add('hidden');
  if (elements.savedScreensGrid) elements.savedScreensGrid.classList.remove('hidden');
  if (elements.clearAllScreensBtn) elements.clearAllScreensBtn.classList.remove('hidden');

  // Filter & Search
  let filtered = allScreens;

  if (currentScreenFilter !== 'all') {
    filtered = filtered.filter(s => s.selectedApp === currentScreenFilter);
  }

  if (currentSearchQuery) {
    filtered = filtered.filter(s => {
      const q = currentSearchQuery;
      const titleMatch = (s.screenTitle || s.title || '').toLowerCase().includes(q);
      const senderMatch = (s.senderName || '').toLowerCase().includes(q);
      const msgMatch = (s.message || s.messageText || '').toLowerCase().includes(q);
      const appMatch = (s.selectedApp || s.appName || '').toLowerCase().includes(q);
      const customAppMatch = (s.customAppTitle || '').toLowerCase().includes(q);
      const idMatch = (s.appIdentifier || s.packageName || '').toLowerCase().includes(q);
      return titleMatch || senderMatch || msgMatch || appMatch || customAppMatch || idMatch;
    });
  }

  if (filtered.length === 0) {
    elements.savedScreensGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">🔍 No screens match your filter or search.</p>
        <span style="font-size: 0.85rem; color: var(--text-dim);">Try clearing search or choosing "All"</span>
      </div>
    `;
    return;
  }

  // Build Card HTML
  const cardsHtml = filtered.map(screen => {
    const cfg = APP_CONFIGS[screen.selectedApp] || APP_CONFIGS.freefire;
    const appDisplayName = screen.appName || (screen.selectedApp === 'custom' ? (screen.customAppTitle || 'Custom App') : cfg.name);
    const appPackage = screen.appIdentifier || screen.packageName || cfg.defaultPackageName || 'com.custom.app';
    const displayTitle = screen.screenTitle || screen.title || 'Untitled Screen';
    const displayMsg = screen.message || screen.messageText || '';

    const mode = screen.displayMode || screen.layoutMode || 'game-dialog';
    const modeTag = mode === 'game-dialog'
      ? '⚔️ Pop-up'
      : (mode === 'notification' ? '🔔 Lockscreen' : '📌 Banner');

    const formattedDate = formatDate(screen.updatedDate || screen.updatedAt || screen.createdDate || screen.createdAt);

    // Wallpaper info handling
    let wpType = screen.wallpaperType || 'preset';
    let wpPreset = screen.presetWallpaper || 'ff-fiery';
    let wpCustomData = screen.customWallpaperData || null;
    let wpBrightness = screen.bgBrightness ?? 100;
    let wpBlur = screen.bgBlur ?? 0;
    let wpDim = screen.bgDim ?? 35;

    if (screen.wallpaperInfo) {
      wpType = screen.wallpaperInfo.type || wpType;
      wpPreset = screen.wallpaperInfo.presetKey || screen.wallpaperInfo.presetWallpaper || wpPreset;
      wpCustomData = screen.wallpaperInfo.customData || wpCustomData;
      wpBrightness = screen.wallpaperInfo.brightness ?? wpBrightness;
      wpBlur = screen.wallpaperInfo.blur ?? wpBlur;
      wpDim = screen.wallpaperInfo.dim ?? wpDim;
    }

    // Mini preview background style
    let bgStyle = '';
    let bgClass = '';
    if (wpType === 'custom' && wpCustomData) {
      bgStyle = `background-image: url("${wpCustomData}");`;
    } else {
      bgClass = `bg-${wpPreset || 'ff-fiery'}`;
    }

    const filterParts = [];
    if (wpBrightness !== 100) filterParts.push(`brightness(${wpBrightness}%)`);
    if (wpBlur > 0) filterParts.push(`blur(${wpBlur}px)`);
    const filterStyle = filterParts.length > 0 ? `filter: ${filterParts.join(' ')};` : '';

    const dimStyle = `background-color: rgba(0, 0, 0, ${wpDim / 100});`;

    const wallpaperLabel = wpType === 'custom'
      ? '🖼️ Custom Img'
      : `🎨 ${formatWallpaperName(wpPreset)}`;

    // Button labels
    let primaryBtn = screen.primaryBtnText || 'ACCEPT';
    if (screen.buttonLabels) {
      primaryBtn = screen.buttonLabels.primary || screen.buttonLabels.primaryBtnText || primaryBtn;
    }

    // Phone model
    let phoneModel = screen.phoneModel || 'dynamic-island';
    if (screen.phoneStyle) {
      phoneModel = screen.phoneStyle.model || phoneModel;
    }

    return `
      <div class="screen-card" data-card-id="${screen.id || screen.uniqueId}">
        <div class="screen-card-header">
          <span class="card-app-badge badge-${screen.selectedApp || 'custom'}">
            <span>${cfg.icon || '📱'}</span>
            <span>${escapeHtml(appDisplayName)}</span>
          </span>
          <div class="card-meta-right">
            <span class="card-mode-tag">${modeTag}</span>
            <span class="card-date">${formattedDate}</span>
          </div>
        </div>

        <div class="screen-card-mini-preview ${bgClass}" style="${bgStyle} ${filterStyle}">
          <div class="mini-preview-dim" style="${dimStyle}"></div>
          <div class="mini-preview-box">
            <div class="mini-preview-top">
              <span class="mini-avatar">${cfg.avatar || '👤'}</span>
              <strong class="mini-sender">${escapeHtml(screen.senderName || 'Anonymous')}</strong>
            </div>
            <p class="mini-message">"${escapeHtml(displayMsg || ' ')}"</p>
          </div>
        </div>

        <div class="screen-card-body">
          <h4 class="screen-card-title">${escapeHtml(displayTitle)}</h4>
          <div class="screen-card-chips">
            <span class="detail-chip" title="Android App Package Name" style="font-family: monospace;">📦 ${escapeHtml(appPackage)}</span>
            <span class="detail-chip" title="Sender Name">👤 ${escapeHtml(screen.senderName || 'Anonymous')}</span>
            <span class="detail-chip" title="Buttons">🔘 ${escapeHtml(primaryBtn)}</span>
            <span class="detail-chip" title="Phone Style">📱 ${formatPhoneModel(phoneModel)}</span>
            <span class="detail-chip" title="Wallpaper">${wallpaperLabel}</span>
          </div>
        </div>

        <div class="screen-card-actions">
          <button type="button" class="btn-card-load" data-id="${screen.id || screen.uniqueId}" title="Load and preview this screen in the studio">
            <span>👁️ Preview</span>
          </button>
          <button type="button" class="btn-card-edit" data-id="${screen.id || screen.uniqueId}" title="Edit name or update configuration">
            <span>✏️ Edit</span>
          </button>
          <button type="button" class="btn-card-copy" data-id="${screen.id || screen.uniqueId}" title="Duplicate this screen">
            <span>📋 Copy</span>
          </button>
          <button type="button" class="btn-card-del" data-id="${screen.id || screen.uniqueId}" title="Delete this screen">
            <span>🗑️</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  elements.savedScreensGrid.innerHTML = cardsHtml;
}

// Helpers for formatting
function formatPhoneModel(model) {
  if (model === 'punch-hole') return 'Punch Hole';
  if (model === 'bezel-less') return 'Borderless';
  return 'Dynamic Island';
}

function formatPhoneColor(color) {
  if (color === 'midnight-black') return 'Midnight Black';
  if (color === 'silver-frost') return 'Silver Frost';
  if (color === 'gold-accent') return 'Royal Gold';
  return 'Dark Titanium';
}

function formatWallpaperName(bg) {
  if (bg === 'ff-fiery') return 'FF Lava';
  if (bg === 'neon-cyber') return 'Cyberpunk';
  if (bg === 'dark-gaming') return 'Dark Void';
  if (bg === 'battle-smoke') return 'Battleground';
  if (bg === 'sunset-gradient') return 'Sunset';
  return 'Preset Theme';
}

function formatDate(isoString) {
  if (!isoString) return 'Just now';
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffMin = Math.floor((now - d) / 60000);
    if (diffMin < 2) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch (e) {
    return 'Recent';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
