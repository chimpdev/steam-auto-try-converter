chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getMultiplier') {
    fetch('https://steam-auto-try-converter-extension-server-8148c7d0.skyhan.cloud')
      .then(response => response.text())
      .then(text => sendResponse(Number(text)));

    return true;
  }

  return true;
});
