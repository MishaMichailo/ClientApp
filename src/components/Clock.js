import { useState } from "react";
import '../style/ClockStyle.css';
const Clock = () =>{
    let time  = new Date().toLocaleTimeString()
  
    const [ctime,setTime] = useState(time)
    const UpdateTime=()=>{
      time =  new Date().toLocaleTimeString()
      setTime(time)
    }
    setInterval(UpdateTime)
    return( 
    <div className="clock-container">
    <h3>{ctime}</h3>
    </div>
    );
};

export default Clock