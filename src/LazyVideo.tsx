import React, { useRef, useState, useEffect } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function LazyVideo({ src, autoPlay, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start loading the video source when it gets close to the viewport (400px margin)
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect(); // Only trigger loading once
        }
      },
      { rootMargin: '400px' }
    );

    loadObserver.observe(video);
    return () => loadObserver.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    // Play when in view, pause when out of view to save CPU/GPU resources
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (autoPlay) {
            video.play().catch((err) => {
              // Ignore abort errors which happen when playback is interrupted
              if (err.name !== 'AbortError') {
                console.warn("Auto-play blocked or failed:", err);
              }
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 } // Trigger as soon as 1% is visible
    );

    playObserver.observe(video);
    return () => playObserver.disconnect();
  }, [shouldLoad, autoPlay]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      preload="none"
      {...props}
    />
  );
}
