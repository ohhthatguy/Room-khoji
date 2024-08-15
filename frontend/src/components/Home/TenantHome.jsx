import { useContext, useEffect, useState } from "react"
import Header from "../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardMedia, Paper, styled, Grid, FormLabel } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate, useLocation } from "react-router-dom"
import { API } from "../../services/Api"




const TenantHome = ()=>{
    const {account} = useContext(DataContext)
    const [verifyData, setVerifyData] = useState('')
    const navigate = useNavigate()

    //useLocation for query params
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const query = {};
  params.forEach((value, key) => {
    query[key] = value;
  });

 console.log(query.data.length)

 if(query.data){
    const verifyPayment = async()=>{
        try{

            let res = await API.verifyPayment(query)
            if(res.isSuccess){
                console.log(res)
                setVerifyData(res)
            }else{
                console.log('something wrong happened')
                console.log(res)
            }

        }catch(err){
            console.log(err)
        }
    }
    console.log("calling verifyPayment()")
    verifyPayment()
 }

 console.log(verifyData)
   
  const handleProductmarket =(e)=>{
    // console.log(e)
    navigate(`/tenant/productmarket/${e.name}`)
  }
  
    const hellouserBg = 'https://cdn.pixabay.com/photo/2018/09/24/08/52/mountains-3699372_1280.jpg'

    const productType = [
        {
            image: 'https://media.istockphoto.com/id/1929345158/photo/modern-apartment-with-large-windows.jpg?s=1024x1024&w=is&k=20&c=BPU6q-8EwLIfG63zB0V-pYyxFbtPxNtfFFs8cLchyn8=', //room image
            name: 'Room'
        },
        {
            image: 'https://media.istockphoto.com/id/1486160447/photo/closeup-new-modern-apartment-buildings-background-with-copy-space.jpg?s=1024x1024&w=is&k=20&c=fLaSMshNwbfpMz-KxVb1ht3OSWoifoKzL0GrNbLvxsw=', //flat image
            name: 'Flat'
        },
        {
            image: 'https://media.istockphoto.com/id/1328886194/photo/portrait-of-new-homeowners-admiring-their-investment.jpg?s=1024x1024&w=is&k=20&c=CkzeEmgQMZ4T8fjfL1Y1Px5EocV6YzQzpBVD6fb8Nec=', //building image
            name: 'Building'
        }
    ]

    return (<>
    <Header />
       <Grid container sx={{marginTop: '4.3rem'}}>

            <Grid item sx={{background: `url(${hellouserBg}) no-repeat 75% 25% / cover`, height: '30rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }} xs={12}>
         
                <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src="https://houses.splash.html.themeplayers.net/images/country-logo2.png" alt='img' />
                <Typography sx={{color: 'white', }} variant="h5"> Room Khoji</Typography>
                </Box>

                <Box>
                <Typography sx={{color: 'white', }} variant="h5">Welcome, {account.name}</Typography>
              
                </Box>

         
            
            </Grid>

            <Box sx={{padding: '3rem', textAlign: 'center'}}>

                    <Typography sx={{margin: '2rem'}} variant="h4">  What are you looking for exactly ? </Typography>
                    
                    <Typography variant='h6' >Looking for the perfect room? You’re already in the right place! Our app makes finding your next home a breeze. Browse through a variety of listings, filter by your preferences, and connect with landlords directly. Enjoy a seamless experience from start to finish. Happy room hunting! 🏡🔍</Typography>

            </Box>


            <Grid container justifyContent={"space-evenly"} direction={{md: 'row', lg: 'row'}}  sx={{margin: '3rem 0px', boxShadow: 'blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px', padding: '2rem'}}>

                    {
                        productType.map((e, index)=>(
                            <Card  onClick={()=>handleProductmarket(e)} key={index} sx={{
                                '&:hover': {
                                  transform: 'scale(1.03)',
                                  transition: '0.4s'
                                },
                                '&:active': {
                                  transform: 'scale(1.06)',
                                },
                                transition: '0.4s',
                                cursor: 'pointer',

                                background: 'grey'

                                }}>

                                <CardMedia component="img" height="194" image= {`${e.image}`}alt= {`${e.name}`}/>
                                
                                <CardHeader sx={{textAlign: 'center'}} title={`${e.name}`}/>

                            </Card>
                        ))
                    }
       
            </Grid>

            <Typography>See What People have to Say !</Typography>

                <Grid container justifyContent={"space-evenly"} direction={{md: 'row', lg: 'row'}}  sx={{margin: '3rem 0px'}}>

                    <Paper elevation={9}>
                        "i found a room. yahoooo"
                    </Paper>
       
                </Grid>
                
                <Typography variant='h4'>hot Deals!</Typography>
                <Grid container justifyContent={"space-evenly"} direction={{md: 'row', lg: 'row'}}  sx={{margin: '3rem 0px'}}>

                    {
                        productType.map((e,index)=>(
                            <Card key={index}>

                                <CardMedia component="img" height="194" image= {`${e.image}`}alt= {`${e.name}`}/>
                                
                                <CardHeader sx={{textAlign: 'center'}} title={`${e.name}`} subheader="price"/>

                            </Card>
                        ))
                    }
       
            </Grid>


            
       </Grid>

      
    </>)
}

export default TenantHome