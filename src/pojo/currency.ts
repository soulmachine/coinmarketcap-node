import { Quote } from './quote';

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  last_updated: string;
  quote: {
    [key: string]: Quote;
  };
  [key: string]: unknown;
}
