import { useContext, useEffect, useState } from "react"
import Header from "../../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardContent, Paper, styled, Grid, Avatar } from "@mui/material"
import {NavigateNext, NavigateBefore } from '@mui/icons-material';


import { DataContext } from "../../../context/DataProvider"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../../../services/Api"

const FavroitProduct = ({darkMode}) => {

    // const {id} = useParams();
    const {account} = useContext(DataContext)
    const navigate = useNavigate()

    const [favPost, setFavPost] = useState([])
    const [posts, setposts] = useState([])

    // const [selectedOption, setSelectedOption] = useState(Category)
   

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
    
    //gets posts id
    useEffect(()=>{

     
            const getFavPost = async()=>{
                try{
                    const res = await API.getFavouritePost({id: account._id})
                    if(res.isSuccess){
                        // console.log(...res.data.initializeBookmark
                        //     [0].Post_id)
                        setposts([...res.data.initializeBookmark
                            [0].Post_id])
                    }else{
                        console.log('is failure')
                    }
                }catch(err){
                    console.log(err)
                }


            }



            getFavPost()
        

    },[])
    
    console.log(posts)


        //fetches data of post id
    useEffect(()=>{

        const fetchPost = async()=>{
            try{

                const res = await API.getFavDataFromFavPostId({id: posts})

                if(res.isSuccess){
                    console.log(res)
                    setFavPost(res.data)
                    console.log("succesully fetched fav post from fav id")
                }else{
                    console.log("something happened")
                }



            }catch(err){
                console.log(err)
            }
        }
        fetchPost()


    },[posts])

    console.log(favPost)

    

            //   const optionList = ['Flat', 'Building', 'Room']   
            //   console.log(selectedOption)   
            //   console.log(currentPost)
            //   console.log(gharBeti)

  return (
  <>
   <Header />
   
   <Box  sx={{marginTop: '4rem',display:'flex', color: darkMode ? 'white' : 'black', justifyContent: 'center', gap: '10px', marginBottom: '1.22rem', paddingTop: '1.5rem'}}>


   My Favroitss

        </Box>

        <Grid container justifyContent="center" >

      
       
             
{
    (favPost.length > 0) ? 

<Grid item sx={{display:'flex',rowGap: '2rem', flexDirection: 'column-reverse' }} lg={7} md={8} sm={8}>
    {
    favPost.map((e,index)=>(
        <Card key={index} sx={{border: '1px solid red', position: 'relative', backgroundColor: '#FFF9E6'}} >

     

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

<Box>You have not selected any favroutes</Box>

}


    
</Grid>
      


  
  </>
  )
}



export default FavroitProduct


  
