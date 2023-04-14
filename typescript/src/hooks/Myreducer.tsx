import { useState } from "react"


export const useMyReducer=<T, U>(reducerfn :(state:T,action:U)=>T,initialState:T):[T,(action:U)=>void]=>{
    const [state,setState]= useState<T>(initialState)

    const dispatch=(action:U):void=>{
        let updateState=reducerfn(state,action);
      setState(updateState)
    }
    return [state,dispatch ]
}