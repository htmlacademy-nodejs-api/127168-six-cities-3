const MIN_ELEMENTS = 1;

export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomBoolean = (): boolean => Boolean(Math.round(Math.random()));

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length - 1)];

export const getRandomItems = <T>(elements: T[]):T[] => {
  const numElements = generateRandomValue(MIN_ELEMENTS, elements.length);
  const usedElements: T[] = [];

  for (let i = 0; i < numElements; i++) {
    const newElement = getRandomItem(elements);

    if (usedElements.includes(newElement)) {
      i--;
      continue;
    }

    usedElements.push(newElement);
  }

  return usedElements;
};
