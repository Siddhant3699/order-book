export type Message = {
  event: string;
  channel: string;
  symbol: string;
};

export type OrderBook = {
  price: number;
  count: number;
  amount: number;
  total?: number;
};
