import { useEffect, useRef, useState } from "react"


const useStopwatch=(intialValue)=>{
    const [time,setTime]=useState(0);
    const timerId=useRef(null);

    const start=()=>{
        if(!timerId.current){
            timerId.current =setInterval(()=>{
                setTime(prev=>prev+1);
            },1000)
        }
    }
    const pause=()=>{
        clearInterval(timerId.current);
        timerId.current=null;

    }
    const reset=()=>{
        clearInterval(timerId.current);
        timerId.current=null;
        setTime(0)
    }
    useEffect(()=>{
        return reset
    },[])
    return {time,start,reset,pause}
}
export default useStopwatch;