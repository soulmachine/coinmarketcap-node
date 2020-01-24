# coinmarketcap-node

A complete Node.js library for CoinmarketCap.

## How to use

```javascript
/* eslint-disable import/no-unresolved,no-console */
const CoinMarketCap = require('coinmarketcap-node').default;

(async () => {
  const coinmarketcap = new CoinMarketCap('apiKey');
  const currencies = await coinmarketcap.listingsLatest();
  console.info(currencies);
})();
```
