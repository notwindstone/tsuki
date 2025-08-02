export const useIntersectionObserver = (options: {
  "threshold": number | Array<number>;
} = { "threshold": 0.5 }) => {
  let ref = $state<HTMLElement>();
  let observed = $state.raw<{
    "isIntersecting"   : boolean;
    "intersectionRatio": number;
  }>();
  let observer = $state<IntersectionObserver | null>(null);

  $effect(() => {
    if (ref) {
      observer = new IntersectionObserver(([entry]) => {
        observed = {
          "isIntersecting"   : entry.isIntersecting,
          "intersectionRatio": entry.intersectionRatio,
        };
      }, options);

      observer.observe(ref);

      return () => {
        if (observer) observer.disconnect();
      };
    }
  });

  return {
    get "observed"() {
      return observed;
    },
    get "ref"() {
      return ref;
    },
    set "ref"(element) {
      ref = element;
    },
  };
};
