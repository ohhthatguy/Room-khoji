import { useContext, useEffect, useState } from "react"
import Header from "../../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardContent, Paper, Table,TableHead, TableRow, TableCell, Grid, Avatar } from "@mui/material"
import {NavigateNext, NavigateBefore } from '@mui/icons-material';


import { DataContext } from "../../../context/DataProvider"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "../../../services/Api";

const BusinessTalk = () => {

    const {id} = useParams();
    // console.log(id)

    const [currentPost, setCurrentPost] = useState([])
    const [bookMarkClicked, setBookmarkClicked] = useState(false)
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

    const handleSewa =(rate,quantity)=>{
        console.log(rate, quantity)
    }
    
    useEffect(()=>{

            const getPostOfCategory = async()=>{
                try{
                    const res = await API.getPostsOfId({postId: id})
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

    ,[])
    
console.log(currentPost)
      
          

  return (
  <>
   <Header />
   
   <Box sx={{marginTop: '5rem',display:'flex', justifyContent: 'center', gap: '10px', marginBottom: '1.22rem'}}>

          lets talk business

        </Box>

       <Grid container justifyContent="center" >

      
       
             
        {
            (currentPost.length > 0) ? 
        
        <Grid item sx={{display:'flex',rowGap: '2rem', flexDirection: 'column-reverse' }} lg={7} md={8} sm={8}>
            {
            currentPost.map((e,index)=>(

                <Card key={index} sx={{border: '1px solid red', position: 'relative'}} >


                <CardHeader avatar={ <Avatar  src={e.Gharbeti_profile} alt={e.Gharbeti_name} />} title={ e.Gharbeti_name} subheader={e.Date} /> 

                {/* <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    
                </Box> */}

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
                    <Paper>Parking: {e.Parking}</Paper>
                    <Paper>People: {e.People}</Paper>
                    <Paper>Pets: {e.Pets}</Paper>
                    <Paper>Water: {e.Water}</Paper>

                    {/* <Box sx={{position: 'absolute', bottom: '2%', right: '2%'}}>
                        <Button variant='contained'>lets talk business</Button>
                    </Box> */}
               
                </Box>

               

                <Box>
             
                
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            DownPayment: {e.Rate}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableHead>

                      <TableRow>

                            <TableCell>

                           Commision: {0.05 * e.Rate}

                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableHead>

                    <TableRow >

                            <TableCell>
                                total: {e.Rate * e.Quantity + (0.25 * e.Rate * e.Quantity)}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableHead>

                    <TableRow >

                            <TableCell>
                                <Button onClick={()=> handleSewa(e.Rate , e.Quantity)}>Pay by esewa</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                </Table>
               
     
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

export default BusinessTalk