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
    blur: 0
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
    blur: 0
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
    blur: 2
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
    blur: 0
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
    blur: 3
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
    blur: 0
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
  customAppTitle: 'Custom Game'
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
  exportCanvas: document.getElementById('export-canvas')
};

// Initialize Application
function initApp() {
  bindEvents();
  applyStateToUI();
  updateLivePreview();
}

// Bind all interactive event listeners
function bindEvents() {
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

// Apply Initial State to UI
function applyStateToUI() {
  elements.senderInput.value = state.senderName;
  elements.messageInput.value = state.messageText;
  elements.subtextInput.value = state.subtext;
  elements.timeInput.value = state.timeText;
  elements.primaryBtnInput.value = state.primaryBtnText;
  elements.secondaryBtnInput.value = state.secondaryBtnText;
  elements.phoneModelSelect.value = state.phoneModel;
  elements.phoneColorSelect.value = state.phoneColor;
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

// Start application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
