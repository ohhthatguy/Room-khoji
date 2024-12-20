import { useState,useEffect,useContext,useRef } from "react"
import {Paper, Button,Grid, Box,styled,Checkbox, Typography, Radio, RadioGroup, FormGroup, FormControlLabel, TextField, FormLabel} from "@mui/material"

import { useNavigate } from "react-router-dom"
import { API } from "../../services/Api"


const StyledPaper = styled(Paper)`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
   background: #E5DFDB;
    height: 100%;
    padding: 2rem;
   
    gap: 2rem;
`

const StyledImg = styled('img')`
width: 100%;
height: 100%;
object-fit: cover;
border: 1px solid black;

`



const Signup = ()=>{
    const navigate = useNavigate()
    const firstLoad = useRef(true)

        const initial = {
            category: '',
            profile: '',
            name: '',
            email: '',
            password: '',
            date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')} `
           
        }

        const [signUpData, setSignUpData] = useState(initial)
        const [profileImage, setProfileImage] = useState()
    
   
        const handleInput =(e)=>{
        
            if(e.target.type !== undefined){
            setSignUpData({...signUpData, [e.target.name]: e.target.value})
            }

        }

        useEffect(()=>{

            if(firstLoad.current){
                firstLoad.current= false;
                 
            }else{
                const createAccount =async()=>{
                    console.log(signUpData)
                    
                    try{
                        let response = await API.createNewAccount(signUpData)
                        if(!response.isSuccess){
                            console.log("Server has sent data to frontend but some eroor in frntend")
                        }else{
                            console.log("data saved")
                            navigate('/')
                        }
                        
        
                    }catch(err){
                        console.log("ERROR: ", err)
                    }
                  
        
                }
    
                createAccount()
    
            }

            
console.log("here")
console.log(signUpData)

        },[signUpData.profile])
       

        const handleClick =async()=>{
            console.log(signUpData)
            

            const data = new FormData()
            // data.append("name", profileImage.name)
            data.append("image", profileImage)
            
            try{
                let response = await API.getProductPicture(data)
                if(!response.isSuccess){
                    console.log("Server has sent data to frontend but some eroor in frntend")
                    
                }else{
                    console.log("photo saved")
                    console.log(response.data)
                   
                    setSignUpData({...signUpData, profile:response.data})
                }
                

            }catch(err){
                console.log("ERROR: ", err)
            }
          

        }

        console.log(`profile: ${signUpData.profile}`)


        
    return (<>
      
        <Grid container justifyContent={'center'} sx={{ padding: '2rem', height: '100vh'}}>

        <Grid item sx={{textAlign: 'right', position: 'relative', display:{xs:'none', sm: 'block'} }} lg={4} md={5} sm={5} xs>
                    <StyledImg src='https://cdn.pixabay.com/photo/2019/05/24/11/00/interior-4226020_1280.jpg' alt='bg-login' />
                    <Typography variant="h5" sx={{position: 'absolute', top: '5%', left: '25%'}}>screen to room</Typography>
            </Grid>

                 
            <Grid item  lg={4} md={5} sm={6} xs={10} >

                    <StyledPaper >

                    <Box sx={{display: 'grid', placeItems: 'center'}}>
                            <img src='https://houses.splash.html.themeplayers.net/images/country-logo2.png' alt='logo' />

                            <Typography variant="h5">Room Finder</Typography>

                        </Box>


                    <Box>
                        <FormLabel>Category</FormLabel>
                        
                        <RadioGroup row >
                            <FormControlLabel  value='Tenant' name="category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Tenant" />
                            <FormControlLabel value='Landlord' name="category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Landlord" />
                        </RadioGroup>
                        
                    </Box>



                        <TextField label='Full Name' name="name" onChange={(e)=> handleInput(e)} variant="standard" required />         
                        
                        <TextField label='Email' name='email' onChange={(e)=> handleInput(e)} variant="standard" required />   

                        <TextField label='Password'  name='password' onChange={(e)=> handleInput(e)} type="password" required variant="standard" /> 

                        <label>
                                <input  onChange={(e)=> setProfileImage(e.target.files[0])} type="file" id="fileInput" />
                            
                            {/* <AttachFile htmlFor="fileInput" fontSize="large" 
                            
                            sx={{
                                ':hover':{
                                cursor: 'pointer',
                                transform: 'scale(1.02)',
                                transition: '0.4s'
                            },
                        
                            transition: '0.4s' }} /> */}

                            </label>
                                                                                {/* && profileImage */}
                        <Button variant="contained" disabled={ (signUpData.name && signUpData.email && signUpData.category &&signUpData.password) ? false : true } onClick={()=> handleClick()}>signup</Button>
                        
            
                    </StyledPaper>   


                </Grid>    


            </Grid>
    
    
        </>)


}

export default Signup