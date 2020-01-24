import { strict as assert } from 'assert';
import Axios from 'axios';
import qs from 'qs';
import { Currency } from './pojo/currency';

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

export default class CoinMarketCap {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async get(path: string, data: string): Promise<any> {
    const response = await Axios.get(`${BASE_URL}${path}`, {
      data,
      headers: {
        'X-CMC_PRO_API_KEY': this.apiKey,
        Accept: 'application/json',
        'Accept-Charset': 'utf-8',
        'Accept-Encoding': 'deflate, gzip',
      },
    });

    assert.equal(response.status, 200);
    assert.equal(response.data.status.error_code, 0);

    return response.data.data;
  }

  public async listingsLatest(
    params: {
      start: number;
      limit: number;
      volume_24h_min?: number;
      convert: string | Array<'USD' | 'USDT' | 'BTC' | 'ETH' | 'XRP' | 'BCH' | 'LTC'>;
      convert_id?: string | number[];
      sort:
        | 'name'
        | 'symbol'
        | 'date_added'
        | 'market_cap'
        | 'market_cap_strict'
        | 'price'
        | 'circulating_supply'
        | 'total_supply'
        | 'max_supply'
        | 'num_market_pairs'
        | 'volume_24h'
        | 'percent_change_1h'
        | 'percent_change_24h'
        | 'percent_change_7d'
        | 'market_cap_by_total_supply_strict'
        | 'volume_7d'
        | 'volume_30d';
      sor_dir: 'desc' | 'asc';
      cryptocurrency_type: 'all' | 'coins' | 'tokens';
      aux?:
        | string
        | Array<
            | 'num_market_pairs'
            | 'cmc_rank'
            | 'date_added'
            | 'tags'
            | 'platform'
            | 'max_supply'
            | 'circulating_supply'
            | 'total_supply'
            | 'market_cap_by_total_supply'
            | 'volume_24h_reported'
            | 'volume_7d'
            | 'volume_7d_reported'
            | 'volume_30d'
            | 'volume_30d_reported'
          >;
    } = {
      start: 1,
      limit: 100,
      convert: ['USD'],
      sort: 'market_cap',
      sor_dir: 'desc',
      cryptocurrency_type: 'all',
    },
  ): Promise<Currency[]> {
    const path = '/cryptocurrency/listings/latest';

    if (Array.isArray(params.convert)) {
      params.convert = params.convert.join(','); // eslint-disable-line no-param-reassign
    }
    if (params.convert_id) {
      if (Array.isArray(params.convert_id)) {
        params.convert_id = params.convert_id.join(','); // eslint-disable-line no-param-reassign
      }
    }
    if (params.aux) {
      if (Array.isArray(params.aux)) {
        params.aux = params.aux.join(','); // eslint-disable-line no-param-reassign
      }
    }

    const data = qs.stringify(params);
    console.info(data);
    const tmp = await this.get(path, data);
    return tmp;
  }
}
