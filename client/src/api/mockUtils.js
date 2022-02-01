export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const delay = (value, minDelay = 1000) => new Promise(resolve => {
  setTimeout(() => resolve(value), randomInt(minDelay, minDelay * 3));
});
