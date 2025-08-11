export function debounce<T>(func: (...args: Array<T>) => void, delay: number) {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: T[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
