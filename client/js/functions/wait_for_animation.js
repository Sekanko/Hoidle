export function waitForAnimationEnd(element, maxWait = 2000) {
  return new Promise(resolve => {
    const styles = window.getComputedStyle(element);
    const duration = parseFloat(styles.animationDuration) * 1000;
    const hasAnimation = styles.animationName !== "none" && duration > 0;

    if (!hasAnimation) {
      resolve("no-animation");
      return;
    }

    const handler = () => {
      clearTimeout(fallback);
      resolve("animationend");
    };

    element.addEventListener("animationend", handler, { once: true });
    element.addEventListener("webkitAnimationEnd", handler, { once: true });

    const fallback = setTimeout(() => {
      resolve("timeout");
    }, Math.min(duration + 100, maxWait));
  });
}
