import {useState, useEffect} from 'react'

const InputTime = ({id, time, handleTimeChange, type}) => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);


    useEffect(() => {
        const hours = time / 60 / 60;
        const minutes = (time / 60 ) % 60;
        const seconds = (time % 60);
        setHour(Math.trunc(hours));
        setMinute(Math.trunc(minutes))
        setSecond(Math.trunc(seconds))
    },[time])

    useEffect(() => {
        const hrInSec = hour * 60 *60;
        const minInSec = minute * 60;
        const changedTime = hrInSec + minInSec + second;
        handleTimeChange(id, type, changedTime)
    }, [hour, minute, second])


    return <>
        <input type="number" id="customTimeComponent-Hour" value={hour} onChange={(event)=>setHour(event.target.value)}/>
        <input type="number" id="customTimeComponent-Minute" value={minute} onChange={(event) =>setMinute(event.target.value)} max={59}/>
        <input type="number" id="customTimeComponent-Second" value={second} onChange={(event)=>setSecond(parseInt(event.target.value))} max={59} />
    </>
}

export default InputTime