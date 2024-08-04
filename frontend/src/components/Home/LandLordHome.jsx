import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, Card, CardHeader, CardMedia, CardContent, Paper, styled, Grid, Table, TableHead, TableCell,TableRow } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useNavigate, Link } from "react-router-dom"
import { API } from "../../services/Api"

import PostForm from "./landlord/PostForm"
import PostHistory from "./landlord/PostHistory"
import PostAvailable from "./landlord/PostAvailable"



const LandLordHome = ()=>{
    const {account} = useContext(DataContext)

    const [profilePic,setprofilPic] = useState('https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=t079TIvLJCn2fePWpCuKgzauHnehzuVvc4DUCecDBuw=') 
    console.log(account)

    const [option, setOption] = useState('PostAvailable')

    const navigate = useNavigate()

    // useEffect(()=>{
    //     const getimage = async()=>{
    //         try{
    //             const res = await API.getProfilePicture({profile: account.profile})
    //             console.log(res)
    //             if(res.isSuccess){
    //                 setprofilPic(res.data)
    //             }else{
    //                 console.log("errror")
    //             }

    //         }catch(err){
    //             console.log("errror", err)

    //         }
    //     }
    //     getimage()
    // },[])

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

    console.log(option)

    return (<>

    <Paper elevation={9} sx={{background: '#005A9C', height: '5rem', fontSize: '3rem', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> Room-Khoji </Paper>

       <Grid container sx={{marginTop: '1rem'}}>
       
       <Grid item sx={{background: `url(${hellouserBg}) no-repeat 75% 25% / cover`, height: '20rem', border: '1px solid red', display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={12}>


            <Card sx={{backgroundColor: 'blue', width: '50%'}}>

                <Box sx={{margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CardMedia sx={{height: '7rem', width: '7rem',border: '1px solid red',background: `url(${profilePic}) no-repeat 75% 25% / cover`, borderRadius: '50%' }} />
                </Box>
            
                <CardContent>

                <Typography>  Name:  {account.name}</Typography> 
                <Typography>   ID:{account._id}</Typography>
                <Typography> Name:  {account.name}</Typography>
                <Typography> Name: {account.name}</Typography>

                </CardContent>

            </Card> 
            
            </Grid>

            <Typography>What are you looking for ?</Typography>

            <Grid container  columnGap={1} sx={{margin: '3rem 0px'}}>

                {/* table */}
                <Grid sx={{border: '1px solid black'}} item lg={3} md={2} sm={1.6} xs={12}>
                
                    <Table >
                        <TableHead>

                            <TableRow sx={{ cursor: 'pointer', fontSize: '50%', '&:hover': {
                                  transform: 'scale(1.03)',
                                  transition: '0.4s',
                                  boxShadow: '0px 2px 2px 0px black'
                                },
                                '&:active': {
                                  transform: 'scale(1.06)',
                                },
                                transition: '0.4s'}}>

                                <TableCell onClick={()=> setOption(prev=> ('PostHistory') )}>
                                Rented history
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableHead>

                          <TableRow sx={{ cursor: 'pointer', fontSize: '50%','&:hover': {
                                  transform: 'scale(1.03)',
                                  transition: '0.4s',
                                  boxShadow: '0px 2px 2px 0px black'
                                },
                                '&:active': {
                                  transform: 'scale(1.06)',
                                },
                                transition: '0.4s'}}>

                                <TableCell onClick={()=> setOption(prev=> ('PostAvailable') )}>

                               availalble

                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableHead>

                        <TableRow sx={{ cursor: 'pointer', '&:hover': {
                                  transform: 'scale(1.03)',
                                  transition: '0.4s',
                                  boxShadow: '0px 2px 2px 0px black'
                                },
                                '&:active': {
                                  transform: 'scale(1.06)',
                                },
                                transition: '0.4s', fontSize: '50%'}}>

                                <TableCell onClick={()=> setOption(prev=> ('PostForm') )}>
                                    make new post
                                   
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                   
                </Grid>

                {/* posts */}
                <Grid item sx={{border: '1px solid black'}} lg={8.9} md={9.7} sm={9.8} xs={12}>
                                {
                                  (option == 'PostForm') ? <PostForm /> :
                                  (option == 'PostAvailable') ? <PostAvailable /> : 
                                  (option == 'PostHistory') ? <PostHistory /> : ' so emptyyyy'
                                }
                       

                </Grid>
                  
       
            </Grid>

           

            
       </Grid>

      
    </>)
}

export default LandLordHome