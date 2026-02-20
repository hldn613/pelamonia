
var VEDIKA_LICENSE_CONFIG = {
  STORAGE_KEY: 'vedikaToolsLicenseValid',
  VERIFY_ENDPOINT: '',
  SECRET_HASHES: [
    'e505da0f3b09e10985bebc625a4449b7d33bb93881868a1da3a34d7081440e5b',
    '9e2789f632cc18d74f4c2811addecc39adf94c4be6360bb41faa245fcaeb8bad'
  ]
};

// ======================================================================================================
// ============================================= SCRIPT 1.1 ============================================
// ======================================================================================================


// Jalankan script hanya jika URL sesuai
if (window.location.href.startsWith('https://vedika.rsad-pelamonia.id/webapps/berkasrawat/index.php?act=ListVedika')) {
  var LICENSE_STORAGE_KEY = VEDIKA_LICENSE_CONFIG.STORAGE_KEY;
  var LICENSE_VERIFY_ENDPOINT = VEDIKA_LICENSE_CONFIG.VERIFY_ENDPOINT;
  var LICENSE_SECRET_HASHES = VEDIKA_LICENSE_CONFIG.SECRET_HASHES;

  localStorage.removeItem(LICENSE_STORAGE_KEY);

  // Card utama (UI panel)
  var panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '20px';
  panel.style.right = '20px';
  panel.style.zIndex = 9999;
  panel.style.width = '360px';
  panel.style.maxWidth = 'calc(100vw - 24px)';
  panel.style.boxSizing = 'border-box';
  panel.style.background = '#ffffff';
  panel.style.border = '1px solid #e5e7eb';
  panel.style.borderRadius = '12px';
  panel.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
  panel.style.padding = '14px';
  panel.style.fontFamily = 'Segoe UI, Arial, sans-serif';
  panel.style.display = 'none';
  panel.innerHTML = '' +
    '<div id="vedikaPanelHeader" style="display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:move;user-select:none;">' +
      '<div style="font-size:16px;font-weight:700;color:#111827;">Vedika Batch Tools</div>' +
      '<div style="display:flex;align-items:center;gap:6px;">' +
        '<button id="vedikaLicenseLogout" type="button" style="padding:6px 10px;border:1px solid #d1d5db;border-radius:8px;background:#ffffff;color:#374151;font-size:12px;font-weight:600;cursor:pointer;">Logout</button>' +
        '<button id="toggleVedikaPanel" type="button" style="width:28px;height:28px;border:1px solid #d1d5db;border-radius:8px;background:#f9fafb;color:#374151;font-size:16px;line-height:1;cursor:pointer;">−</button>' +
      '</div>' +
    '</div>' +
    '<div id="vedikaPanelBody" style="margin-top:4px;">' +
      '<div style="font-size:12px;color:#6b7280;">Kelola download PDF & billing berdasarkan daftar No.RM</div>' +
      '<label style="display:block;margin-top:12px;font-size:12px;font-weight:600;color:#374151;">Daftar No.RM</label>' +
      '<textarea id="noRMInput" rows="6" placeholder="Contoh: 763953, 123456" style="width:100%;box-sizing:border-box;margin-top:6px;padding:8px 10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;resize:vertical;"></textarea>' +
      '<div style="margin-top:6px;font-size:11px;color:#6b7280;">Pisahkan dengan koma, spasi, atau baris baru.</div>' +
      '<label style="display:block;margin-top:10px;font-size:12px;font-weight:600;color:#374151;">Opsi Download</label>' +
      '<select id="downloadModeSelect" style="width:100%;box-sizing:border-box;margin-top:6px;padding:8px 10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;background:#ffffff;color:#111827;">' +
        '<option value="all">Semua (Billing + Berkas)</option>' +
        '<option value="billing_only">Hanya Billing</option>' +
        '<option value="berkas_only">Hanya Berkas</option>' +
      '</select>' +
      '<div style="display:grid;grid-template-columns:1fr;gap:8px;margin-top:12px;">' +
      '<button id="btnDownloadAll" type="button" style="padding:9px 10px;border:none;border-radius:8px;background:#2563eb;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Mulai Download</button>' +
      '</div>' +
      '<div style="margin-top:14px;padding:10px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">' +
        '<div style="margin-bottom:6px;font-size:12px;font-weight:600;color:#374151;">Progress</div>' +
        '<div id="progressBarContainer" style="width:100%;height:12px;background:#d1d5db;border-radius:999px;overflow:hidden;">' +
          '<div id="progressBar" style="height:100%;width:0%;background:#16a34a;"></div>' +
        '</div>' +
        '<div id="progressText" style="margin-top:6px;font-size:12px;color:#4b5563;">0 / 0 (0%)</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">' +
        '<button id="btnStopProcess" type="button" style="padding:9px 10px;border:none;border-radius:8px;background:#b91c1c;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Stop/Cancel</button>' +
        '<button id="btnExportLog" type="button" style="padding:9px 10px;border:1px solid #d1d5db;border-radius:8px;background:#ffffff;color:#111827;font-size:12px;font-weight:600;cursor:pointer;">Export Log CSV</button>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">' +
        '<button id="btnPauseProcess" type="button" style="padding:9px 10px;border:1px solid #d1d5db;border-radius:8px;background:#f59e0b;color:#ffffff;font-size:12px;font-weight:600;cursor:pointer;">Pause</button>' +
        '<button id="btnResumeProcess" type="button" style="padding:9px 10px;border:1px solid #d1d5db;border-radius:8px;background:#059669;color:#ffffff;font-size:12px;font-weight:600;cursor:pointer;">Resume</button>' +
        '</div>' +
        '<div id="progressStatus" style="margin-top:4px;font-size:11px;color:#6b7280;min-height:16px;"></div>' +
        '<div id="summaryText" style="margin-top:6px;font-size:11px;color:#374151;white-space:pre-line;min-height:16px;"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(panel);

  // Card license
  var licenseCard = document.createElement('div');
  licenseCard.style.position = 'fixed';
  licenseCard.style.top = '20px';
  licenseCard.style.right = '20px';
  licenseCard.style.zIndex = 10000;
  licenseCard.style.width = '320px';
  licenseCard.style.maxWidth = 'calc(100vw - 24px)';
  licenseCard.style.boxSizing = 'border-box';
  licenseCard.style.background = '#ffffff';
  licenseCard.style.border = '1px solid #e5e7eb';
  licenseCard.style.borderRadius = '12px';
  licenseCard.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
  licenseCard.style.padding = '14px';
  licenseCard.style.fontFamily = 'Segoe UI, Arial, sans-serif';
  licenseCard.innerHTML = '' +
    '<div style="font-size:16px;font-weight:700;color:#111827;">License Verification</div>' +
    '<div style="margin-top:4px;font-size:12px;color:#6b7280;">Masukkan license key untuk menampilkan tools.</div>' +
    '<input id="vedikaLicenseInput" type="password" placeholder="Masukkan license key" style="width:100%;box-sizing:border-box;margin-top:10px;padding:9px 10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;">' +
    '<button id="vedikaLicenseSubmit" type="button" style="width:100%;margin-top:10px;padding:9px 10px;border:none;border-radius:8px;background:#111827;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Verifikasi License</button>' +
    '<div id="vedikaLicenseMsg" style="margin-top:8px;font-size:12px;color:#dc2626;min-height:16px;"></div>';
  document.body.appendChild(licenseCard);

  function showToolsPanel() {
    panel.style.display = 'block';
    licenseCard.style.display = 'none';
  }

  function showLicenseCard() {
    panel.style.display = 'none';
    licenseCard.style.display = 'block';
  }

  if (localStorage.getItem(LICENSE_STORAGE_KEY) === '1') {
    showToolsPanel();
  }

  var downloadAllBtn = document.getElementById('btnDownloadAll');
  var downloadModeSelect = document.getElementById('downloadModeSelect');
  var togglePanelBtn = document.getElementById('toggleVedikaPanel');
  var stopProcessBtn = document.getElementById('btnStopProcess');
  var pauseProcessBtn = document.getElementById('btnPauseProcess');
  var resumeProcessBtn = document.getElementById('btnResumeProcess');
  var exportLogBtn = document.getElementById('btnExportLog');
  var panelHeader = document.getElementById('vedikaPanelHeader');
  var panelBody = document.getElementById('vedikaPanelBody');
  var logoutLicenseBtn = document.getElementById('vedikaLicenseLogout');
  var licenseInput = document.getElementById('vedikaLicenseInput');
  var licenseSubmit = document.getElementById('vedikaLicenseSubmit');
  var licenseMsg = document.getElementById('vedikaLicenseMsg');
  var panelCollapsed = false;
  var isDragging = false;
  var dragOffsetX = 0;
  var dragOffsetY = 0;
  var isProcessRunning = false;
  var stopRequested = false;
  var activeMode = '';
  var processLogs = [];
  var combinedQueue = [];
  var combinedIndex = 0;
  var waitingCombinedBillingClose = false;
  var combinedBillingTimeoutId = null;
  var currentCombinedContext = null;
  var adaptiveDelayMs = 1200;
  var isPaused = false;
  var pauseResolvers = [];
  var lastProgressStatusText = '';
  var statusBeforePause = '';
  var selectedDownloadMode = 'all';

  function setActionButtonsDisabled(disabled) {
    downloadAllBtn.disabled = disabled;
    if (downloadModeSelect) {
      downloadModeSelect.disabled = disabled;
    }
    updatePauseResumeButtons();
  }

  function getSelectedDownloadMode() {
    if (!downloadModeSelect) {
      return 'all';
    }
    var mode = String(downloadModeSelect.value || 'all');
    if (mode !== 'all' && mode !== 'billing_only' && mode !== 'berkas_only') {
      return 'all';
    }
    return mode;
  }

  function getDownloadModeText(mode) {
    if (mode === 'billing_only') {
      return 'hanya billing';
    }
    if (mode === 'berkas_only') {
      return 'hanya berkas';
    }
    return 'billing + berkas';
  }

  function updatePauseResumeButtons() {
    if (!pauseProcessBtn || !resumeProcessBtn) {
      return;
    }
    pauseProcessBtn.disabled = !isProcessRunning || isPaused;
    resumeProcessBtn.disabled = !isProcessRunning || !isPaused;
  }

  function updateProgress(current, total) {
    var bar = document.getElementById('progressBar');
    var text = document.getElementById('progressText');
    var percent = total > 0 ? Math.round((current / total) * 100) : 0;
    bar.style.width = percent + '%';
    text.textContent = ' ' + current + ' / ' + total + ' (' + percent + '%)';
  }

  function updateProgressStatus(textValue) {
    var status = document.getElementById('progressStatus');
    lastProgressStatusText = textValue || '';
    if (status) {
      status.textContent = lastProgressStatusText;
    }
  }

  function updateSummaryText(textValue) {
    var summary = document.getElementById('summaryText');
    if (summary) {
      summary.textContent = textValue || '';
    }
  }

  function nowText() {
    return new Date().toISOString();
  }

  function addLog(entry) {
    processLogs.push({
      time: nowText(),
      mode: entry.mode || '',
      input: entry.input || '',
      noRM: entry.noRM || '',
      noKunjungan: entry.noKunjungan || '',
      status: entry.status || '',
      fileName: entry.fileName || '',
      message: entry.message || ''
    });
  }

  function summarizeLogs(mode) {
    var relevant = processLogs.filter(function (x) { return x.mode === mode; });
    return {
      success: relevant.filter(function (x) { return x.status === 'success'; }).length,
      failed: relevant.filter(function (x) { return x.status === 'failed'; }).length,
      notFound: relevant.filter(function (x) { return x.status === 'not_found'; }).length,
      cancelled: relevant.filter(function (x) { return x.status === 'cancelled'; }).length
    };
  }

  function collectFailedNoRMByType(mode) {
    var relevant = processLogs.filter(function (x) {
      return x.mode === mode && (x.status === 'failed' || x.status === 'not_found');
    });
    var seenBilling = {};
    var seenBerkasNotFound = {};
    var failedBilling = [];
    var berkasNotFound = [];

    for (var i = 0; i < relevant.length; i++) {
      var row = relevant[i];
      var value = String(row.noRM || row.input || '').trim();
      if (!value) {
        continue;
      }

      var message = String(row.message || '').toLowerCase();
      var fileName = String(row.fileName || '').toLowerCase();
      var isBillingFailed = row.status === 'failed' && (message.indexOf('billing') >= 0 || fileName.indexOf('_billing.pdf') >= 0);
      var isBerkasNotFound = row.status === 'not_found' && message.indexOf('berkas') >= 0;

      if (isBillingFailed && !seenBilling[value]) {
        seenBilling[value] = true;
        failedBilling.push(value);
      }

      if (isBerkasNotFound && !seenBerkasNotFound[value]) {
        seenBerkasNotFound[value] = true;
        berkasNotFound.push(value);
      }
    }

    return {
      failedBilling: failedBilling,
      berkasNotFound: berkasNotFound
    };
  }

  function renderSummary(mode) {
    var summary = summarizeLogs(mode);
    var failedByType = collectFailedNoRMByType(mode);
    var failedBillingText = failedByType.failedBilling.length ? failedByType.failedBilling.join(', ') : '-';
    var berkasNotFoundText = failedByType.berkasNotFound.length ? failedByType.berkasNotFound.join(', ') : '-';
    updateSummaryText(
      'Ringkasan ' + mode + '\n' +
      'Berhasil: ' + summary.success + '\n' +
      'Gagal: ' + summary.failed + '\n' +
      'Tidak ditemukan: ' + summary.notFound + '\n' +
      'Dibatalkan: ' + summary.cancelled + '\n' +
      'No.RM gagal billing: ' + failedBillingText + '\n' +
      'No.RM berkas tidak ditemukan: ' + berkasNotFoundText
    );
  }

  function escapeCsvCell(value) {
    return '"' + String(value || '').replace(/"/g, '""') + '"';
  }

  function exportLogsCsv() {
    if (!processLogs.length) {
      alert('Belum ada log untuk diexport.');
      return;
    }
    var header = ['time', 'mode', 'input', 'noRM', 'noKunjungan', 'status', 'fileName', 'message'];
    var lines = [header.map(escapeCsvCell).join(',')];
    for (var i = 0; i < processLogs.length; i++) {
      var row = processLogs[i];
      lines.push([
        row.time,
        row.mode,
        row.input,
        row.noRM,
        row.noKunjungan,
        row.status,
        row.fileName,
        row.message
      ].map(escapeCsvCell).join(','));
    }
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'vedika_batch_log_' + Date.now() + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  function parseInputIdentifiers() {
    var val = document.getElementById('noRMInput').value;
    var rawTokens = val.split(/[\n\r, ]+/).map(function (x) { return x.trim(); }).filter(Boolean);
    var allowedPattern = /^(\d+|\d{4}\/\d{2}\/\d{2}\/\d+)$/;
    var invalid = [];
    var unique = [];
    var seen = {};
    var duplicates = 0;
    for (var i = 0; i < rawTokens.length; i++) {
      var token = rawTokens[i];
      if (!allowedPattern.test(token)) {
        invalid.push(token);
        continue;
      }
      if (seen[token]) {
        duplicates += 1;
        continue;
      }
      seen[token] = true;
      unique.push(token);
    }
    return {
      validList: unique,
      invalidList: invalid,
      duplicateCount: duplicates
    };
  }

  function prepareIdentifiersOrAlert() {
    var parsed = parseInputIdentifiers();
    if (!parsed.validList.length) {
      alert('Input tidak valid. Gunakan No.RM angka atau No.Rawat format YYYY/MM/DD/NNNNNN.');
      return null;
    }
    if (parsed.invalidList.length || parsed.duplicateCount > 0) {
      var message = 'Valid dipakai: ' + parsed.validList.length;
      if (parsed.invalidList.length) {
        message += '\nInvalid diabaikan: ' + parsed.invalidList.join(', ');
      }
      if (parsed.duplicateCount > 0) {
        message += '\nDuplikat dihapus: ' + parsed.duplicateCount;
      }
      alert(message);
    }
    return parsed.validList;
  }

  function startProcess(mode) {
    if (isProcessRunning) {
      alert('Masih ada proses berjalan. Stop/Cancel dulu sebelum memulai proses baru.');
      return false;
    }
    isProcessRunning = true;
    stopRequested = false;
    activeMode = mode;
    isPaused = false;
    pauseResolvers = [];
    statusBeforePause = '';
    adaptiveDelayMs = 1200;
    updateProgress(0, 0);
    updateSummaryText('');
    updateProgressStatus('Memulai proses ' + mode + ' (' + getDownloadModeText(selectedDownloadMode) + ')...');
    setActionButtonsDisabled(true);
    return true;
  }

  function finishProcess(mode, message) {
    isProcessRunning = false;
    stopRequested = false;
    activeMode = '';
    isPaused = false;
    pauseResolvers = [];
    statusBeforePause = '';
    waitingCombinedBillingClose = false;
    currentCombinedContext = null;
    if (combinedBillingTimeoutId) {
      clearTimeout(combinedBillingTimeoutId);
      combinedBillingTimeoutId = null;
    }
    updateProgressStatus(message || 'Selesai.');
    renderSummary(mode);
    setActionButtonsDisabled(false);
  }

  function requestStopProcess() {
    if (!isProcessRunning) {
      updateProgressStatus('Tidak ada proses aktif.');
      return;
    }
    stopRequested = true;
    updateProgressStatus('Permintaan stop diterima, menghentikan proses...');
    if (isPaused) {
      requestResumeProcess();
    }
  }

  async function waitIfPaused() {
    if (!isPaused) {
      return;
    }
    await new Promise(function (resolve) {
      pauseResolvers.push(resolve);
    });
  }

  function requestPauseProcess() {
    if (!isProcessRunning) {
      updateProgressStatus('Tidak ada proses aktif untuk di-pause.');
      return;
    }
    if (isPaused) {
      return;
    }
    statusBeforePause = lastProgressStatusText;
    isPaused = true;
    updateProgressStatus('Proses di-pause. Klik Resume untuk lanjut.');
    updatePauseResumeButtons();
  }

  function requestResumeProcess() {
    if (!isProcessRunning) {
      updateProgressStatus('Tidak ada proses aktif untuk di-resume.');
      return;
    }
    if (!isPaused) {
      return;
    }
    isPaused = false;
    updateProgressStatus(statusBeforePause || 'Proses dilanjutkan...');
    statusBeforePause = '';
    while (pauseResolvers.length) {
      var resolver = pauseResolvers.shift();
      resolver();
    }
    updatePauseResumeButtons();
  }

  function sanitizeFilePart(value) {
    return String(value || '')
      .trim()
      .replace(/[\\/:*?"<>|]/g, '')
      .replace(/\s+/g, '-');
  }

  function normalizeValueCellText(valueText) {
    return String(valueText || '').replace(/^\s*:\s*/, '').trim();
  }

  function getRowValueByLabel(row, columnIndex, labelText) {
    if (!row || !row.children || !row.children[columnIndex]) {
      return '';
    }
    var cell = row.children[columnIndex];
    var nestedRows = Array.from(cell.querySelectorAll('tr'));
    for (var i = 0; i < nestedRows.length; i++) {
      var cols = nestedRows[i].children;
      if (!cols || cols.length < 2) {
        continue;
      }
      var key = String(cols[0].innerText || '').trim();
      if (key === labelText) {
        return normalizeValueCellText(cols[1].innerText || '');
      }
    }
    return '';
  }

  function findRowByIdentifier(identifier) {
    var target = String(identifier || '').trim();
    if (!target) {
      return null;
    }
    var rows = Array.from(document.querySelectorAll('tr.isi'));
    for (var i = 0; i < rows.length; i++) {
      var rowNoRM = getRowValueByLabel(rows[i], 1, 'No.RM');
      var rowNoRawat = getRowValueByLabel(rows[i], 1, 'No.Rawat');
      if (rowNoRM === target || rowNoRawat === target) {
        return rows[i];
      }
    }
    return null;
  }

  function waitMs(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function fileNameBilling(noRM, noKunjungan) {
    var safeNoRM = sanitizeFilePart(noRM) || 'NoRM';
    var safeNoKunjungan = sanitizeFilePart(noKunjungan) || 'NoKunjungan';
    return safeNoRM + '_' + safeNoKunjungan + '_Billing.pdf';
  }

  async function sha256Hex(text) {
    var encoded = new TextEncoder().encode(String(text || ''));
    var hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  async function isLicenseValid(inputValue) {
    var normalizedInput = String(inputValue || '').trim();
    if (!normalizedInput) {
      return false;
    }
    if (LICENSE_VERIFY_ENDPOINT) {
      try {
        var response = await fetch(LICENSE_VERIFY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: normalizedInput })
        });
        if (response.ok) {
          var payload = await response.json();
          return !!(payload && payload.valid === true);
        }
      } catch (err) {
        // fallback ke hash lokal
      }
    }
    var hashed = await sha256Hex(normalizedInput);
    return LICENSE_SECRET_HASHES.includes(hashed);
  }

  async function submitLicense() {
    licenseSubmit.disabled = true;
    licenseMsg.textContent = 'Memverifikasi...';
    if (await isLicenseValid(licenseInput.value)) {
      localStorage.setItem(LICENSE_STORAGE_KEY, '1');
      licenseMsg.textContent = '';
      showToolsPanel();
      licenseSubmit.disabled = false;
      return;
    }
    licenseMsg.textContent = 'License tidak valid.';
    licenseSubmit.disabled = false;
  }

  licenseSubmit.addEventListener('click', submitLicense);
  licenseInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      submitLicense();
    }
  });

  logoutLicenseBtn.addEventListener('click', function () {
    localStorage.removeItem(LICENSE_STORAGE_KEY);
    licenseInput.value = '';
    licenseMsg.textContent = '';
    showLicenseCard();
    licenseInput.focus();
  });

  togglePanelBtn.addEventListener('click', function () {
    panelCollapsed = !panelCollapsed;
    panelBody.style.display = panelCollapsed ? 'none' : 'block';
    togglePanelBtn.textContent = panelCollapsed ? '+' : '−';
  });

  panelHeader.addEventListener('mousedown', function (e) {
    if (e.target.closest('button')) {
      return;
    }
    isDragging = true;
    panel.style.right = 'auto';
    dragOffsetX = e.clientX - panel.offsetLeft;
    dragOffsetY = e.clientY - panel.offsetTop;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) {
      return;
    }
    var maxLeft = window.innerWidth - panel.offsetWidth;
    var maxTop = window.innerHeight - panel.offsetHeight;
    var nextLeft = Math.max(0, Math.min(e.clientX - dragOffsetX, maxLeft));
    var nextTop = Math.max(0, Math.min(e.clientY - dragOffsetY, maxTop));
    panel.style.left = nextLeft + 'px';
    panel.style.top = nextTop + 'px';
  });

  document.addEventListener('mouseup', function () {
    if (!isDragging) {
      return;
    }
    isDragging = false;
    document.body.style.userSelect = '';
  });

  async function downloadDigitalFromContext(context) {
    await waitIfPaused();
    if (!isProcessRunning || activeMode !== 'combined' || stopRequested) {
      return;
    }
    var foundRow = context.row;
    var inputIdentifier = context.input;
    var noRM = context.noRM;
    var noKunjungan = context.noKunjungan;
    var berkasDigitalCell = foundRow.children[4];
    var pdfLinks = berkasDigitalCell ? Array.from(berkasDigitalCell.querySelectorAll('a[href$=".pdf"]')) : [];

    if (!pdfLinks.length) {
      addLog({
        mode: 'combined',
        input: inputIdentifier,
        noRM: noRM,
        noKunjungan: noKunjungan,
        status: 'not_found',
        message: 'Tidak ada berkas PDF pada kolom Berkas Digital'
      });
      return;
    }

    updateProgressStatus('Download berkas: ' + inputIdentifier);
    for (let i = 0; i < pdfLinks.length; i++) {
      await waitIfPaused();
      if (stopRequested) {
        addLog({ mode: 'combined', status: 'cancelled', message: 'Dihentikan pengguna' });
        return;
      }
      var url = pdfLinks[i].href;
      var cleanPath = new URL(url, window.location.href).pathname;
      var originalName = cleanPath.split('/').pop() || '';
      var ext = (originalName.split('.').pop() || 'pdf').toLowerCase();
      var berkasTitle = sanitizeFilePart(pdfLinks[i].textContent || 'Berkas');
      var safeNoRM = sanitizeFilePart(noRM) || 'NoRM';
      var safeNoKunjungan = sanitizeFilePart(noKunjungan) || 'NoKunjungan';
      var downloadName = safeNoRM + '_' + safeNoKunjungan + '_' + (i + 1) + '-' + berkasTitle + '.' + ext;
      try {
        var blob = await fetchBlobWithRetry(url, 3);
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        addLog({ mode: 'combined', input: inputIdentifier, noRM: noRM, noKunjungan: noKunjungan, status: 'success', fileName: downloadName, message: 'Download berkas berhasil' });
        adaptiveDelayMs = Math.max(800, adaptiveDelayMs - 100);
      } catch (err) {
        addLog({ mode: 'combined', input: inputIdentifier, noRM: noRM, noKunjungan: noKunjungan, status: 'failed', fileName: downloadName, message: 'Gagal download berkas: ' + String(err) });
        adaptiveDelayMs = Math.min(3000, adaptiveDelayMs + 250);
      }
      await waitMs(adaptiveDelayMs);
    }
  }

  async function continueAfterBilling() {
    await waitIfPaused();
    if (!isProcessRunning || activeMode !== 'combined') {
      return;
    }
    if (!currentCombinedContext) {
      combinedIndex += 1;
      processNextCombined();
      return;
    }
    if (selectedDownloadMode !== 'billing_only') {
      await downloadDigitalFromContext(currentCombinedContext);
    }
    if (stopRequested) {
      finishProcess('combined', 'Proses download dihentikan.');
      return;
    }
    currentCombinedContext = null;
    combinedIndex += 1;
    setTimeout(processNextCombined, Math.min(2500, adaptiveDelayMs + 300));
  }

  async function processNextCombined() {
    await waitIfPaused();
    if (!isProcessRunning || activeMode !== 'combined') {
      return;
    }
    if (stopRequested) {
      addLog({ mode: 'combined', status: 'cancelled', message: 'Dihentikan pengguna' });
      finishProcess('combined', 'Proses download dihentikan.');
      return;
    }
    if (combinedIndex >= combinedQueue.length) {
      updateProgress(combinedQueue.length, combinedQueue.length);
      finishProcess('combined', 'Selesai download ' + getDownloadModeText(selectedDownloadMode) + '.');
      return;
    }

    var inputIdentifier = combinedQueue[combinedIndex];
    updateProgress(combinedIndex + 1, combinedQueue.length);

    var foundRow = findRowByIdentifier(inputIdentifier);
    if (!foundRow) {
      addLog({ mode: 'combined', input: inputIdentifier, status: 'not_found', message: 'Baris tidak ditemukan untuk input' });
      combinedIndex += 1;
      setTimeout(processNextCombined, 300);
      return;
    }

    var noRM = getRowValueByLabel(foundRow, 1, 'No.RM') || inputIdentifier;
    var noKunjungan = getRowValueByLabel(foundRow, 3, 'No.Kunjungan');
    var billingCell = foundRow.children[0];
    var billingLink = billingCell ? billingCell.querySelector('a[href*="billing.php?iyem="]') : null;

    currentCombinedContext = {
      input: inputIdentifier,
      noRM: noRM,
      noKunjungan: noKunjungan,
      row: foundRow
    };

    if (selectedDownloadMode === 'berkas_only') {
      await downloadDigitalFromContext(currentCombinedContext);
      if (stopRequested) {
        finishProcess('combined', 'Proses download dihentikan.');
        return;
      }
      currentCombinedContext = null;
      combinedIndex += 1;
      setTimeout(processNextCombined, Math.min(2500, adaptiveDelayMs + 300));
      return;
    }

    if (!billingLink) {
      addLog({ mode: 'combined', input: inputIdentifier, noRM: noRM, noKunjungan: noKunjungan, status: 'failed', fileName: fileNameBilling(noRM, noKunjungan), message: 'Link billing tidak ditemukan' });
      continueAfterBilling();
      return;
    }

    updateProgressStatus('Billing: ' + inputIdentifier);
    localStorage.setItem('billingMeta', JSON.stringify({ noRM: noRM, noKunjungan: noKunjungan }));
    var openedWindow = window.open(billingLink.href, '_blank');
    if (!openedWindow) {
      addLog({ mode: 'combined', input: inputIdentifier, noRM: noRM, noKunjungan: noKunjungan, status: 'failed', fileName: fileNameBilling(noRM, noKunjungan), message: 'Popup billing diblokir browser' });
      continueAfterBilling();
      return;
    }

    waitingCombinedBillingClose = true;
    if (combinedBillingTimeoutId) {
      clearTimeout(combinedBillingTimeoutId);
    }
    combinedBillingTimeoutId = setTimeout(function () {
      if (!waitingCombinedBillingClose || !isProcessRunning || activeMode !== 'combined') {
        return;
      }
      waitingCombinedBillingClose = false;
      if (currentCombinedContext) {
        addLog({
          mode: 'combined',
          input: currentCombinedContext.input,
          noRM: currentCombinedContext.noRM,
          noKunjungan: currentCombinedContext.noKunjungan,
          status: 'failed',
          fileName: fileNameBilling(currentCombinedContext.noRM, currentCombinedContext.noKunjungan),
          message: 'Timeout menunggu billing ditutup'
        });
      }
      continueAfterBilling();
    }, 120000);
  }

  window.addEventListener('storage', function (e) {
    if (e.key === 'billingClosed' && waitingCombinedBillingClose && isProcessRunning && activeMode === 'combined') {
      waitingCombinedBillingClose = false;
      if (combinedBillingTimeoutId) {
        clearTimeout(combinedBillingTimeoutId);
        combinedBillingTimeoutId = null;
      }
      if (currentCombinedContext) {
        addLog({
          mode: 'combined',
          input: currentCombinedContext.input,
          noRM: currentCombinedContext.noRM,
          noKunjungan: currentCombinedContext.noKunjungan,
          status: 'success',
          fileName: fileNameBilling(currentCombinedContext.noRM, currentCombinedContext.noKunjungan),
          message: 'Billing berhasil disimpan'
        });
      }
      continueAfterBilling();
    }
  });

  async function fetchBlobWithRetry(url, maxRetries) {
    var lastError = null;
    for (var attempt = 1; attempt <= maxRetries; attempt++) {
      await waitIfPaused();
      try {
        var res = await fetch(url);
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return await res.blob();
      } catch (err) {
        lastError = err;
        if (attempt < maxRetries) {
          await waitMs(500 * attempt);
        }
      }
    }
    throw lastError || new Error('Download gagal');
  }

  downloadAllBtn.addEventListener('click', function () {
    var identifierList = prepareIdentifiersOrAlert();
    if (!identifierList || identifierList.length === 0) {
      return;
    }
    selectedDownloadMode = getSelectedDownloadMode();
    if (!startProcess('combined')) {
      return;
    }
    combinedQueue = identifierList;
    combinedIndex = 0;
    processNextCombined();
  });

  stopProcessBtn.addEventListener('click', requestStopProcess);
  pauseProcessBtn.addEventListener('click', requestPauseProcess);
  resumeProcessBtn.addEventListener('click', requestResumeProcess);
  exportLogBtn.addEventListener('click', exportLogsCsv);
  updatePauseResumeButtons();
}


// ======================================================================================================
// ============================================= SCRIPT 1.2 =============================================
// ======================================================================================================


// Jalankan script hanya jika URL sesuai
if (window.location.href.startsWith('https://vedika.rsad-pelamonia.id/webapps/berkasrawat/pages/billing.php?iyem=')) {
  // 1. Load html2pdf.js (jika belum ada)
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  document.body.appendChild(script);

  // 2. Setelah script ter-load, jalankan:
  script.onload = function () {
    function normalizeValueCellTextBilling(valueText) {
      return String(valueText || '').replace(/^\s*:\s*/, '').trim();
    }

    function getBillingValueByLabel(labelText) {
      var rows = document.querySelectorAll('tr.isi12, tr.isi8');
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].children;
        if (!cols || cols.length < 2) {
          continue;
        }
        var key = String(cols[0].innerText || '').trim();
        if (key === labelText) {
          return normalizeValueCellTextBilling(cols[1].innerText || '');
        }
      }
      return '';
    }

    function sanitizeFilePartBilling(value) {
      return String(value || '')
        .trim()
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, '-');
    }

    var noRM = getBillingValueByLabel('No.RM') || 'NoRM';
    var noKunjungan = getBillingValueByLabel('No.Kunjungan') || 'NoKunjungan';

    try {
      var billingMetaRaw = localStorage.getItem('billingMeta');
      if (billingMetaRaw) {
        var billingMeta = JSON.parse(billingMetaRaw);
        if (billingMeta && billingMeta.noRM) {
          noRM = billingMeta.noRM;
        }
        if (billingMeta && billingMeta.noKunjungan) {
          noKunjungan = billingMeta.noKunjungan;
        }
      }
    } catch (err) {
      // fallback ke data halaman billing
    }

    noRM = sanitizeFilePartBilling(noRM) || 'NoRM';
    noKunjungan = sanitizeFilePartBilling(noKunjungan) || 'NoKunjungan';

    html2pdf().from(document.body).save(noRM + '_' + noKunjungan + '_Billing.pdf').then(function () {
      localStorage.removeItem('billingMeta');
      // Kirim notifikasi ke tab utama sebelum close
      localStorage.setItem('billingClosed', Date.now());
      window.close();
    });
  };
}



// ======================================================================================================
// ============================================= SCRIPT 2.1 =============================================
// ======================================================================================================

// Auto download cetak klaim saat halaman detail klaim dibuka
// scrip 2
(function () {
    'use strict';

    var allowedPrefix = 'http://192.168.108.105/E-Klaim/index.php?rand=';
    if (!window.location.href.startsWith(allowedPrefix)) {
        return;
    }

    var RUNNER_ACK_KEY = 'eklaim.sepRunner.ack.v1';
    var RUNNER_TYPE_DONE = 'cetak-klaim-done';
    var RUNNER_PENDING_KEY = 'eklaim.sepRunner.pending.v1';

    function parsePrintClaimArgs(onclickValue) {
        if (!onclickValue) {
            return null;
        }
        var match = onclickValue.match(/print_claim\((['"])([^'"]+)\1\s*,\s*(['"])([^'"]+)\3/);
        if (!match) {
            return null;
        }
        return {
            patientId: match[2],
            admissionId: match[4]
        };
    }

    function getNoRM() {
        var mrnInput = document.getElementById('mrn');
        if (mrnInput && mrnInput.value) {
            return String(mrnInput.value).trim();
        }
        return '';
    }

    function sanitizeFilePart(value) {
        return String(value || '')
            .trim()
            .replace(/[\\/:*?"<>|]/g, '')
            .replace(/\s+/g, '-');
    }

    function getQueryParam(name) {
        try {
            var url = new URL(window.location.href);
            return url.searchParams.get(name) || '';
        } catch (error) {
            return '';
        }
    }

    function emitRunnerAck(payload) {
        try {
            localStorage.setItem(RUNNER_ACK_KEY, JSON.stringify(payload));
        } catch (error) {
            // abaikan jika storage gagal
        }
    }

    function readPendingRequest() {
        try {
            var raw = localStorage.getItem(RUNNER_PENDING_KEY);
            if (!raw) {
                return null;
            }
            var parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : null;
        } catch (error) {
            return null;
        }
    }

    function resolveRequestId(initialRequestId, xid) {
        if (initialRequestId) {
            return initialRequestId;
        }
        var pending = readPendingRequest();
        if (!pending) {
            return '';
        }
        if (xid && pending.xid && String(pending.xid) === String(xid)) {
            return pending.requestId || '';
        }
        return '';
    }

    function closeCurrentTab() {
        setTimeout(function () {
            window.close();
        }, 250);
    }

    function findPrintClaimButton() {
        return document.querySelector('input[type="button"][value="Cetak Klaim"]');
    }

    function waitForPrintClaimButton(maxAttempts, intervalMs, done) {
        var attempts = 0;
        var timer = setInterval(function () {
            attempts += 1;
            var button = findPrintClaimButton();
            if (button) {
                clearInterval(timer);
                done(button);
                return;
            }
            if (attempts >= maxAttempts) {
                clearInterval(timer);
                done(null);
            }
        }, intervalMs);
    }

    function getNoSEP() {
        var sepFromQuery = sanitizeFilePart(getQueryParam('runner_sep'));
        if (sepFromQuery) {
            return sepFromQuery;
        }

        var sepInput = document.getElementById('nosep') || document.querySelector('input[name="nosep"], input[name="sep"], #sep');
        if (sepInput && sepInput.value) {
            return sanitizeFilePart(sepInput.value);
        }

        var bodyText = (document.body && document.body.innerText) ? document.body.innerText : '';
        var sepMatch = bodyText.match(/\b\d{4}[A-Z0-9]{10,}\b/i);
        if (sepMatch && sepMatch[0]) {
            return sanitizeFilePart(sepMatch[0]);
        }

        return '';
    }

    async function downloadCetakKlaim(patientId, admissionId) {
        var basePath = '/E-Klaim/print/klaim.php';
        var printUrl = basePath + '?pid=' + encodeURIComponent(patientId) + '&adm=' + encodeURIComponent(admissionId);

        try {
            var response = await fetch(printUrl, {
                credentials: 'include'
            });

            if (!response.ok) {
                window.open(printUrl, '_blank');
                return { success: false, mode: 'print-opened' };
            }

            var blob = await response.blob();
            var contentType = (response.headers.get('content-type') || '').toLowerCase();
            var extension = contentType.indexOf('pdf') !== -1 ? 'pdf' : 'html';
            var noRM = sanitizeFilePart(getNoRM()) || sanitizeFilePart(patientId) || 'klaim';
            var noSEP = getNoSEP() || 'NoSEP';
            var fileName = noRM + '_' + noSEP + '_CetakKlaim.' + extension;

            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
            return { success: true, mode: 'blob-downloaded' };
        } catch (error) {
            window.open(printUrl, '_blank');
            return { success: false, mode: 'print-opened-error' };
        }
    }

    function runAutoDownload() {

        waitForPrintClaimButton(30, 400, async function (button) {
            var requestId = getQueryParam('runner_req');
            var xidFromUrl = getQueryParam('xid');
            var resolvedRequestId = resolveRequestId(requestId, xidFromUrl);

            if (!button) {
                emitRunnerAck({
                    type: RUNNER_TYPE_DONE,
                    requestId: resolvedRequestId,
                    xid: xidFromUrl,
                    status: 'button-not-found',
                    timestamp: Date.now()
                });
                closeCurrentTab();
                return;
            }
            var parsed = parsePrintClaimArgs(button.getAttribute('onclick'));
            if (!parsed) {
                emitRunnerAck({
                    type: RUNNER_TYPE_DONE,
                    requestId: resolvedRequestId,
                    xid: xidFromUrl,
                    status: 'invalid-print-args',
                    timestamp: Date.now()
                });
                closeCurrentTab();
                return;
            }

            var downloadResult = await downloadCetakKlaim(parsed.patientId, parsed.admissionId);
            emitRunnerAck({
                type: RUNNER_TYPE_DONE,
                requestId: resolvedRequestId,
                xid: xidFromUrl || parsed.admissionId,
                status: downloadResult && downloadResult.success ? 'downloaded' : 'fallback-opened',
                mode: downloadResult ? downloadResult.mode : '',
                timestamp: Date.now()
            });
            closeCurrentTab();
        });
    }

    function runWhenPageFullyLoaded(callback) {
        if (document.readyState === 'complete') {
            setTimeout(callback, 0);
            return;
        }
        window.addEventListener('load', callback, { once: true });
    }

    runWhenPageFullyLoaded(runAutoDownload);
})();



// ======================================================================================================
// ============================================= SCRIPT 2.2 ===========================================
// ======================================================================================================

// Klik berurutan Tanggal Masuk berdasarkan daftar No. SEP
(function () {
    'use strict';
    var allowedPrefix = 'http://192.168.108.105/E-Klaim/index.php?XP_klaim';
    if (!window.location.href.startsWith(allowedPrefix)) {
        return;
    }

    var RUNNER_ACK_KEY = 'eklaim.sepRunner.ack.v1';
    var RUNNER_TYPE_DONE = 'cetak-klaim-done';
    var RUNNER_PENDING_KEY = 'eklaim.sepRunner.pending.v1';
    var LICENSE_STORAGE_KEY = VEDIKA_LICENSE_CONFIG.STORAGE_KEY;
    var LICENSE_VERIFY_ENDPOINT = VEDIKA_LICENSE_CONFIG.VERIFY_ENDPOINT;
    var LICENSE_SECRET_HASHES = VEDIKA_LICENSE_CONFIG.SECRET_HASHES;

    var isRunning = false;
    var stopRequested = false;
    var isPaused = false;
    var panelCollapsed = false;
    var panel = null;
    var panelBody = null;
    var togglePanelBtn = null;
    var logoutLicenseBtn = null;
    var licenseCard = null;
    var licenseInput = null;
    var licenseSubmit = null;
    var licenseMsg = null;

    localStorage.removeItem(LICENSE_STORAGE_KEY);

    function normalizeText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function normalizeSEP(value) {
        return normalizeText(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    function createRequestId(index) {
        return 'req_' + Date.now().toString(36) + '_' + String(index) + '_' + Math.random().toString(36).slice(2, 8);
    }

    function withRunnerRequest(detailUrl, requestId, sepValue) {
        if (!detailUrl) {
            return '';
        }
        try {
            var url = new URL(detailUrl, window.location.origin);
            url.searchParams.set('runner_req', requestId);
            if (sepValue) {
                url.searchParams.set('runner_sep', sepValue);
            }
            return url.href;
        } catch (error) {
            var glue = detailUrl.indexOf('?') >= 0 ? '&' : '?';
            var extra = 'runner_req=' + encodeURIComponent(requestId);
            if (sepValue) {
                extra += '&runner_sep=' + encodeURIComponent(sepValue);
            }
            return detailUrl + glue + extra;
        }
    }

    function setPendingRequest(requestId, xid, sep) {
        try {
            localStorage.setItem(RUNNER_PENDING_KEY, JSON.stringify({
                requestId: requestId,
                xid: xid || '',
                sep: sep || '',
                startedAt: Date.now()
            }));
        } catch (error) {
            // abaikan jika storage gagal
        }
    }

    function clearPendingRequest(requestId) {
        try {
            var raw = localStorage.getItem(RUNNER_PENDING_KEY);
            if (!raw) {
                return;
            }
            var parsed = JSON.parse(raw);
            if (parsed && parsed.requestId === requestId) {
                localStorage.removeItem(RUNNER_PENDING_KEY);
            }
        } catch (error) {
            // abaikan jika storage gagal
        }
    }

    function waitForRunnerAck(requestId, expectedXid, onWaitingTick) {
        return new Promise(function (resolve) {
            var finished = false;
            var startedAt = Date.now();

            function finish(payload, stopped) {
                if (finished) {
                    return;
                }
                finished = true;
                window.removeEventListener('storage', onStorage);
                clearInterval(stopWatcher);
                clearInterval(waitingTicker);
                resolve({ payload: payload || null, stopped: !!stopped });
            }

            function parsePayload(raw) {
                if (!raw) {
                    return null;
                }
                try {
                    return JSON.parse(raw);
                } catch (error) {
                    return null;
                }
            }

            function isMatch(payload) {
                if (!payload || payload.type !== RUNNER_TYPE_DONE) {
                    return false;
                }
                if (payload.requestId && payload.requestId === requestId) {
                    return true;
                }
                if (expectedXid && payload.xid && String(payload.xid) === String(expectedXid)) {
                    return true;
                }
                return false;
            }

            function onStorage(event) {
                if (event.key !== RUNNER_ACK_KEY) {
                    return;
                }
                var payload = parsePayload(event.newValue);
                if (isMatch(payload)) {
                    finish(payload, false);
                }
            }

            window.addEventListener('storage', onStorage);

            var currentPayload = parsePayload(localStorage.getItem(RUNNER_ACK_KEY));
            if (isMatch(currentPayload)) {
                finish(currentPayload, false);
                return;
            }

            var stopWatcher = setInterval(function () {
                if (stopRequested) {
                    finish(null, true);
                }
            }, 150);

            var waitingTicker = setInterval(function () {
                if (typeof onWaitingTick === 'function') {
                    var elapsedSec = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
                    onWaitingTick(elapsedSec);
                }
            }, 1000);
        });
    }

    function parseSEPInput(value) {
        var raw = String(value || '').split(/[\n\r, ]+/).map(function (x) { return normalizeText(x); }).filter(Boolean);
        var seen = {};
        var unique = [];
        for (var i = 0; i < raw.length; i++) {
            if (seen[raw[i]]) {
                continue;
            }
            seen[raw[i]] = true;
            unique.push(raw[i]);
        }
        return unique;
    }

    function getDateLinkFromRow(row) {
        if (!row) {
            return null;
        }

        var xidLink = row.querySelector('a[href*="xid="]');
        if (xidLink) {
            return xidLink;
        }

        var anyLink = row.querySelector('a[href]');
        return anyLink || null;
    }

    function findDateCellBySEP(sepValue) {
        var targetSEP = normalizeSEP(sepValue);
        if (!targetSEP) {
            return null;
        }

        var structuredRows = Array.from(document.querySelectorAll('table.xxlist tbody tr, #listcontent table tbody tr, #listcontent tr'));
        for (var s = 0; s < structuredRows.length; s++) {
            var structuredTds = structuredRows[s].querySelectorAll('td');
            if (!structuredTds || structuredTds.length < 4) {
                continue;
            }

            var sepFrom4thCol = normalizeSEP(structuredTds[3].innerText || structuredTds[3].textContent || '');
            if (sepFrom4thCol !== targetSEP) {
                continue;
            }

            var dateLinkFrom2ndCol = structuredTds[1].querySelector('a[href*="xid="]') || structuredTds[1].querySelector('a[href]');
            if (dateLinkFrom2ndCol) {
                return dateLinkFrom2ndCol;
            }

            var anyDateLinkInRow = getDateLinkFromRow(structuredRows[s]);
            if (anyDateLinkInRow) {
                return anyDateLinkInRow;
            }
        }

        var sepCells = Array.from(document.querySelectorAll('td[id^="tdsep_"]'));
        for (var i = 0; i < sepCells.length; i++) {
            var sepText = normalizeSEP(sepCells[i].innerText || '');
            if (sepText !== targetSEP) {
                continue;
            }
            var suffix = sepCells[i].id.replace('tdsep_', '');
            var dateCell = document.getElementById('spadmdttm_' + suffix);
            if (!dateCell) {
                var rowById = document.getElementById('tradm_' + suffix);
                if (rowById) {
                    dateCell = rowById.querySelector('td a[href*="xid="]');
                }
            }
            if (dateCell) {
                return dateCell;
            }
        }

        var rows = Array.from(document.querySelectorAll('#listcontent tr, tr[id^="tradm_"], table tr'));
        for (var j = 0; j < rows.length; j++) {
            var tds = rows[j].querySelectorAll('td');
            if (!tds || !tds.length) {
                continue;
            }

            var hasExactSEP = false;
            for (var c = 0; c < tds.length; c++) {
                if (normalizeSEP(tds[c].innerText || '') === targetSEP) {
                    hasExactSEP = true;
                    break;
                }
            }

            if (!hasExactSEP) {
                continue;
            }

            var rowDateLink = getDateLinkFromRow(rows[j]);
            if (rowDateLink) {
                return rowDateLink;
            }
        }

        var genericRows = Array.from(document.querySelectorAll('table.xxlist tbody tr'));
        for (var k = 0; k < genericRows.length; k++) {
            var tds = genericRows[k].querySelectorAll('td');
            if (!tds || tds.length < 2) {
                continue;
            }
            var hasSEP = false;
            for (var m = 0; m < tds.length; m++) {
                if (normalizeSEP(tds[m].innerText || '') === targetSEP) {
                    hasSEP = true;
                    break;
                }
            }
            if (!hasSEP) {
                continue;
            }

            var genericDateLink = getDateLinkFromRow(genericRows[k]);
            if (genericDateLink) {
                return genericDateLink;
            }
        }

        return null;
    }

    function getDetailUrlFromDateCell(dateCell) {
        if (!dateCell) {
            return '';
        }

        if (dateCell.tagName && dateCell.tagName.toLowerCase() === 'a') {
            var href = dateCell.getAttribute('href') || '';
            if (href) {
                try {
                    return new URL(href, window.location.origin).href;
                } catch (error) {
                    return href;
                }
            }
        }

        var admissionId = getAdmissionIdFromDateCell(dateCell);
        if (!admissionId) {
            return '';
        }
        return buildDetailUrl(admissionId);
    }

    function getAdmissionIdFromDateCell(dateCell) {
        if (!dateCell) {
            return '';
        }

        if (dateCell.tagName && dateCell.tagName.toLowerCase() === 'a') {
            try {
                var linkUrl = new URL(dateCell.getAttribute('href'), window.location.origin);
                var xid = linkUrl.searchParams.get('xid');
                if (xid) {
                    return xid;
                }
            } catch (error) {
                // fallback ke parsing regex
            }
            var hrefValue = dateCell.getAttribute('href') || '';
            var hrefMatch = hrefValue.match(/[?&]xid=([^&]+)/i);
            if (hrefMatch) {
                return decodeURIComponent(hrefMatch[1]);
            }
        }

        if (dateCell.id && dateCell.id.indexOf('spadmdttm_') === 0) {
            return dateCell.id.replace('spadmdttm_', '');
        }

        var onclickValue = dateCell.getAttribute('onclick') || '';
        var match = onclickValue.match(/edit_admission\((['"])([^'"]+)\1/);
        return match ? match[2] : '';
    }

    function buildDetailUrl(admissionId) {
        var randomToken = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        return window.location.origin + '/E-Klaim/index.php?rand=' + encodeURIComponent(randomToken) + '&xid=' + encodeURIComponent(admissionId);
    }

    function createPanel() {
        panel = document.createElement('div');
        panel.style.position = 'fixed';
        panel.style.top = '20px';
        panel.style.right = '20px';
        panel.style.zIndex = 99999;
        panel.style.width = '360px';
        panel.style.maxWidth = 'calc(100vw - 24px)';
        panel.style.background = '#ffffff';
        panel.style.border = '1px solid #d1d5db';
        panel.style.borderRadius = '12px';
        panel.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
        panel.style.padding = '14px';
        panel.style.fontFamily = 'Segoe UI, Arial, sans-serif';
        panel.style.display = 'none';
        panel.innerHTML = '' +
            '<div id="sepRunnerPanelHeader" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
            '<div style="font-size:16px;font-weight:700;color:#111827;">Vedika Batch Tools</div>' +
            '<div style="display:flex;align-items:center;gap:6px;">' +
            '<button id="sepRunnerLicenseLogout" type="button" style="padding:6px 10px;border:1px solid #d1d5db;border-radius:8px;background:#ffffff;color:#374151;font-size:12px;font-weight:600;cursor:pointer;">Logout</button>' +
            '<button id="toggleSepRunnerPanel" type="button" style="width:28px;height:28px;border:1px solid #d1d5db;border-radius:8px;background:#f9fafb;color:#374151;font-size:16px;line-height:1;cursor:pointer;">−</button>' +
            '</div>' +
            '</div>' +
            '<div id="sepRunnerPanelBody" style="margin-top:4px;">' +
            '<div style="margin-top:4px;font-size:12px;color:#6b7280;">Klik kolom Tgl. Masuk berdasarkan daftar No. SEP</div>' +
            '<label style="display:block;margin-top:12px;font-size:12px;font-weight:600;color:#374151;">Daftar No. SEP</label>' +
            '<textarea id="sepInputRunner" rows="7" placeholder="Contoh: 1801R0040126V013887" style="width:100%;box-sizing:border-box;margin-top:6px;padding:8px 10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;resize:vertical;"></textarea>' +
            '<div style="margin-top:6px;font-size:11px;color:#6b7280;">Pisahkan dengan koma, spasi, atau baris baru.</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">' +
            '<button id="btnStartSepRunner" type="button" style="padding:9px 10px;border:none;border-radius:8px;background:#2563eb;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Start</button>' +
            '<button id="btnPauseSepRunner" type="button" style="padding:9px 10px;border:none;border-radius:8px;background:#d97706;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Pause</button>' +
            '<button id="btnResumeSepRunner" type="button" style="padding:9px 10px;border:none;border-radius:8px;background:#059669;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Resume</button>' +
            '<button id="btnStopSepRunner" type="button" style="padding:9px 10px;border:none;border-radius:8px;background:#b91c1c;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Stop</button>' +
            '</div>' +
            '<div style="margin-top:12px;padding:10px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">' +
            '<div style="margin-bottom:6px;font-size:12px;font-weight:600;color:#374151;">Progress</div>' +
            '<div style="width:100%;height:12px;background:#d1d5db;border-radius:999px;overflow:hidden;">' +
            '<div id="sepRunnerBar" style="height:100%;width:0%;background:#16a34a;"></div>' +
            '</div>' +
            '<div id="sepRunnerText" style="margin-top:6px;font-size:12px;color:#4b5563;">0 / 0 (0%)</div>' +
            '<div id="sepRunnerActive" style="margin-top:4px;font-size:11px;color:#374151;min-height:16px;">SEP aktif: -</div>' +
            '<div id="sepRunnerStatus" style="margin-top:4px;font-size:11px;color:#6b7280;min-height:16px;"></div>' +
            '<div id="sepRunnerFailed" style="margin-top:6px;font-size:11px;color:#b91c1c;white-space:pre-line;min-height:16px;">SEP gagal: -</div>' +
            '</div>' +
            '</div>';

        document.body.appendChild(panel);

        panelBody = document.getElementById('sepRunnerPanelBody');
        togglePanelBtn = document.getElementById('toggleSepRunnerPanel');
        logoutLicenseBtn = document.getElementById('sepRunnerLicenseLogout');

        return panel;
    }

    function createLicenseCard() {
        licenseCard = document.createElement('div');
        licenseCard.style.position = 'fixed';
        licenseCard.style.top = '20px';
        licenseCard.style.right = '20px';
        licenseCard.style.zIndex = 100000;
        licenseCard.style.width = '320px';
        licenseCard.style.maxWidth = 'calc(100vw - 24px)';
        licenseCard.style.boxSizing = 'border-box';
        licenseCard.style.background = '#ffffff';
        licenseCard.style.border = '1px solid #e5e7eb';
        licenseCard.style.borderRadius = '12px';
        licenseCard.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
        licenseCard.style.padding = '14px';
        licenseCard.style.fontFamily = 'Segoe UI, Arial, sans-serif';
        licenseCard.innerHTML = '' +
            '<div style="font-size:16px;font-weight:700;color:#111827;">License Verification</div>' +
            '<div style="margin-top:4px;font-size:12px;color:#6b7280;">Masukkan license key untuk menampilkan tools.</div>' +
            '<input id="sepRunnerLicenseInput" type="password" placeholder="Masukkan license key" style="width:100%;box-sizing:border-box;margin-top:10px;padding:9px 10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;">' +
            '<button id="sepRunnerLicenseSubmit" type="button" style="width:100%;margin-top:10px;padding:9px 10px;border:none;border-radius:8px;background:#111827;color:#fff;font-size:12px;font-weight:600;cursor:pointer;">Verifikasi License</button>' +
            '<div id="sepRunnerLicenseMsg" style="margin-top:8px;font-size:12px;color:#dc2626;min-height:16px;"></div>';

        document.body.appendChild(licenseCard);

        licenseInput = document.getElementById('sepRunnerLicenseInput');
        licenseSubmit = document.getElementById('sepRunnerLicenseSubmit');
        licenseMsg = document.getElementById('sepRunnerLicenseMsg');
    }

    function showToolsPanel() {
        if (panel) {
            panel.style.display = 'block';
        }
        if (licenseCard) {
            licenseCard.style.display = 'none';
        }
    }

    function showLicenseCard() {
        if (panel) {
            panel.style.display = 'none';
        }
        if (licenseCard) {
            licenseCard.style.display = 'block';
        }
    }

    function sha256HexFallback(text) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }

        var k = [
            1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075,
            -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716,
            -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
            -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895,
            666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259,
            -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
            430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
            1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998
        ];
        var h = [
            1779033703, -1150833019, 1013904242, -1521486534,
            1359893119, -1694144372, 528734635, 1541459225
        ];

        var input = unescape(encodeURIComponent(String(text || '')));
        var bytes = [];
        for (var bi = 0; bi < input.length; bi++) {
            bytes.push(input.charCodeAt(bi));
        }

        var bitLen = bytes.length * 8;
        bytes.push(0x80);
        while ((bytes.length % 64) !== 56) {
            bytes.push(0);
        }

        var high = Math.floor(bitLen / 4294967296);
        var low = bitLen >>> 0;
        bytes.push((high >>> 24) & 255, (high >>> 16) & 255, (high >>> 8) & 255, high & 255);
        bytes.push((low >>> 24) & 255, (low >>> 16) & 255, (low >>> 8) & 255, low & 255);

        for (var i = 0; i < bytes.length; i += 64) {
            var w = new Array(64);
            for (var j = 0; j < 16; j++) {
                var idx = i + (j * 4);
                w[j] = ((bytes[idx] << 24) | (bytes[idx + 1] << 16) | (bytes[idx + 2] << 8) | bytes[idx + 3]) >>> 0;
            }
            for (var t = 16; t < 64; t++) {
                var s0 = rightRotate(w[t - 15], 7) ^ rightRotate(w[t - 15], 18) ^ (w[t - 15] >>> 3);
                var s1 = rightRotate(w[t - 2], 17) ^ rightRotate(w[t - 2], 19) ^ (w[t - 2] >>> 10);
                w[t] = (((w[t - 16] + s0) >>> 0) + ((w[t - 7] + s1) >>> 0)) >>> 0;
            }

            var a = h[0] >>> 0;
            var b = h[1] >>> 0;
            var c = h[2] >>> 0;
            var d = h[3] >>> 0;
            var e = h[4] >>> 0;
            var f = h[5] >>> 0;
            var g = h[6] >>> 0;
            var hh = h[7] >>> 0;

            for (var r = 0; r < 64; r++) {
                var sum1 = (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) >>> 0;
                var ch = ((e & f) ^ ((~e) & g)) >>> 0;
                var temp1 = (((((hh + sum1) >>> 0) + ch) >>> 0) + ((k[r] + w[r]) >>> 0)) >>> 0;
                var sum0 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) >>> 0;
                var maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
                var temp2 = (sum0 + maj) >>> 0;

                hh = g;
                g = f;
                f = e;
                e = (d + temp1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (temp1 + temp2) >>> 0;
            }

            h[0] = (h[0] + a) >>> 0;
            h[1] = (h[1] + b) >>> 0;
            h[2] = (h[2] + c) >>> 0;
            h[3] = (h[3] + d) >>> 0;
            h[4] = (h[4] + e) >>> 0;
            h[5] = (h[5] + f) >>> 0;
            h[6] = (h[6] + g) >>> 0;
            h[7] = (h[7] + hh) >>> 0;
        }

        var hex = '';
        for (var hi = 0; hi < h.length; hi++) {
            hex += ('00000000' + (h[hi] >>> 0).toString(16)).slice(-8);
        }
        return hex;
    }

    async function sha256Hex(text) {
        var value = String(text || '');
        var canUseSubtle = !!(window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function');
        if (canUseSubtle) {
            var encoded = new TextEncoder().encode(value);
            var hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded);
            var hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
        }
        return sha256HexFallback(value);
    }

    async function isLicenseValid(inputValue) {
        var normalizedInput = String(inputValue || '').trim();
        if (!normalizedInput) {
            return false;
        }
        if (LICENSE_VERIFY_ENDPOINT) {
            try {
                var response = await fetch(LICENSE_VERIFY_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: normalizedInput })
                });
                if (response.ok) {
                    var payload = await response.json();
                    return !!(payload && payload.valid === true);
                }
            } catch (error) {
                // fallback ke hash lokal
            }
        }
        var hashed = await sha256Hex(normalizedInput);
        return LICENSE_SECRET_HASHES.includes(hashed);
    }

    async function submitLicense() {
        if (!licenseSubmit || !licenseMsg || !licenseInput) {
            return;
        }
        licenseSubmit.disabled = true;
        licenseMsg.textContent = 'Memverifikasi...';
        if (await isLicenseValid(licenseInput.value)) {
            localStorage.setItem(LICENSE_STORAGE_KEY, '1');
            licenseMsg.textContent = '';
            showToolsPanel();
            licenseSubmit.disabled = false;
            return;
        }
        licenseMsg.textContent = 'License tidak valid.';
        licenseSubmit.disabled = false;
    }

    function updateProgress(current, total) {
        var bar = document.getElementById('sepRunnerBar');
        var text = document.getElementById('sepRunnerText');
        var percent = total > 0 ? Math.round((current / total) * 100) : 0;
        if (bar) {
            bar.style.width = percent + '%';
        }
        if (text) {
            text.textContent = current + ' / ' + total + ' (' + percent + '%)';
        }
    }

    function updateStatus(message) {
        var status = document.getElementById('sepRunnerStatus');
        if (status) {
            status.textContent = message || '';
        }
    }

    function updateFailedSEPList(sepList) {
      var failed = document.getElementById('sepRunnerFailed');
      if (!failed) {
        return;
      }
      var values = Array.isArray(sepList) ? sepList : [];
      failed.textContent = values.length ? ('SEP gagal:\n' + values.join(', ')) : 'SEP gagal: -';
    }

    function updateActiveSEP(sepValue, state) {
        var active = document.getElementById('sepRunnerActive');
        if (active) {
            var activeState = state || 'idle';
            var color = '#374151';
            if (activeState === 'waiting') {
                color = '#b45309';
            } else if (activeState === 'done') {
                color = '#166534';
            } else if (activeState === 'error') {
                color = '#b91c1c';
            }

            active.textContent = 'SEP aktif: ' + (sepValue || '-');
            active.style.color = color;
        }
    }

    function setButtonsRunning(running) {
        var startBtn = document.getElementById('btnStartSepRunner');
        var pauseBtn = document.getElementById('btnPauseSepRunner');
        var resumeBtn = document.getElementById('btnResumeSepRunner');
        var stopBtn = document.getElementById('btnStopSepRunner');

        if (startBtn) {
            startBtn.disabled = running;
        }
        if (pauseBtn) {
            pauseBtn.disabled = !running || isPaused;
        }
        if (resumeBtn) {
            resumeBtn.disabled = !running || !isPaused;
        }
        if (stopBtn) {
            stopBtn.disabled = !running;
        }
    }

    function waitIfPaused(currentSep) {
        return new Promise(function (resolve) {
            if (!isPaused) {
                resolve();
                return;
            }

            var pauseWatcher = setInterval(function () {
                if (stopRequested) {
                    clearInterval(pauseWatcher);
                    resolve();
                    return;
                }

                if (!isPaused) {
                    clearInterval(pauseWatcher);
                    resolve();
                    return;
                }

                updateStatus('Paused. Menunggu Resume untuk lanjut ke SEP: ' + (currentSep || '-'));
            }, 250);
        });
    }

    async function runQueue(sepList) {
        isRunning = true;
        stopRequested = false;
        isPaused = false;
        setButtonsRunning(true);
        updateProgress(0, sepList.length);
        updateActiveSEP('-', 'idle');
        updateFailedSEPList([]);

        var openedCount = 0;
        var doneCount = 0;
        var failedSEPs = [];

        function markFailedSEP(sepValue) {
            var normalized = String(sepValue || '').trim();
            if (!normalized) {
                return;
            }
            if (failedSEPs.indexOf(normalized) >= 0) {
                return;
            }
            failedSEPs.push(normalized);
            updateFailedSEPList(failedSEPs);
        }

        for (var i = 0; i < sepList.length; i++) {
            if (stopRequested) {
                updateStatus('Proses dihentikan.');
                break;
            }

            var sep = sepList[i];
            await waitIfPaused(sep);
            if (stopRequested) {
                updateStatus('Proses dihentikan.');
                break;
            }

            updateProgress(i + 1, sepList.length);
            updateActiveSEP(sep, 'waiting');
            updateStatus('Memproses SEP: ' + sep);

            var dateCell = findDateCellBySEP(sep);
            if (!dateCell) {
                updateActiveSEP(sep, 'error');
                updateStatus('SEP tidak ditemukan: ' + sep);
                markFailedSEP(sep);
                continue;
            }

            var detailUrl = getDetailUrlFromDateCell(dateCell);
            if (!detailUrl) {
                updateActiveSEP(sep, 'error');
                updateStatus('Link detail tidak ditemukan untuk SEP: ' + sep);
                markFailedSEP(sep);
                continue;
            }

            var requestId = createRequestId(i);
            var expectedXid = getAdmissionIdFromDateCell(dateCell);
            var detailUrlWithReq = withRunnerRequest(detailUrl, requestId, sep);
            updateStatus('Membuka detail SEP: ' + sep + ' lalu menunggu download selesai...');
            setPendingRequest(requestId, expectedXid, sep);

            var openedTab = window.open(detailUrlWithReq, '_blank');
            if (openedTab) {
                openedCount += 1;
            } else {
                clearPendingRequest(requestId);
                updateActiveSEP(sep, 'error');
                updateStatus('Gagal membuka tab detail untuk SEP: ' + sep);
                markFailedSEP(sep);
                continue;
            }

            var ackResult = await waitForRunnerAck(requestId, expectedXid, function (elapsedSec) {
                updateStatus('Menunggu ACK script 2 untuk SEP: ' + sep + ' (' + elapsedSec + ' dtk)');
            });
            clearPendingRequest(requestId);
            if (ackResult.stopped) {
                updateStatus('Proses dihentikan saat menunggu respon script 2.');
                break;
            }

            doneCount += 1;
            var ackStatus = ackResult.payload && ackResult.payload.status ? ackResult.payload.status : 'done';
            if (ackStatus === 'downloaded') {
                updateActiveSEP(sep, 'done');
            } else {
                updateActiveSEP(sep, 'error');
              markFailedSEP(sep);
            }
            updateStatus('Selesai SEP: ' + sep + ' (' + ackStatus + ').');
        }

        if (!stopRequested) {
            updateStatus('Selesai. Dibuka: ' + openedCount + ', selesai: ' + doneCount + ', total: ' + sepList.length + '.');
        }

        isPaused = false;
        updateActiveSEP('-', 'idle');
        isRunning = false;
        setButtonsRunning(false);
    }

    function init() {
        createPanel();
        createLicenseCard();

        if (localStorage.getItem(LICENSE_STORAGE_KEY) === '1') {
            showToolsPanel();
        } else {
            showLicenseCard();
        }

        var startBtn = document.getElementById('btnStartSepRunner');
        var pauseBtn = document.getElementById('btnPauseSepRunner');
        var resumeBtn = document.getElementById('btnResumeSepRunner');
        var stopBtn = document.getElementById('btnStopSepRunner');
        var input = document.getElementById('sepInputRunner');

        if (!startBtn || !pauseBtn || !resumeBtn || !stopBtn || !input) {
            return;
        }

        setButtonsRunning(false);

        if (licenseSubmit && licenseInput) {
            licenseSubmit.addEventListener('click', submitLicense);
            licenseInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    submitLicense();
                }
            });
        }

        if (logoutLicenseBtn) {
            logoutLicenseBtn.addEventListener('click', function () {
                localStorage.removeItem(LICENSE_STORAGE_KEY);
                if (licenseInput) {
                    licenseInput.value = '';
                }
                if (licenseMsg) {
                    licenseMsg.textContent = '';
                }
                showLicenseCard();
                if (licenseInput) {
                    licenseInput.focus();
                }
            });
        }

        if (togglePanelBtn && panelBody) {
            togglePanelBtn.addEventListener('click', function () {
                panelCollapsed = !panelCollapsed;
                panelBody.style.display = panelCollapsed ? 'none' : 'block';
                togglePanelBtn.textContent = panelCollapsed ? '+' : '−';
            });
        }

        startBtn.addEventListener('click', function () {
            if (isRunning) {
                return;
            }
            var sepList = parseSEPInput(input.value);
            if (!sepList.length) {
                alert('Masukkan minimal satu No. SEP.');
                return;
            }
            updateStatus('Membuka link berdasarkan daftar SEP...');
            runQueue(sepList);
        });

        pauseBtn.addEventListener('click', function () {
            if (!isRunning || isPaused) {
                return;
            }
            isPaused = true;
            setButtonsRunning(true);
            updateStatus('Pause aktif. Proses akan lanjut setelah klik Resume.');
        });

        resumeBtn.addEventListener('click', function () {
            if (!isRunning || !isPaused) {
                return;
            }
            isPaused = false;
            setButtonsRunning(true);
            updateStatus('Resume diterima. Melanjutkan proses...');
        });

        stopBtn.addEventListener('click', function () {
            stopRequested = true;
            isPaused = false;
            setButtonsRunning(true);
            updateStatus('Permintaan stop diterima...');
        });
    }

    function runWhenPageFullyLoaded(callback) {
        if (document.readyState === 'complete') {
            setTimeout(callback, 0);
            return;
        }
        window.addEventListener('load', callback, { once: true });
    }

    runWhenPageFullyLoaded(init);
})();


