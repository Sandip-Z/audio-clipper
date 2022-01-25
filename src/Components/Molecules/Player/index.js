import React, { useContext, useEffect } from "react";
import { Context } from "../../../Context/TimeSlotContext";

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

const DefaultPlayer = React.memo(({ className }) => {
  const context = useContext(Context);
  const {
    audioRef,
    audioSource,
    removeSource,
    selectedTimeSlot,
    handleFileUpload,
  } = context;
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

  if (audioSource) {
    return (
      <div className={`${className}--Wrapper`}>
        <audio
          controls
          className={className}
          ref={audioRef}
          onTimeUpdate={handleOnPlay}
        >
          <source src={audioSource} />
        </audio>
        <RemoveSource className={className} removeSource={removeSource} />
      </div>
    );
  }
  return <input type="file" onChange={handleFileUpload} accept="audio/*" />;
});

export default DefaultPlayer;
