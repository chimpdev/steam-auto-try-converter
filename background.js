chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getMultiplier') {
    fetch('https://steam-auto-try-converter.up.railway.app')
      .then(response => response.text())
      .then(text => sendResponse(Number(text)));

    return true;
  }

  return true;
});
