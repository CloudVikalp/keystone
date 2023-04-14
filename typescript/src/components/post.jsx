import useAPI from "../hooks/useApi";
import axios from "axios"
import useDelayed from "../hooks/useDelayed";
const getPosts = async()=>{
        let response = await axios.get("http://localhost:8080/posts");
        let data = response.data;
        return data
}
const deletePost = async(id)=>{
    let response = await axios.delete(`http://localhost:8080/posts/${id}`);
    let data = response.data;
    return data;
}
const Posts = () =>{
    const {loading,error,data,refresh} =useAPI(getPosts,[])
    const {loading:deleteLoading,execute} = useDelayed(deletePost,[] )
    if(loading || deleteLoading){
        return <div>Loading....</div>
    }
    else if(error){
        return <div>Error....</div>
    }
    return (
        <div>
            {data.map((post)=>(
                <div key={post.id}>
                    <div>
                        <span>{post.message}</span>
                        <button onClick={()=>{
                            execute(post.id ).then(()=>{
                                refresh();
                            })
                        }}>Delete</button>
                    </div>

                </div>
            ))}
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}

export default Posts