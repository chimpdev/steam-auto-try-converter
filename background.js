chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getMultiplier') {
    fetch('https://ff925917-f4dd-4cbd-b188-c7dea6aba642.bencan.net')
      .then(response => response.text())
      .then(text => sendResponse(Number(text)));

    return true;
  }

  return true;
});
