import React from "react";

const RemoveSource = ({ removeSource }) => {
  return <button onClick={removeSource}>Remove</button>;
};

const DefaultPlayer = ({ className, src, handleFileUpload, removeSource }) => {
  if (src) {
    return (
      <>
        <audio controls className={className}>
          <source src={src} />
        </audio>
        <RemoveSource removeSource={removeSource} />
      </>
    );
  }
  return <input type="file" onChange={handleFileUpload} accept="audio/*" />;
};

export default DefaultPlayer;
