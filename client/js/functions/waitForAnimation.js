export function waitForAnimationEnd(element) {
  return new Promise(resolve => {
    element.addEventListener("animationend", resolve(), { once: true });
  });
}
