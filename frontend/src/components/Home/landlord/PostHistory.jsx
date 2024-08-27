import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, Card, CardHeader, CardMedia, CardContent, Paper, styled, Grid, Table, TableHead, TableCell,TableRow } from "@mui/material"
// import { DataContext } from "../../context/DataProvider"
// import { useNavigate } from "react-router-dom"
import { API } from "../../../services/Api"
import PostCard from "./PostCard"




const PostHistory = ({darkMode})=>{

//if any history steore in a var and send it as <postcard post = {post} /> else show this no room seold

    const [historyPost, setHistoryPost] = useState([])

    useEffect(()=>{

        const getHistoryPost = async()=>{

            try{

                const res = await API.getRentedProduct()

                if(res.isSuccess){
                    // console.log(res.data)
                    setHistoryPost(res.data)
                }else{
                    console.log('some wrng')
                }

            }catch(err){
                console.log('error: ', err)

            }

        }

        getHistoryPost()


    },[])

    console.log(historyPost)

    return (<>

        {
            historyPost.length > 0 ? <PostCard post={historyPost}/> :
                <Box sx={{background: darkMode && '#0F283F ' , color: darkMode && 'white', textAlign: 'center', fontSize: '2rem'}}>No room has been selected by any tenants yet!</Box>
                
        }

    
    </>
       
    )
}

export default PostHistory