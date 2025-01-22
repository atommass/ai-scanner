chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "scanForAI",
      title: "Scan for AI-generated content",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "scanForAI" && info.selectionText) {
      handleApiRequest(info.selectionText, tab.id);
    }
  });
  
  function handleApiRequest(text, tabId) {
    chrome.storage.sync.get(["zeroGptKey"], (result) => {
      if (!result.zeroGptKey) {
        chrome.tabs.sendMessage(tabId, {
          action: "showError",
          error: "ZeroGPT API key is missing. Please set it in the extension options."
        });
        return;
      }
  
      fetch("https://api.zerogpt.com/api/detect/detectText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ApiKey": result.zeroGptKey
        },
        body: JSON.stringify({
          text: text,
          input_text: text
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.data) {
          chrome.tabs.sendMessage(tabId, {
            action: "showResult",
            data: data.data
          });
        } else {
          throw new Error(data.message || "Invalid API response");
        }
      })
      .catch(error => {
        chrome.tabs.sendMessage(tabId, {
          action: "showError",
          error: error.message
        });
      });
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getApiKeys") {
      chrome.storage.sync.get(["zeroGptKey"], (result) => {
        sendResponse({zeroGptKey: result.zeroGptKey});
      });
      return true;
    }
  });
  