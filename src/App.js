import DefaultPlayer from "Components/Molecules/Player";
import TimeSlot from "Components/Organism/Timeslot";
import { useTimeslot } from "hook/useTimeslot";
import "./App.css";

function App() {
  const {
    audioRef,
    timeSlots,
    audioSource,
    selectedTimeSlot,
    handleAddTimeSlot,
    handleSelectedTimeSlotChanged,
    handleFileUpload,
    handlePlaySelectedTimeSlot,
    handleSelectedTimeSlotTimeChanged,
    deleteTimeSlot,
    removeSource,
  } = useTimeslot();

  const renderTimeSlots = (timeSlots || []).map((each) => (
    <TimeSlot
      timeslot={each}
      handlePlaySelectedTimeSlot={handlePlaySelectedTimeSlot}
      handleSelectedTimeSlotChanged={handleSelectedTimeSlotChanged}
      handleSelectedTimeSlotTimeChanged={handleSelectedTimeSlotTimeChanged}
      deleteTimeSlot={deleteTimeSlot}
      key={each.id}
      selectedTimeSlot={selectedTimeSlot}
      audioRef={audioRef}
    />
  ));

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
