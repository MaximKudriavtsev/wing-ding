export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function delay<T>(value: T, minDelay = 1000): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), randomInt(minDelay, minDelay * 3));
  });
}
