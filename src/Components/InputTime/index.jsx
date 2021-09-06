import {useState} from 'react'

const InputTime = () => {
    const [hour, setHour] = useState();
    return <>
        <input type="number" id="customTimeComponent-Hour"/>
        <input type="number" id="customTimeComponent-Minute"/>
        <input type="number" id="customTimeComponent-Second"/>
    </>
}

export default InputTime