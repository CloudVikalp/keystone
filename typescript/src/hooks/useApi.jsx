
import { useEffect, useState } from "react"


const useApi=(apiFn,initialData)=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [data,setData]=useState(initialData);
    const excute=async()=>{
        setLoading(true);
        try{
          let res= await apiFn()
          let data=res;
          setData(data)
        }
        catch(e){
            setError(true)
            console.log(e.message)

        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        excute();
    },[])
    return{loading,error,data,refetch:excute}
}

export default useApi