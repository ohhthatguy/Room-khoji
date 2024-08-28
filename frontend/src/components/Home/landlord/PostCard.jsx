import { useContext, useEffect, useState } from "react"

import { Box,Typography, Card, CardHeader, Avatar, CardContent } from "@mui/material"
import { DataContext } from "../../../context/DataProvider";
import {NavigateNext, NavigateBefore, Delete, Edit} from '@mui/icons-material';

import PostEdit from "./PostEdit";
import { API } from "../../../services/Api";





const PostCard = ({post, darkMode})=>{

    // console.log(post)
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
            // console.log(e)
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
let k;
    if(edit != 0){
        console.log(edit)
    k = post.filter((e)=> e._id == edit)
        console.log(k)
    }

    return (<>
        
        {
                (edit != 0) && <PostEdit edit={edit} setEdit={setEdit} darkMode={darkMode} post={post.filter((ele)=> ele._id == edit)}/>
        }


        
            <Box sx={{ display: ` ${edit !=0 ? 'none' : 'flex' } `,rowGap: '2rem', flexDirection: 'column-reverse' }}>
            {
            post.map((e,index)=>(
                <Card key={index} sx={{border: '2px solid #587351', position: 'relative',  backgroundColor: darkMode ? '#494F55' : ' #F5F5F5', color: darkMode ? 'white' : 'black',}} >
                
                {     (!e?.name) &&
                    <Delete onClick={()=>handleDelete(e)} sx={{position: 'absolute', top: '5%', right: '5%', '&:hover': {
          color: 'red',
          cursor: 'pointer',
          transition: '0.4s'
        }, transition: '0.4s',
        '&:active': {
       
          transform: 'scale(1.05)',
         
        }
         }}/>
        }

{     (!e?.name) &&
                    <Edit onClick={()=>setEdit(e._id)} sx={{position: 'absolute', top: '5%', right: '10%','&:hover': {
          color: 'green',
          cursor: 'pointer',
          transition: '0.4s'
        }, transition: '0.4s',
        '&:active': {
       
          transform: 'scale(1.05)',
         
        }}}/>
    }

            {
                     (e?.name) ?

                        <Box sx={{display: 'flex'}}>
                                <CardHeader avatar={ <Avatar  src={e.profile[0]} alt={e.name} />}  sx={{
                                    '& .MuiCardHeader-title': { color: darkMode ? 'white' : 'black' },
                                    '& .MuiCardHeader-subheader': { color: darkMode ? 'white' : 'black' },
                                }} title={e.name} subheader="Tenant"/> 
                        </Box> :

                            <CardHeader   sx={{
                    '& .MuiCardHeader-title': { color: darkMode ? 'white' : 'black' },
                    '& .MuiCardHeader-subheader': { color: darkMode ? 'white' : 'black' },
                }} title={e.Category} subheader={e.Date} /> 

            }

              

                <Box sx={{ position: 'relative'}}>
           
                    <Box sx={{width: '100%', zIndex: '1', position: 'absolute', top: '50%'}}>
            
                        <NavigateBefore disabled={(movement-1 == -1) ? true : false} fontSize="large" sx={{ marginRight: '0%', display:`${e.productImages.length <= 1 ? 'none' : 'block'}`}} onClick={()=>handlePrev(index)}/>
                       
                        <NavigateNext disabled={(movement == e.productImages.length - 1) ? true : false}  fontSize="large" sx={{marginLeft: '90%', display:`${e.productImages.length <= 1 ? 'none' : 'block'}`}} onClick={()=>handleNext( e.productImages.length, index)}/>

                        
                    </Box>    
           
                   
                <Box sx={{boxShadow: darkMode ? '0px 2px 2px 0px #B6B6B4' : '9px 9px 9px 9px #FEFEFA'  , height: '20rem', display: 'flex',  transform: (activeIndex === index) ? `  translateX(-${movement * 100}%)` : `translateX(0px)`, transition: '0.5s' }} >

                   
                    {
                        e.productImages.map((item,index)=>(
                            <Box key={index} sx={{background: `url(${item}) no-repeat 50% 50% / contain`, width: '100%', height: '20rem', flex: '0 0 100%',
                            height: '100%',}} ></Box>
                            
                        ))
                    }
                </Box>
                </Box>


                <CardContent>
                    {
                        (e?.name) ?
                      
                            // <Box sx={{ display: 'flex'}}>
                                
                            //     <Box sx={{height: '7rem', width: '7rem',border: '1px solid red', backgroundImage: `url('${e.profile[0]}')`, backgroundPosition: '75% 25%', backgroundSize: 'cover' , 
                            //     borderRadius: '50%' }}></Box>

                            //     {e.name}

                            // </Box>
                        

                                 <Typography variant="h5">{e.Category}</Typography>

                        
                        :  <Typography variant="h5">{e.Description}</Typography>
                    }
                </CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '1.2rem 0rem'}}>

                    <Box sx={{marginLeft: '1.2rem',display: 'flex', columnGap: '1.4rem'}}>
                    

                        <Box>
                            <Typography><strong>Quantity</strong></Typography>
                            <Typography> <strong>Rate</strong></Typography>
                            <Typography> <strong>Location</strong></Typography>
                        </Box>

                        <Box>
                            <Typography>: {e.Quantity}</Typography>
                            <Typography>: {e.Rate}</Typography>
                            <Typography>: {e.Location}</Typography>

                        </Box>

                    </Box>


                        <Box sx={{display: 'flex', columnGap: '1.4rem'}}>
                        

                        <Box>
                            <Typography><strong>Water</strong></Typography>
                            <Typography> <strong>Parking</strong></Typography>
                            <Typography> <strong>Prefered</strong></Typography>
                            <Typography> <strong>Pets</strong></Typography>

                        </Box>

                        <Box>
                            <Typography>: {e.Water}</Typography>
                            <Typography>: {e.Parking}</Typography>
                            <Typography>: {e.People}</Typography>
                            <Typography>: {e.Pets}</Typography>


                        </Box>

                        </Box>




                        </Box>

              
    
    
    
            </Card>
            ))
        }
            </Box>
        
       
        
        
        
        
        </>
       
    )
}

export default PostCard