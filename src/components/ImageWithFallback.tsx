import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({
  src,
  alt,
  className
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // Tenta importar dinamicamente
      import('../assets/images/characters/placeholder.gif')
        .then(module => {
          setImgSrc(module.default);
        })
        .catch(() => {
          // Fallback SVG se o GIF não carregar
          setImgSrc(`data:image/svg+xml;base64,${btoa(`
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#8B0000"/>
              <text x="50" y="50" text-anchor="middle" fill="#FFD700" font-family="Arial" font-size="14">JOJO</text>
            </svg>
          `)}`);
        });
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;