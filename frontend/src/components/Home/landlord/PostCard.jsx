import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, Card, CardHeader, CardMedia, CardContent, Paper, styled, ImageList, ImageListItem, TableHead, TableCell,TableRow } from "@mui/material"
import { DataContext } from "../../../context/DataProvider";
import {NavigateNext, NavigateBefore, Delete} from '@mui/icons-material';

// import { useNavigate } from "react-router-dom"
import { API } from "../../../services/Api";





const PostCard = ({post})=>{

    console.log(post)
    const {setIsUpdatedPost} = useContext(DataContext)
    const [movement, setMovement] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    

    const handleNext = (totalProductImages, index)=>{
   console.log(index)
   setActiveIndex(index)
     if(movement == totalProductImages - 1){ //last img
          //  //donothing
            
         }else{
            setMovement(prev=> prev+1)
            }     
    }

    const handlePrev= (index)=>{
        setActiveIndex(index)
        console.log(index)
        if(movement-1 == -1){ //first img
            //do nothing
            
        }else if(movement!=0){
            setMovement(prev=> prev-1)
        }
       
        
    }

    const handleDelete = async(e)=>{
            console.log(e)
            try{

                let res = await API.deletePostsOfId({_id: e._id})

                if(res.isSuccess){
                    console.log(res)
                    setIsUpdatedPost(prev=> !prev)

                }else{
                    console.log("delteio faild")
                }


            }catch(err){
                console.log(err)
            }
    }

    console.log(movement)

    return (<>
        
        {
            post.map((e,index)=>(
                <Card key={index} sx={{border: '1px solid red', position: 'relative'}} >
                    <Delete onClick={()=>handleDelete(e)} sx={{position: 'absolute', top: '5%', right: '0%'}}/>

                <CardHeader title={e.Category} subheader={e.Date} /> 

                <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Paper>Parking: {e.Parking}</Paper>
                    <Paper>People: {e.People}</Paper>
                    <Paper>Pets: {e.Pets}</Paper>
                    <Paper>Water: {e.Water}</Paper>
                </Box>

                <Box sx={{border: '1px solid red', position: 'relative'}}>
           
                    <Box sx={{width: '100%', zIndex: '1', position: 'absolute', top: '50%'}}>
            
                        <NavigateBefore disabled={(movement-1 == -1) ? true : false} fontSize="large" sx={{ marginRight: '0%'}} onClick={()=>handlePrev(index)}/>
                       
                        <NavigateNext disabled={(movement == e.productImages.length - 1) ? true : false}  fontSize="large" sx={{marginLeft: '90%'}} onClick={()=>handleNext( e.productImages.length, index)}/>

                        
                    </Box>    
           

                <Box sx={{border: '2px solid black', height: '20rem', display: 'flex',  transform: (activeIndex === index) ? `  translateX(-${movement * 100}%)` : `translateX(0px)`, transition: '0.5s' }} >

                   
                    {
                        e.productImages.map((item,index)=>(
                            <Box key={index} sx={{background: `url(${item}) no-repeat 75% 25% / cover`, width: '100%', height: '20rem', flex: '0 0 100%',
                            height: '100%',}} ></Box>
                            
                        ))
                    }
                </Box>
                </Box>


                

                {/* <CardMedia component="img" height="194" image={} alt="Paella dish" /> */}

                

                <CardContent>
                    <Typography variant="h5">{e.Description}</Typography>
                </CardContent>

                <Box>
                    <Paper>Quantity: {e.Quantity}</Paper>
                    <Paper>Rate: {e.Rate}</Paper>
                    <Paper>Location: {e.Location}</Paper>
               
                </Box>
    
    
    
            </Card>
            ))


        }
       
        
        
        
        
        </>
       
    )
}

export default PostCard