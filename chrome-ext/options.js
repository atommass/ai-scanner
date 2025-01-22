document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('apiForm').addEventListener('submit', saveOptions);

function saveOptions(e) {
  e.preventDefault();
  const apiKey = document.getElementById('zeroGptKey').value.trim();
  
  if (!apiKey) {
    showStatus('API key cannot be empty', true);
    return;
  }

  chrome.storage.sync.set({
    zeroGptKey: apiKey
  }, () => {
    showStatus('Options saved successfully');
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    zeroGptKey: ''
  }, (items) => {
    document.getElementById('zeroGptKey').value = items.zeroGptKey;
  });
}

function showStatus(message, isError = false) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.color = isError ? '#f44336' : '#4CAF50';
  setTimeout(() => {
    status.textContent = '';
  }, 3000);
}
