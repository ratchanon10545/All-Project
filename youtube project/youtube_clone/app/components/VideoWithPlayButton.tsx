"use client";
import React, { useState, useRef } from 'react';

const VideoWithPlayButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = (): void => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {!isPlaying && (
        <>
          {/* Play Button */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full w-20 h-20 flex items-center justify-center cursor-pointer z-20 hover:bg-opacity-80"
            onClick={handlePlay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-5.197-3.013A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.013a1 1 0 000-1.664z"
              />
            </svg>
          </div>
        </>
      )}
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full"
        onPlay={() => setIsPlaying(true)}
        controls={isPlaying} // Controls appear after the video starts
      >
        <source src="/video/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoWithPlayButton;
