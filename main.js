function getLocale() {
  return new Promise(resolve => {
    chrome.i18n.getAcceptLanguages(list => resolve(list[0] || 'tr-TR'));
  });
}

const multiplier = 30;
const locale = getLocale();

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

document.body.onload = async () => {
  handleConvert();

  const observer = new MutationObserver(handleConvert);
  observer.observe(document.body, { childList: true, subtree: true });
};
