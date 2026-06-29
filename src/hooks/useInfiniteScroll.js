import { useRef, useCallback } from "react";

const useInfiniteScroll = (loading, hasMore, onLoadMore) => {
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading && hasMore) {
            onLoadMore();
          }
        },
        {
          threshold: 1,
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, onLoadMore],
  );

  return lastItemRef;
};

export default useInfiniteScroll;
