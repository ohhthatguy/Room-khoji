import { useState, useContext } from "react"
import {Grid, Paper, Button, styled,Box, TextField, Typography} from "@mui/material"
import Header from "../Header/Header"
import {  useNavigate,Link } from "react-router-dom"
import { API } from "../../services/Api"
import { DataContext } from "../../context/DataProvider"



const StyledGrid = styled(Grid)`
    margin-top: 8rem;
`


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

const Login = ()=>{

    const {setAccount} = useContext(DataContext)
    const navigate = useNavigate()

  const initial = {
    email: '',
    password: ''
  }
    const [logInData, setLogInData] = useState(initial);
    const handleInput =(e)=>{
            setLogInData({...logInData, [e.target.name]: e.target.value})
    }
    // console.log(logInData)
    

    const handleLogIn = async()=>{

        // console.log(logInData)
        try{
            let response = await API.login(logInData)
            
            if(!response.isSuccess){
                console.log("some error came across. RESPONSE: ", response)
            }else{
                // console.log("login successfull")
                    setLogInData(initial)
                    // console.log(response)
                    setAccount(response.data.response)
                    if(response.data.response.category === 'Tenant'){
                navigate('/tenantHome')}else{
                navigate('/landlordHome')}

            }


        }catch(err){
            console.log("Some error in LOGIN. ERROR: ", err)
        }
        
    }


    return (<>
 
        <Grid container justifyContent={'center'} sx={{ padding: '2rem'}}>
            
            
      
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

                        <TextField label='email' name='email' onChange={(e)=>handleInput(e)} variant="standard" required />         
                        <TextField label='password'  name='password' onChange={(e)=>handleInput(e)} type="password" required variant="standard" />    

                        <Button variant="contained" disabled={(logInData.email && logInData.password) ? false : true} onClick={()=>handleLogIn()} >login</Button>

                        <Link style={{textAlign: "center"}} to={'/create/account'}>
                            <Button>Create New Account</Button>
                        </Link>

                </StyledPaper> 
            </Grid>   

        </Grid>   



    </>)


}

export default Login