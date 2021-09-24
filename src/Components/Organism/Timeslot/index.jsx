import {
    TiDelete,
    TiDownload,
    TiMediaPlay,
    TiMediaPause,
  } from "react-icons/ti";

import InputTime from "Components/Molecules/InputTime";

const TimeSlot = ({
    timeslot, 
    handlePlaySelectedTimeSlot, 
    handleSelectedTimeSlotChanged, 
    selectedTimeSlot, 
    handleSelectedTimeSlotTimeChanged, 
    deleteTimeSlot,
    audioRef
  }) => {
    return (
            <div className="timeSlots__wrapper" key={`timeSlots${timeslot.id}`}>
              <div className="timeSlots__wrapper--checkboxWrapper">
                <input
                  type="checkbox"
                  checked={timeslot.id === selectedTimeSlot?.id ? true : false}
                  onChange={() => handleSelectedTimeSlotChanged(timeslot.id)}
                  title={
                    timeslot.id === selectedTimeSlot?.id
                      ? "Selected Time Slot"
                      : "Select this time slot to play"
                  }
                />
              </div>
              <div className="timeSlots__wrapper--inputAndButtonWrapper">
                <div className="timeSlots__wrapper--inputWrapper">
                  From:
                  <InputTime
                    key={`from-${timeslot.id}`}
                    type="startTime"
                    time={timeslot.startTime}
                    handleTimeChange={handleSelectedTimeSlotTimeChanged}
                    id={timeslot.id}
                  />
                  To:{" "}
                  <InputTime
                    key={`to-${timeslot.id}`}
                    type="endTime"
                    time={timeslot.endTime}
                    id={timeslot.id}
                    handleTimeChange={handleSelectedTimeSlotTimeChanged}
                  />
                </div>
                <div className="timeSlots__wrapper--buttonWrapper">
                  <button
                    onClick={() => deleteTimeSlot(timeslot.id)}
                    title="Delete this time slot"
                    className="clip-button"
                  >
                    <TiDelete size={22} color={"#d63031"} />
                  </button>
                  <button disabled={true} className="clip-button">
                    <TiDownload size={22} color={"#0984e3"} />
                  </button>
                  <button
                    onClick={() => {
                      handlePlaySelectedTimeSlot(timeslot.id);
                      audioRef?.current?.play();
                    }}
                    className="clip-button"
                  >
                    <TiMediaPlay size={22} color={"#00b894"} />
                  </button>
                </div>
              </div>
        </div>
    )
  }

export default TimeSlot