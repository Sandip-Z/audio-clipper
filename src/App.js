import { useState } from "react";
import "./App.css";

function App() {
  const [timeSlots, setTimeSlots] = useState([
    {
      id: "1",
      from: undefined,
      to: undefined,
    },
  ]);
  const [audioSource, setAudioSource] = useState(null);

  const renderTimeSlots = (timeSlots || []).map((each) => (
    <div className="timeslots__wrapper">
      <div className="timeslots__wrapper--input">
        <input
          type="time"
          id={`from-${each.id}`}
          key={`from-${each.id}`}
          value={each.from}
        />
        <input
          type="time"
          id={`to-${each.id}`}
          key={`to-${each.id}`}
          value={each.to}
        />
      </div>
      <div className="timeslots__wrapper--button">
        <button onClick={() => deleteTimeSlot(each.id)}>delete</button>
        <button>download</button>
      </div>
    </div>
  ));

  const handleAddTimeSlot = () => {
    const newId = timeSlots.length + 1;
    const newTimeSlot = [
      ...timeSlots,
      {
        id: newId,
        from: undefined,
        to: undefined,
      },
    ];
    setTimeSlots(newTimeSlot);
  };

  const deleteTimeSlot = (id) => {
    const newTimeSlot = timeSlots.filter((each) => each.id !== id);
    setTimeSlots(newTimeSlot);
  };

  const handleFileUpload = (e) => {
    const source = URL.createObjectURL(e.target.files[0]);
    setAudioSource(source);
  };

  return (
    <main>
      <section>
        <div className="time-slot-controller">
          <p className="time-slot-controller__title">Crop audio files</p>
          <button
            className="time-slot-controller__button"
            onClick={handleAddTimeSlot}
          >
            Add time slot
          </button>
        </div>
        <div>{renderTimeSlots}</div>
      </section>
      <aside>
        {audioSource ? (
          <audio controls className="audioInput">
            <source src={audioSource} />
          </audio>
        ) : (
          <input type="file" onChange={handleFileUpload} accept="audio/*" />
        )}
      </aside>
    </main>
  );
}

export default App;
