import { useContext } from "react/cjs/react.development";
import { TimeSlotService } from "Services/TimeSlotService";
import { Context } from "../../../Context/TimeSlotContext";

const InputTime = ({ id, time, type, duration }) => {
  const {
    GetHoursFromSeconds,
    GetLeftOverSecondsFromSeconds,
    GetMinutesFromSeconds,
    GetChangedTimeToUpdateTimeFromInputs,
  } = TimeSlotService;

  const context = useContext(Context);
  const { handleSelectedTimeSlotTimeChanged } = context;

  return (
    <div className="timeSlot">
      <input
        type="number"
        id="customTimeComponent-Hour"
        className="timeSlot--input"
        value={GetHoursFromSeconds(time)}
        onChange={(event) =>
          handleSelectedTimeSlotTimeChanged(
            id,
            type,
            GetChangedTimeToUpdateTimeFromInputs({
              type: "hour",
              value: event.target.value,
              seconds: time,
            })
          )
        }
        min={0}
        max={duration ? GetHoursFromSeconds(duration) : undefined}
      />
      <p>:</p>
      <input
        type="number"
        id="customTimeComponent-Minute"
        className="timeSlot--input"
        value={GetMinutesFromSeconds(time)}
        onChange={(event) =>
          handleSelectedTimeSlotTimeChanged(
            id,
            type,
            GetChangedTimeToUpdateTimeFromInputs({
              type: "minute",
              value: event.target.value,
              seconds: time,
            })
          )
        }
        max={duration ? GetMinutesFromSeconds(duration) : undefined}
        min={0}
      />
      <p>:</p>
      <input
        type="number"
        id="customTimeComponent-Second"
        className="timeSlot--input"
        value={GetLeftOverSecondsFromSeconds(time)}
        onChange={(event) =>
          handleSelectedTimeSlotTimeChanged(
            id,
            type,
            GetChangedTimeToUpdateTimeFromInputs({
              type: "second",
              value: parseInt(event.target.value),
              seconds: time,
            })
          )
        }
        max={duration ? GetLeftOverSecondsFromSeconds(duration) : undefined}
        min={0}
      />
    </div>
  );
};

export default InputTime;
