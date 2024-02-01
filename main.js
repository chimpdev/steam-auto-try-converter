let locale;
let multiplier;

function getLocale() {
  return new Promise(resolve => {
    chrome.i18n.getAcceptLanguages(list => resolve(list[0] || 'tr-TR'));
  });
}

function getMultiplier() {
  const cachedData = JSON.parse(localStorage.getItem('multiplier'));
  if (cachedData && cachedData.expires > Date.now()) return Promise.resolve(cachedData.data);

  return new Promise(resolve => {
    chrome.runtime.sendMessage('getMultiplier', response => {
      localStorage.setItem('multiplier', JSON.stringify({
        expires: Date.now() + 21600000,
        data: response,
      }));

      resolve(response);
    });
  });
}

function convertPrice(price) {
  return Number((price * multiplier).toFixed(2)).toLocaleString(locale, { style: 'currency', currency: 'TRY' });
}

function handleFinalPrice(block) {
  const finalPrice = block.querySelector('.discount_final_price');
  if (!finalPrice) return;

  const price = finalPrice.textContent.match(/\$(\d+\.\d+)/)?.[1];
  if (!price) return;

  finalPrice.textContent = convertPrice(price);
}

function handleOriginalPrice(block) {
  const originalPrice = block.querySelector('.discount_original_price');
  if (!originalPrice) return;

  const price = originalPrice.textContent.match(/\$(\d+\.\d+)/)?.[1];
  if (!price) return;

  originalPrice.textContent = convertPrice(price);
}

function handleConvert() {
  const discountBlocks = document.querySelectorAll('[data-price-final]');
  discountBlocks.forEach(block => {
    handleFinalPrice(block);
    handleOriginalPrice(block);
  });

  const dlcPrices = document.querySelectorAll('.game_area_dlc_price');
  dlcPrices.forEach(block => {
    const price = block.textContent.match(/\$(\d+\.\d+)/)?.[1];
    if (!price) return;

    // eslint-disable-next-line no-param-reassign
    block.textContent = convertPrice(price);
  });

  const dlcPurchaseActionButtons = document.querySelectorAll('.game_purchase_price.price');
  dlcPurchaseActionButtons.forEach(block => {
    const price = block.textContent.match(/\$(\d+\.\d+)/)?.[1];
    if (!price) return;

    // eslint-disable-next-line no-param-reassign
    block.textContent = convertPrice(price);
  });
}

console.log(
  '%cSteam Auto TRY Converter %cLoading..',
  'background: #171d25; padding: 5px 20px 5px 20px; border-radius: 10px; color: white; font-size: 16px; font-weight: bold;',
  'margin-left: 10px; font-size: 16px; font-weight: bold;',
);

document.body.onload = async () => {
  multiplier = await getMultiplier();
  locale = await getLocale();
  handleConvert();

  const observer = new MutationObserver(handleConvert);
  observer.observe(document.body, { childList: true, subtree: true });

  console.log(
    `%cSteam Auto TRY Converter %cCurrent Multiplier: ${multiplier} %cCurrent Locale: ${locale}`,
    'background: #171d25; padding: 5px 20px 5px 20px; border-radius: 10px; color: white; font-size: 16px; font-weight: bold;',
    'margin-left: 10px; font-size: 16px; font-weight: bold;',
    'margin-left: 10px;font-size: 16px; font-weight: bold;',
  );
};
