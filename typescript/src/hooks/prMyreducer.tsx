import { useState } from "react"




const useMyReducer1=<A,B>(reducerFn:(state:A,action:B)=>A,initialState:A):
[A,(action:B)=>void]=>{
 const [state,setState]=useState(initialState)
 const dispatch=(action:B):void=>{
  let updateState=reducerFn(state,action)
  setState(updateState)
 }
 return[state,dispatch]
}

export default useMyReducer1