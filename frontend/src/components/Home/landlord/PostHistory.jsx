import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, Card, CardHeader, CardMedia, CardContent, Paper, styled, Grid, Table, TableHead, TableCell,TableRow } from "@mui/material"
// import { DataContext } from "../../context/DataProvider"
// import { useNavigate } from "react-router-dom"
import { API } from "../../../services/Api"
import PostCard from "./PostCard"




const PostHistory = ({darkMode})=>{

//if any history steore in a var and send it as <postcard post = {post} /> else show this no room seold

    const [historyPost, setHistoryPost] = useState([])
    const account = JSON.parse(localStorage.getItem('currentUser'))

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

    // console.log(historyPost[0].Gharbeti_id)
    // console.log(account._id)


    return (<>

        {
            (historyPost.length > 0 && historyPost[0].Gharbeti_id == account._id)  ? <PostCard post={historyPost} darkMode={darkMode}/> :
                <Box sx={{background: darkMode ? '#494F55' : '#F5F5F5 ' , color: darkMode && 'white', textAlign: 'center', fontSize: '2rem'}}>you have no tenants yet!</Box>
                
        }

    
    </>
       
    )
}

export default PostHistory