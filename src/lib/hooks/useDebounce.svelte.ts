export const useDebounce = (initialValue: unknown, delay: number) => {
  let timeout = $state<NodeJS.Timeout | null>(null);
  let value = $state<unknown>(initialValue);

  const update = (newValue: unknown) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      value = newValue;
    }, delay);
  };

  return {
    get "value"() {
      return value;
    },
    update,
  };
};
