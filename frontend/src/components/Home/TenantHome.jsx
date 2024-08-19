import { useContext,useState } from "react"
import Header from "../Header/Header"
import { Box,Typography, Card, Avatar, CardHeader, CardMedia, CardContent, Grid,Rating } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate, useLocation } from "react-router-dom"
import { API } from "../../services/Api"
import Footer from "../footer/Footer"
import LogOut from "../Logout/LogOut"




const TenantHome = ()=>{
    const {account,openPortal} = useContext(DataContext)
    const [verifyData, setVerifyData] = useState('')
    const navigate = useNavigate()

    //useLocation for query params

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');
//   console.log(data)

 
 if(data && verifyData.length == 0){
    const verifyPayment = async()=>{
        try{

            let res = await API.verifyPayment({data})
            // console.log(res)
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

    const feedback = [
        {
            content: 'I had an excellent experience using the Room Finder app! The interface was user-friendly, and I found exactly what I was looking for in just a few clicks. The search filters were spot-on, allowing me to narrow down my options quickly. I especially appreciated the detailed listings and the ability to contact landlords directly through the app. Thanks to Room Finder, I secured a great place within my budget and preferred location. Highly recommend this app to anyone searching for a room!',

            photo: 'https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_1280.jpg',
            name: 'John Doe'
        },
        {
            content: '"Room Finder made my room search so easy and stress-free! As a girl, safety and location were my top priorities, and the app allowed me to filter options based on those needs. The listings were detailed, with clear photos and descriptions, so I knew exactly what to expect. I loved the convenience of being able to compare different rooms side by side and even schedule visits directly through the app. I found a cozy, safe place thats perfect for me. I couldnt be happier—Room Finder is a must-have for anyone looking for a new place!"',

            photo: 'https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg',
              name: 'Ethal Cray'
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

                                <CardMedia component="img" height="250" image= {`${e.image}`}alt= {`${e.name}`}/>
                                
                                <CardHeader sx={{textAlign: 'center'}} title={`${e.name}`}/>

                            </Card>
                        ))
                    }
       
            </Grid>

            
            <Typography sx={{textAlign: 'center', width: '100%'}} variant="h4">See What People have to Say !</Typography>
           
                <Grid container justifyContent={'center'} alignItems={'center'}  sx={{margin: '3rem 0px'}}  >
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                    {
                        feedback.map((e,index)=>(
                            <Card key={index} sx={{border: '1px solid red', marginTop: '1.52rem'}} >

                            <CardHeader avatar={ <Avatar  src={e.photo} alt={e.name} />} title={ e.name} subheader={        <Rating name="read-only" value={5} size='small' readOnly />}/> 

            
                            <CardContent>
                                <Typography variant="h5">{e.content}</Typography>
                        
                            </CardContent>
            
                        </Card>
                        ))
                    }
                    </Grid>
       
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


            <Footer />

            {openPortal && <LogOut />}

       </Grid>

      
    </>)
}

export default TenantHome