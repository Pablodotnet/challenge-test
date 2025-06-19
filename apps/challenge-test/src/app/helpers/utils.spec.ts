import { sleep } from './';

describe('sleep', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should resolve after the specified timeout', async () => {
    const callback = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const promise = sleep(1000).then(callback);

    // Nothing should be called yet
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    // Wait for any pending promises
    await Promise.resolve();

    expect(callback).toHaveBeenCalled();
  });

  it('should delay for the correct amount of time', () => {
    const spy = jest.spyOn(global, 'setTimeout');

    sleep(500);

    expect(spy).toHaveBeenCalledWith(expect.any(Function), 500);

    spy.mockRestore();
  });
});
