import {TimeSlotService} from '../../Services/TimeSlotService'

const InputTime = ({id, time, handleTimeChange, type}) => {

    const { 
        GetHoursFromSeconds, 
        GetLeftOverSecondsFromSeconds, 
        GetMinutesFromSeconds,
        GetChangedTimeToUpdateTimeFromInputs,
    } = TimeSlotService

    return <>
        <input 
            type="number" 
            id="customTimeComponent-Hour" 
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
        />
        <input 
            type="number" 
            id="customTimeComponent-Minute" 
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
            max={59}
            min={0}
        />
        <input 
            type="number" 
            id="customTimeComponent-Second" 
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
            max={59} 
            min={0}
        />
    </>
}

export default InputTime