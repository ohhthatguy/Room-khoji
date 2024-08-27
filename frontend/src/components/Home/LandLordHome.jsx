import { useContext, useEffect, useState } from "react"
import {Logout, DarkMode, LightMode} from '@mui/icons-material';

import { Box,Typography, Card, CardContent, Paper, Grid, Table, TableHead, TableCell,TableRow } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
// import { useNavigate } from "react-router-dom"
// import { API } from "../../services/Api"

import PostForm from "./landlord/PostForm"
import PostHistory from "./landlord/PostHistory"
import PostAvailable from "./landlord/PostAvailable"



const LandLordHome = ({darkMode})=>{
    const {account, setOpenPortal, setDarkMode} = useContext(DataContext)
    // const {account, setOpenPortal, setDarkMode, darkMode} = useContext(DataContext)


    const [option, setOption] = useState('PostAvailable')
   
    // const navigate = useNavigate()

    // useEffect(()=>{
    //     const getimage = async()=>{
    //         try{
    //             const res = await API.getProductPicture(account.profile)
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

    console.log(option)

    return (<>

    <Paper elevation={9} sx={{background: darkMode ? '#153534': '#005A9C', height: '5rem', fontSize: '3rem', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}> Room-Khoji 

        <Box sx={{display: 'flex', position: 'absolute', right: '3%',  width: '5%', justifyContent: 'space-between' }}>

                  <Box  onClick={()=>   !darkMode ?  setDarkMode(true) : setDarkMode(false)}  sx={{'&:hover':{
                      cursor: 'pointer',
                      // transform: 'Scale(1.02)',
                      transition: '0.3s'
                  },'&:active':{
                      cursor: 'pointer',
                      transform: 'rotate(-90deg)',

                  },
                  transition: '0.3s',
                  }}>

                      { darkMode ? <DarkMode /> : <LightMode /> }

                  </Box>
                
                <Box sx={{'&:hover':{
                    cursor: 'pointer',
                    // transform: 'Scale(1.02)',
                    transition: '0.3s'
                },'&:active':{
                    cursor: 'pointer',
                    transform: 'Scale(1.04)',

                },
                transition: '0.3s'}}>

                    <Logout onClick={()=>  setOpenPortal(prev=> !prev)} />
                </Box>

            

              </Box>

    </Paper>

       <Grid container sx={{marginTop: '1rem'}}>
       
       <Grid item sx={{background: `url(${hellouserBg}) no-repeat 75% 25% / cover`, height: '20rem', border: '1px solid red', display: 'flex', justifyContent: 'center', alignItems: 'center'}} xs={12}>


            <Card sx={{ backgroundColor: darkMode ? '#153534' : '#D5D0A4', color: darkMode ? 'white' : 'black', opacity: '0.95', width: '50%'}}>

                <Box sx={{margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{height: '7rem', width: '7rem',border: '1px solid red', backgroundImage: `url('${account.profile[0]}')`, backgroundPosition: '75% 25%', backgroundSize: 'cover' , borderRadius: '50%' }}></Box>
                </Box>

              
            
                <CardContent sx={{textAlign: 'center'}}>

                <Typography>  LandLord:  {account.name}</Typography> 
                <Typography>   ID:{account._id}</Typography>
          

                </CardContent>

            </Card> 
            
            </Grid>

            {/* <Typography>What are you looking for ?</Typography> */}

            <Grid container  columnGap={1} sx={{margin: '3rem 0px'}}>

                {/* table */}
                <Grid sx={{border: '1px solid black', background: darkMode && '#153534' }} item lg={3} md={2} sm={1.6} xs={12}>
                
                    <Table>
                        <TableHead>

                            <TableRow sx={{cursor: 'pointer', fontSize: '50%', '&:hover': {
                                  transform: 'scale(1.03)',
                                  transition: '0.4s',
                                  boxShadow: '0px 2px 2px 0px black'
                                },
                                '&:active': {
                                  transform: 'scale(1.06)',
                                },
                                transition: '0.4s'}}>

                                <TableCell sx={{color: darkMode ? 'white' : 'black',}}  onClick={()=> setOption(prev=> ('PostHistory') )}>
                                currently on rent // history
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

                                <TableCell sx={{color: darkMode ? 'white' : 'black',}}  onClick={()=> setOption(prev=> ('PostAvailable') )}>

                               availalble for rent

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

                                <TableCell sx={{color: darkMode ? 'white' : 'black',}}  onClick={()=> setOption(prev=> ('PostForm') )}>
                                    make new post
                                   
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                   
                </Grid>

                {/* posts */}
                <Grid item  lg={8.9} md={9.7} sm={9.8} xs={12}>
                                {
                                  (option == 'PostForm') ? <PostForm darkMode = {darkMode} /> :
                                  (option == 'PostAvailable') ? <PostAvailable darkMode = {darkMode}/> : 
                                  (option == 'PostHistory') ? <PostHistory darkMode = {darkMode} /> : ' so emptyyyy'
                                }
                       

                </Grid>
                  
       
            </Grid>

           

            
       </Grid>

      
    </>)
}

export default LandLordHome