import { useContext, useEffect, useState } from "react"
import Header from "../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardMedia, Paper, styled, Grid, FormLabel } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate } from "react-router-dom"
import { API } from "../../services/Api"



const TenantHome = ()=>{
    const {account} = useContext(DataContext)
    // console.log(account)
    const navigate = useNavigate()

    // const handleTest=async()=>{
    //     try{

    //         let response = await API.getUser();
    //         console.log(response)
           

    //     }catch(err){
    //         console.log("error: ", err)
    //         if(err.code == 401){
    //             navigate('/')
    //         }
    //     }
    // }
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
       <Grid container sx={{marginTop: '5rem'}}>

            <Grid item sx={{background: `url(${hellouserBg}) no-repeat 75% 25% / cover`, height: '8rem'}} xs={12}>
                
                <Typography sx={{color: 'white', }} variant="h5"> hello, <br/> {account.name}</Typography>
            
            </Grid>

            <Typography>What are you looking for ?</Typography>

            <Grid container justifyContent={"space-evenly"} direction={{md: 'row', lg: 'row'}}  sx={{margin: '3rem 0px'}}>

                    {
                        productType.map((e, index)=>(
                            <Card onClick={()=>handleProductmarket(e)} key={index} sx={{
                                '&:hover': {
                                  transform: 'scale(1.03)',
                                  transition: '0.4s'
                                },
                                '&:active': {
                                  transform: 'scale(1.06)',
                                },
                                transition: '0.4s',
                                cursor: 'pointer'

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