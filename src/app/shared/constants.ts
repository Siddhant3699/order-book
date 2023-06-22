export const URLs = {
  SYMBOLS: 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',
  BOOK: 'wss://api-pub.bitfinex.com/ws/2',
};

export const COLUMNS = {
  BIDS: ['count', 'amount', 'total', 'price'],
  ASKS: ['price', 'total', 'amount', 'count'],
};

export const SERVER_MESSAGE = {
  event: 'subscribe',
  channel: 'book',
  symbol: 'tBTCUSD',
};
