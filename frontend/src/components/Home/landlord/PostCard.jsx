import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, Card, CardHeader, CardMedia, CardContent, Paper, styled, ImageList, ImageListItem, TableHead, TableCell,TableRow } from "@mui/material"
import { DataContext } from "../../../context/DataProvider";
import {NavigateNext, NavigateBefore, Delete, Edit} from '@mui/icons-material';

import { useNavigate } from "react-router-dom"
import PostEdit from "./PostEdit";
import { API } from "../../../services/Api";





const PostCard = ({post})=>{

    console.log(post)
    const {setIsUpdatedPost} = useContext(DataContext)
    const [movement, setMovement] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [edit, setEdit] = useState(0)
    

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

    const handleEdit = async(e)=>{
        console.log(e)
        
        
    }

    console.log(movement)
let k;
    if(edit != 0){
        console.log(edit)
    k = post.filter((e)=> e._id == edit)
        console.log(k)
    }

    return (<>
        
        {
                (edit != 0) && <PostEdit edit={edit} setEdit={setEdit} post={post.filter((ele)=> ele._id == edit)}/>
        }


        
            <Box sx={{display: ` ${edit !=0 ? 'none' : 'flex' } `,rowGap: '2rem', flexDirection: 'column-reverse' }}>
            {
            post.map((e,index)=>(
                <Card key={index} sx={{border: '1px solid red', position: 'relative'}} >

                    <Delete onClick={()=>handleDelete(e)} sx={{position: 'absolute', top: '5%', right: '5%', '&:hover': {
          color: 'red',
          cursor: 'pointer',
          transition: '0.4s'
        }, transition: '0.4s',
        '&:active': {
       
          transform: 'scale(1.05)',
         
        }
         }}/>

                    <Edit onClick={()=>setEdit(e._id)} sx={{position: 'absolute', top: '5%', right: '10%','&:hover': {
          color: 'green',
          cursor: 'pointer',
          transition: '0.4s'
        }, transition: '0.4s',
        '&:active': {
       
          transform: 'scale(1.05)',
         
        }}}/>


                <CardHeader title={e.Category} subheader={e.Date} /> 

                <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Paper>Parking: {e.Parking}</Paper>
                    <Paper>People: {e.People}</Paper>
                    <Paper>Pets: {e.Pets}</Paper>
                    <Paper>Water: {e.Water}</Paper>
                </Box>

                <Box sx={{border: '1px solid red', position: 'relative'}}>
           
                    <Box sx={{width: '100%', zIndex: '1', position: 'absolute', top: '50%'}}>
            
                        <NavigateBefore disabled={(movement-1 == -1) ? true : false} fontSize="large" sx={{ marginRight: '0%', display:`${e.productImages.length <= 1 ? 'none' : 'block'}`}} onClick={()=>handlePrev(index)}/>
                       
                        <NavigateNext disabled={(movement == e.productImages.length - 1) ? true : false}  fontSize="large" sx={{marginLeft: '90%', display:`${e.productImages.length <= 1 ? 'none' : 'block'}`}} onClick={()=>handleNext( e.productImages.length, index)}/>

                        
                    </Box>    
           

                <Box sx={{border: '2px solid black', height: '20rem', display: 'flex',  transform: (activeIndex === index) ? `  translateX(-${movement * 100}%)` : `translateX(0px)`, transition: '0.5s' }} >

                   
                    {
                        e.productImages.map((item,index)=>(
                            <Box key={index} sx={{background: `url(${item}) no-repeat 50% 50% / contain`, width: '100%', height: '20rem', flex: '0 0 100%',
                            height: '100%',}} ></Box>
                            
                        ))
                    }
                </Box>
                </Box>


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
            </Box>
        
       
        
        
        
        
        </>
       
    )
}

export default PostCard