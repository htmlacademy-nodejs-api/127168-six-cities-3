const DEFAULT_NUM_PADS = 3;
const DEFAULT_PAD_SYMBOL = '0';

export const convertNumWithPads =
  (num: number, numPads = DEFAULT_NUM_PADS, padSymbol = DEFAULT_PAD_SYMBOL):string =>
    num.toString().padStart(numPads, padSymbol);
