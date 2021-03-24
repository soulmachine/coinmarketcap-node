#!/usr/bin/env node
import { strict as assert } from 'assert';
import yargs from 'yargs';
import CoinMarketCap from './index';

const { argv } = yargs.options({
  api_key: { type: 'string', demandOption: true },
});
assert.ok(argv.api_key);

(async () => {
  const coinmarketcap = new CoinMarketCap(argv.api_key);
  // console.info(await coinmarketcap.listingsLatest());
  console.info(await coinmarketcap.fetchLatestGlobalMetrics({}));
})();
