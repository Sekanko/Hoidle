import { waitForAnimationEnd } from '../functions/waitForAnimation.js';

describe('Wait for animation to end unit test', () => {
  test('Wait for animation to end', async () => {
    const element = document.createElement('div');

    const promise = waitForAnimationEnd(element);

    const event = new Event('animationend');
    element.dispatchEvent(event);

    await expect(promise).resolves.toBeUndefined();
  });
});
