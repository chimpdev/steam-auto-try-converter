chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getMultiplier') {
    fetch('https://steam-price-converter.herokuapp.com')
      .then(response => response.text())
      .then(text => sendResponse(Number(text)));

    return true;
  }

  return true;
});
