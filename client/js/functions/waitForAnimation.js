export function waitForAnimationEnd(element) {
  return new Promise(resolve => {
    element.addEventListener("animationend", () => {
      resolve("done");
    }, { once: true });
  });
}
