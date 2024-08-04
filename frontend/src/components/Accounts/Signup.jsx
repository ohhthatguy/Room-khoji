import { useState,useEffect,useContext,useRef } from "react"
import {Paper, Button,Grid, Box,styled,Checkbox, Radio, RadioGroup, FormGroup, FormControlLabel, TextField, FormLabel} from "@mui/material"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom"
import { API } from "../../services/Api"


const StyledPaper = styled(Paper)`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    
    padding: 2rem;
   
    gap: 2rem;
    
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
                    // setimgUrl(`http://localhost:6969/${profileImage.name}`)
                    setSignUpData({...signUpData, profile:response.data})
                }
                

            }catch(err){
                console.log("ERROR: ", err)
            }
          

        }

        console.log(`profile: ${signUpData.profile}`)


        
    return (<>
        <Header />
        <Grid container style={{marginTop: '8rem', border: '1px solid black' }}>

            <Grid style={{margin: "auto"}} item>

            <StyledPaper >


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