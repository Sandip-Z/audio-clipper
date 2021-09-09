import React, { useEffect } from "react";

const RemoveSource = ({ removeSource }) => {
  return <button onClick={removeSource}>Remove</button>;
};

const DefaultPlayer = React.memo(
  ({
    className,
    src,
    handleFileUpload,
    removeSource,
    selectedTimeSlot,
    audioRef,
  }) => {
    const handleOnPlay = () => {
      if (
        Math.trunc(audioRef?.current?.currentTime) === selectedTimeSlot.endTime
      ) {
        audioRef.current.pause();
        audioRef.current.currentTime = selectedTimeSlot?.startTime || 0;
      }
    };

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = selectedTimeSlot?.startTime || 0;
      }
    });

    if (src) {
      return (
        <>
          <audio
            controls
            className={className}
            ref={audioRef}
            onTimeUpdate={handleOnPlay}
          >
            <source src={src} />
          </audio>
          <RemoveSource removeSource={removeSource} />
        </>
      );
    }
    return <input type="file" onChange={handleFileUpload} accept="audio/*" />;
  }
);

export default DefaultPlayer;
