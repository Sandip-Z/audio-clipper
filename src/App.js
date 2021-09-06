import { useState, useRef, useEffect } from "react";
import "./App.css";
import InputTime from "./Components/InputTime";
import DefaultPlayer from "./Components/Player/default";

function App() {
  const audioRef = useRef(null);
  const [timeSlots, setTimeSlots] = useState([
    {
      id: "1",
      startTime: 0,
      endTime: 0,
      selected: true,
    },
  ]);
  const [audioSource, setAudioSource] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    startTime: 0,
    endTime: 0,
    id: "1",
    selected: true,
  });

  useEffect(() => {
    if (audioSource) {
      audioRef?.current?.addEventListener("loadedmetadata", () => {
        const duration = Math.trunc(audioRef?.current?.duration);
        setSelectedTimeSlot({
          ...selectedTimeSlot,
          endTime: duration,
        });
        const newTimeSlot = [...timeSlots];
        newTimeSlot[0].endTime = duration;
        setTimeSlots(newTimeSlot);
        console.log("hh");
      });
    }
    // return () => settingDurationAtFirst.removeEventListener()
  }, [audioSource]);

  //This function runs when time, either startTime or endTime of a selected time slot is changed.
  const handleSelectedTimeSlotTimeChanged = (id, type, time) => {
    const newTime = {
      ...selectedTimeSlot,
      [type]: time,
    };
    const timeSlotIndex = timeSlots.findIndex((each) => each.id === id);
    const newTimeSlot = [...timeSlots];
    newTimeSlot[timeSlotIndex] = newTime;
    if (id === selectedTimeSlot.id) {
      setSelectedTimeSlot(newTime);
    }
    setTimeSlots(newTimeSlot);
  };

  const handleSelectedTimeSlotChanged = (id) => {
    const matchedIndex = timeSlots.findIndex((each) => each.id === id);
    setSelectedTimeSlot(timeSlots[matchedIndex]);
  };

  const renderTimeSlots = (timeSlots || []).map((each) => (
    <div className="timeSlots__wrapper" key={`timeSlots${each.id}`}>
      <input
        type="checkbox"
        checked={each.id === selectedTimeSlot.id ? true : false}
        onChange={() => handleSelectedTimeSlotChanged(each.id)}
      />
      From:{" "}
      <InputTime
        key={`from-${each.id}`}
        type="startTime"
        time={each.startTime}
        handleTimeChange={handleSelectedTimeSlotTimeChanged}
        id={each.id}
      />
      To:{" "}
      <InputTime
        key={`to-${each.id}`}
        type="endTime"
        time={each.endTime}
        id={each.id}
        handleTimeChange={handleSelectedTimeSlotTimeChanged}
      />
      <button onClick={() => deleteTimeSlot(each.id)}>delete</button>
      <button>download</button>
      <button onClick={() => handlePlaySelectedTimeSlot(each.id)}>Play</button>
    </div>
  ));

  //This function adds new time slot
  const handleAddTimeSlot = () => {
    const newId = timeSlots.length + 1;
    const newTimeSlot = [
      ...timeSlots,
      {
        id: newId,
        startTime: 0,
        endTime: 0,
      },
    ];
    setTimeSlots(newTimeSlot);
  };

  const deleteTimeSlot = (id) => {
    const newTimeSlot = timeSlots.filter((each) => each.id !== id);
    setTimeSlots(newTimeSlot);
  };

  const handlePlaySelectedTimeSlot = (id) => {
    const selectedIndex = timeSlots.findIndex((each) => each.id === id);
    setSelectedTimeSlot(timeSlots[selectedIndex]);
  };

  const handleFileUpload = (e) => {
    const source = URL.createObjectURL(e.target.files[0]);
    setAudioSource(source);
  };

  const removeSource = () => {
    setAudioSource(null);
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
        <DefaultPlayer
          src={audioSource}
          handleFileUpload={handleFileUpload}
          className="audioInput"
          removeSource={removeSource}
          selectedTimeSlot={selectedTimeSlot}
          audioRef={audioRef}
        />
      </aside>
    </main>
  );
}

export default App;
