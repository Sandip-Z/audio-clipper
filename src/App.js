import { useContext } from "react";
import DefaultPlayer from "Components/Molecules/Player";
import TimeSlot from "Components/Organism/Timeslot";
import { Context } from "./Context/TimeSlotContext";

import "./App.css";

function App() {
  const audioContext = useContext(Context);

  const { timeSlots, handleAddTimeSlot } = audioContext;

  const renderTimeSlots = (timeSlots || []).map((each) => (
    <TimeSlot timeslot={each} key={each.id} />
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
        <DefaultPlayer className="audioInput" />
      </aside>
    </main>
  );
}

export default App;
