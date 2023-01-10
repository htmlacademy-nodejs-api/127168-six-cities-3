export const convertNumWithPads =
  (num: number, numPads: number , padSymbol = '0'):string =>
    num.toString().padStart(numPads, padSymbol);
