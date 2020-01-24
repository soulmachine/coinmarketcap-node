#!/usr/bin/env node
import { strict as assert } from 'assert';
import yargs from 'yargs';
import CoinMarketCap from './index';

const { argv } = yargs.options({
  apiKey: { type: 'string', demandOption: true },
});
assert.ok(argv.apiKey);

(async () => {
  const coinmarketcap = new CoinMarketCap(argv.apiKey);
  // console.info(await coinmarketcap.listingsLatest());
  console.info(
    await coinmarketcap.quotesLatest({
      symbol: ['BTC', 'DAI', 'EOS', 'ETH', 'PAX', 'TRX', 'USDC', 'USDT'],
      convert: 'USD',
    }),
  );
})();
