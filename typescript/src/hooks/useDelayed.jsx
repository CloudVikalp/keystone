import { useState } from "react"

const useDelayed=(apiFn,initialData)=>{
    const [loading,setLoading] =useState(false);
    const [error,setError] = useState(false);
    const [data,setData]=useState(initialData);

    const execute=async (args)=>{
        setLoading(true);
        try {
            let data = await apiFn(args)
            setData(data)
        } catch (error) {
            setError(true)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,error,data,execute}

};

export default useDelayed