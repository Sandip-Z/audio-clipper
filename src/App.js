import { useState, useRef, useEffect, useCallback } from "react";
import InputTime from "Components/InputTime";
import DefaultPlayer from "Components/Player/default";
import { TimeSlotService } from "Services/TimeSlotService";
import {
  TiDelete,
  TiDownload,
  TiMediaPlay,
  TiMediaPause,
} from "react-icons/ti";
import "./App.css";

function App() {
  const audioRef = useRef(null);
  const [sourceDuration, setSourceDuration] = useState(0);
  const [timeSlots, setTimeSlots] = useState(undefined);
  const [audioSource, setAudioSource] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(undefined);

  const { GenerateIdForTimeSlot } = TimeSlotService;

  useEffect(() => {
    var defaultTimeSlot = {
      id: GenerateIdForTimeSlot(),
      startTime: 0,
      endTime: 0,
      selected: true,
    };
    if (audioSource) {
      var loadedMetaDataEvent = audioRef?.current?.addEventListener(
        "loadedmetadata",
        () => {
          const duration = Math.trunc(audioRef?.current?.duration);
          defaultTimeSlot.endTime = duration;
          setSelectedTimeSlot(defaultTimeSlot);
          setTimeSlots([defaultTimeSlot]);
          setSourceDuration(duration);
        }
      );
    }
    return () =>
      loadedMetaDataEvent?.removeEventListener("loadedmetadata", () => {});
  }, [audioSource]);

  //This function runs when time, either startTime or endTime of a selected time slot is changed.
  const handleSelectedTimeSlotTimeChanged = (id, type, time) => {
    const newTime = {
      ...selectedTimeSlot,
      [type]: time,
    };
    const timeSlotIndex = timeSlots?.findIndex((each) => each.id === id);
    const newTimeSlot = [...timeSlots];
    newTimeSlot[timeSlotIndex] = {
      ...newTimeSlot[timeSlotIndex],
      [type]: time,
    };
    if (id === selectedTimeSlot?.id) {
      setSelectedTimeSlot(newTime);
    }
    setTimeSlots(newTimeSlot);
  };

  const handleSelectedTimeSlotChanged = (id) => {
    const matchedIndex = timeSlots.findIndex((each) => each.id === id);
    const newSelectedTimeSlot = { ...timeSlots[matchedIndex], selected: true };
    const updatedTimeSlot = timeSlots.map((slot) => {
      if (slot.id === id) {
        return {
          ...slot,
          selected: true,
        };
      }
      return {
        ...slot,
        selected: false,
      };
    });
    setSelectedTimeSlot(newSelectedTimeSlot);
    setTimeSlots(updatedTimeSlot);
  };

  const renderTimeSlots = useCallback(() => {
    return (timeSlots || []).map((each) => {
      return (
        <div className="timeSlots__wrapper" key={`timeSlots${each.id}`}>
          <div className="timeSlots__wrapper--checkboxWrapper">
            <input
              type="checkbox"
              checked={each.id === selectedTimeSlot?.id ? true : false}
              onChange={() => handleSelectedTimeSlotChanged(each.id)}
              title={
                each.id === selectedTimeSlot?.id
                  ? "Selected Time Slot"
                  : "Select this time slot to play"
              }
            />
          </div>
          <div className="timeSlots__wrapper--inputAndButtonWrapper">
            <div className="timeSlots__wrapper--inputWrapper">
              From:
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
            </div>
            <div className="timeSlots__wrapper--buttonWrapper">
              <button
                onClick={() => deleteTimeSlot(each.id)}
                title="Delete this time slot"
                className="clip-button"
              >
                <TiDelete size={22} color={"#d63031"} />
              </button>
              <button disabled={true} className="clip-button">
                <TiDownload size={22} color={"#0984e3"} />
              </button>
              <button
                onClick={() => handlePlaySelectedTimeSlot(each.id)}
                className="clip-button"
              >
                <TiMediaPlay size={22} color={"#00b894"} />
              </button>
            </div>
          </div>
        </div>
      );
    });
  }, [timeSlots]);

  //This function adds new time slot
  const handleAddTimeSlot = () => {
    const newId = GenerateIdForTimeSlot();
    const newTimeSlot = [
      ...timeSlots,
      {
        id: newId,
        startTime: 0,
        endTime: sourceDuration,
        selected: false,
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
        <div>{renderTimeSlots()}</div>
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
