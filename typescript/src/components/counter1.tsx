import { useReducer } from "react";
import useMyReducer1 from "../hooks/prMyreducer";

type state = {
  count : number
}
enum CountType{
    INC="inc",
    DEC="dec"
}
type Action ={
    type:CountType;
    payload:number;
}

const reducer=(state:state,action:Action)=>{
    switch(action.type){
         case CountType.INC:{
            return{
                ...state,
                count:state.count+action.payload
            }
         }
         case CountType.DEC:{
            return{
                ...state,
                count:state.count-action.payload
            }
         }

        default:{
            return state
        }
    }
}



const Counter1=()=>{
    const [state,dispatch]=useMyReducer1(reducer,{count:0})
    return <div>
        <h1>count</h1>
        <button onClick={()=>dispatch({type:CountType.INC,payload:1})}>+</button>
        <button onClick={()=>dispatch({type:CountType.INC,payload:1})}>-</button>
    </div>
}