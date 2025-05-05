import {waitForAnimationEnd} from '../functions/wait_for_animation.js';

describe('Wait for animation to end unit test', () => {
  test('Wait for animation to end', async () => {
    const element = document.createElement('div');

    const promise = waitForAnimationEnd(element);

    setTimeout(() => {
      const event = new Event('animationend');
      element.dispatchEvent(event);
    }, 1000);

    await expect(promise).resolves.toBe('done');
  });
});
