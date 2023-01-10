const MIN_ELEMENTS = 1;

export const generateRandomDecimal = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomBoolean = (): boolean => Math.random() > 0.5;

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomDecimal(0, items.length - 1)];

export const getRandomItems = <T>(elements: T[]):T[] => {
  const numElements = generateRandomDecimal(MIN_ELEMENTS, elements.length);
  const randomSortedElements = elements.sort(() => 0.5 - Math.random());

  return randomSortedElements.slice(0, numElements);
};
