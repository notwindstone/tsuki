export default function throttle(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any) => void,
  delay: number,
) {
  let initialTime = 0;

  return function (...args: []) {
    const now = Date.now();

    if (now - initialTime >= delay) {
      fn.apply(this, args);

      initialTime = now;
    }
  };
}
