import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  fallbackIconSize?: number;
}

export function SafeImage({ 
  src, 
  alt, 
  className = '', 
  wrapperClassName = '',
  fallbackIconSize = 24,
  ...props 
}: SafeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If no source is provided at all, immediately show fallback
  if (!src) {
    return (
      <div className={`relative overflow-hidden bg-surface-elevated border border-border flex items-center justify-center ${wrapperClassName}`}>
        <ImageIcon size={fallbackIconSize} className="text-text-secondary/50" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-surface-elevated border border-border ${wrapperClassName}`}>
      {/* Skeleton / Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 w-full h-full animate-pulse bg-surface-elevated/50" />
      )}

      {/* Error / Fallback state */}
      {hasError && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <ImageIcon size={fallbackIconSize} className="text-text-secondary/50" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt || "Image"}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
}
