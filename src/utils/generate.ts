export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomBoolean() {
  return Boolean(generateRandomValue(0, 1));
}

export function getRandomAvatarUrl() {
  return 'https://i.pravatar.cc/300';
}

export function generatePassword() {
  return getRandomItem(['123', 'testtest']);
}
