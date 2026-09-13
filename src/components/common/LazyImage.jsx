import { useEffect, useRef, useState } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  style,
  ...props
}) => {
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const node = imgRef.current;

    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!shouldLoad && (
        <div
          ref={imgRef}
          className={placeholderClassName || "lazy-image-placeholder"}
          aria-hidden="true"
        />
      )}

      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? "lazy-image--loaded" : "lazy-image--loading"}`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setIsLoaded(true)}
          style={style}
          {...props}
        />
      )}
    </>
  );
};

export default LazyImage;
