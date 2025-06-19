// Used to simulate a delay
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
