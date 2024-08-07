import { useContext, useEffect, useState } from "react"
import Header from "../../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardContent, Paper, styled, Grid, Avatar } from "@mui/material"
import {NavigateNext, NavigateBefore, Bookmark, BookmarkBorderOutlined } from '@mui/icons-material';


import { DataContext } from "../../../context/DataProvider"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../../../services/Api"

const ProductMarket = () => {

    const {Category} = useParams();
    const navigate = useNavigate()

    const [currentPost, setCurrentPost] = useState([])
    const [bookMarkClicked, setBookmarkClicked] = useState(false)
    const [selectedOption, setSelectedOption] = useState(Category)
   

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
    
    useEffect(()=>{

        if(selectedOption.length > 0){
            const getPostOfCategory = async()=>{
                try{
                    const res = await API.getPostByCategory({Category: selectedOption})
                    if(res.isSuccess){
                        // console.log(res.data)
                        setCurrentPost(res.data)
                    }else{
                        console.log('is failure')
                    }
                }catch(err){
                    console.log(err)
                }


            }

            getPostOfCategory()
        }

    },[selectedOption])
    

    // //for gahrbetis name and profile
    // useEffect(()=>{

    //     if(currentPost.length > 0){

    //         let ids=[];
    //             currentPost.map((e)=>{
    //                 if(e.Gharbeti_id){
    //                     ids = [...ids, e.Gharbeti_id]
    //                 }  
    //             })
                 
             
                
    //             if(ids.length > 0){

    //                 const getGharbeti = async()=>{

    //                     try{
    //                         const res = await API.getGharbetiById({id: ids})
    //                         if(res.isSuccess){
    //                             // console.log(res.data)
    //                             // setGharBeti(res.data)
    //                             // setCurrentPost(...currentPost)
    //                             //  setCurrentPost(currentPost.map(item1 => {
    //                             //     // Find the corresponding item in array2
    //                             //     const match = res.data.find(item2 => item2._id === item1.Gharbeti_id);
                                    
    //                             //     // Return the merged object
    //                             //     return {
    //                             //       ...item1,
    //                             //       Gharbeti_img: match ? match.profile[0] : '', // Add age if there's a match, otherwise null or default
    //                             //       Gharbeti_name: match ? match.name : ''
    //                             //     };
    //                             //   }))

    //                         }else{
    //                             console.log('is failure')
    //                         }
    //                     }catch(err){
    //                         console.log(err)
    //                     }
        
        
    //                 }

    //                 //call func here
    //                 getGharbeti()
    //             }
            

            
    //     }

    // },[currentPost])

   

              const optionList = ['Flat', 'Building', 'Room']   
              console.log(selectedOption)   
              console.log(currentPost)
            //   console.log(gharBeti)

  return (
  <>
   <Header />
   
   <Box sx={{marginTop: '5rem',display:'flex', justifyContent: 'center', gap: '10px', marginBottom: '1.22rem'}}>

            {
                optionList.map((e)=>(
                     
                       (selectedOption === e) ? <Button variant="outlined">{e}</Button>  : <Button onClick={()=>setSelectedOption(e)} variant="contained">{e}</Button>
                     
                ))
            }

        </Box>
       <Grid container justifyContent="center" >

      
       
             
        {
            (currentPost.length > 0) ? 
        
        <Grid item sx={{display:'flex',rowGap: '2rem', flexDirection: 'column-reverse' }} lg={7} md={8} sm={8}>
            {
            currentPost.map((e,index)=>(
                <Card key={index} sx={{border: '1px solid red', position: 'relative'}} >

                {
                    (!bookMarkClicked) ? 
                    <BookmarkBorderOutlined onClick={()=>setBookmarkClicked(true)} sx={{position: 'absolute', right: '2%', top: '5%','&:hover': { color: 'blue',  cursor: 'pointer',  transition: '0.4s'}, transition: '0.4s','&:active': {transform: 'scale(1.05)'} }} /> :
                    <Bookmark color='primary' onClick={()=>setBookmarkClicked(false)} sx={{position: 'absolute', right: '2%', top: '5%','&:hover': { color: 'blue',  cursor: 'pointer',  transition: '0.4s'}, transition: '0.4s','&:active': {transform: 'scale(1.05)'}}} /> 
                }
               

                <CardHeader avatar={ <Avatar  src={e.Gharbeti_profile} alt={e.Gharbeti_name} />} title={ e.Gharbeti_name} subheader={e.Date} /> 

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

                <Box sx={{position: 'relative'}}>
                    <Paper  >Quantity: {e.Quantity}</Paper>
                    <Paper>Rate: {e.Rate}</Paper>
                    <Paper>Location: {e.Location}</Paper>

                    <Box sx={{position: 'absolute', bottom: '2%', right: '2%'}}>
                        <Button variant='contained' onClick={()=> navigate(`/tenant/BusinessTalk/${e._id}`)}>lets talk business</Button>
                    </Box>
               
                </Box>
    
    
    
            </Card>
            ))
        }
            </Grid>

        :

        <Box>sorry but currenlty none are available</Box>

        }


            
       </Grid>


  
  </>
  )
}

export default ProductMarket