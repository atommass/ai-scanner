chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showResult") {
      const percentage = request.data.fakePercentage;
      const feedback = request.data.feedback || '';
      showResult(`AI-generated probability: ${percentage}%\n${feedback}`);
    } else if (request.action === "showError") {
      showError(request.error);
    }
  });
  
  function showResult(message) {
    const resultDiv = document.createElement('div');
    resultDiv.textContent = message;
    resultDiv.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 9999;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(resultDiv);
    setTimeout(() => resultDiv.remove(), 5000);
  }
  
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: #f44336;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 9999;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }
  