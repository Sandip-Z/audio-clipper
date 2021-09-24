import {TimeSlotService} from 'Services/TimeSlotService'

const InputTime = ({id, time, handleTimeChange, type, duration}) => {

    const { 
        GetHoursFromSeconds, 
        GetLeftOverSecondsFromSeconds, 
        GetMinutesFromSeconds,
        GetChangedTimeToUpdateTimeFromInputs,
    } = TimeSlotService

    return <div className="timeSlot">
        <input 
            type="number" 
            id="customTimeComponent-Hour"
            className="timeSlot--input" 
            value={GetHoursFromSeconds(time)} 
            onChange={(event)=>handleTimeChange(
                id, 
                type, 
                GetChangedTimeToUpdateTimeFromInputs(
                    {
                        type: "hour", 
                        value: event.target.value, 
                        seconds: time
                    }
                    ))}
            min={0}
            max={duration ? GetHoursFromSeconds(duration) : undefined}
        />
        <p>:</p>
        <input 
            type="number" 
            id="customTimeComponent-Minute" 
            className="timeSlot--input"
            value={GetMinutesFromSeconds(time)} 
            onChange={(event) =>handleTimeChange(
                id, 
                type, 
                GetChangedTimeToUpdateTimeFromInputs(
                    {
                        type: "minute", 
                        value: event.target.value, 
                        seconds: time
                    }
                    ))}
            max={duration ? GetMinutesFromSeconds(duration) : undefined}
            min={0}
        />
        <p>:</p>
        <input 
            type="number" 
            id="customTimeComponent-Second" 
            className="timeSlot--input"
            value={GetLeftOverSecondsFromSeconds(time)} 
            onChange={(event)=>handleTimeChange(
                id, 
                type, 
                GetChangedTimeToUpdateTimeFromInputs(
                    {
                        type: "second", 
                        value: parseInt(event.target.value), 
                        seconds: time
                    }
                    ))} 
            max={duration ? GetLeftOverSecondsFromSeconds(duration) : undefined} 
            min={0}
        />
    </div>
}

export default InputTime