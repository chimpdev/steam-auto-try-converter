![Header](https://socialify.git.ci/chimpdev/steam-auto-try-converter/image?pattern=Circuit%20Board&name=1&owner=1&language=1&stargazers=1&issues=1&description=1&theme=Light&font=Jost)

# Steam Auto TRY Converter Chrome Extension

This Chrome extension automatically converts prices on Steam to Turkish Lira (TRY) based on a real-time TRY/USD exchange rate. It is intended for users who prefer to view prices in TRY instead of USD.

## Features

- **Automatic Conversion:** The extension automatically converts prices on Steam pages using a real-time exchange rate.
- **Locale Support:** The extension detects the user's language preference and applies the conversion accordingly.

## How It Works

The extension utilizes the following key components:

### 1. `getLocale()`

This function retrieves the user's preferred language using Chrome's i18n API. If no language preference is found, it defaults to Turkish (tr-TR).

### 2. `getMultiplier()`

This function retrieves the conversion exchange rate either from the local storage cache or by sending a message to the background script. The exchange rate is cached to improve performance and expires every 3 hours.

### 3. `convertPrice(price)`

Given a price and the multiplier, this function converts the price to Turkish Lira and formats it as a currency string.

### 4. `handleFinalPrice(block)` and `handleOriginalPrice(block)`

These functions locate and convert final and original prices within Steam price blocks on the page.

### 5. `handleConvert()`

This function is called on page load and observes mutations in the document. It applies the conversion to various elements on the page, such as price blocks and downloadable content (DLC) prices.

## Usage

1. Install the extension by loading it as an unpacked extension in Chrome.
2. Open any Steam page where prices are displayed.
3. Prices will be automatically converted to Turkish Lira based on the current exchange rate.

## Installation

1. Clone this repository or download the source code.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right.
4. Click "Load unpacked" and select the folder containing the extension files.

## Development

Feel free to contribute to the development of this extension. Issues and pull requests are welcome.

## License

This extension is licensed under the [MIT License](LICENSE).