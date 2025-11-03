import { useContext, useEffect, useState } from "react"

import {Typography } from "@mui/material"
import { DataContext } from "../../../context/DataProvider"
// import { useNavigate } from "react-router-dom"

import { API } from "../../../services/Api"
import PostCard from "./PostCard"
import Loader from "../../../theme/Loader"





const PostAvailable = ({darkMode})=>{
    const { isUpdatedPost} = useContext(DataContext)
    const account = JSON.parse(localStorage.getItem('currentUser'))
    const [post,setPost] = useState('')
    console.log(account._id)
    const [isLoading, setIsLoading] = useState(false);

    console.log(isUpdatedPost)

    //recalibarte the API to get prams and query just like in blog site 
        useEffect(()=>{
            const getPostsOfId = async()=>{
                try{
setIsLoading(true)
                    let res = await API.getPostsOfId({Gharbeti_id: account._id})
                
                    if(res.isSuccess){
                        console.log("gotten data")
                        console.log(res)
                        setPost(res.data)
                    }else{
                        console.log('faield to fetch data')
                    
                    }

                }catch(err){
                    console.log(err)
                }
setIsLoading(false)

            }

            getPostsOfId()

        },[isUpdatedPost])
           
             


    return (<>
       

            {
                isLoading ? <Loader /> :
                (post.length > 0) ? <PostCard post={post} darkMode={darkMode}/> : <Typography> You've made no posts yet </Typography>
            }



        </>
       
    )
}

export default PostAvailable