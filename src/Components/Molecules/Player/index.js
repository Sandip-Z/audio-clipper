import React, { useEffect } from "react";

const RemoveSource = ({ className, removeSource }) => {
  return (
    <button
      onClick={removeSource}
      className={`${className}--removeButton`}
      title="Remove current source"
    >
      Remove
    </button>
  );
};

const DefaultPlayer = React.memo(
  ({
    className,
    src,
    audioRef,
    handleFileUpload,
    removeSource,
    selectedTimeSlot,
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
        <div className={`${className}--Wrapper`}>
          <audio
            controls
            className={className}
            ref={audioRef}
            onTimeUpdate={handleOnPlay}
          >
            <source src={src} />
          </audio>
          <RemoveSource className={className} removeSource={removeSource} />
        </div>
      );
    }
    return <input type="file" onChange={handleFileUpload} accept="audio/*" />;
  }
);

export default DefaultPlayer;
