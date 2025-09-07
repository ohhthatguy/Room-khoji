import { useState, useContext } from "react"
import {Grid, Paper, Button, styled,Box, TextField, Typography} from "@mui/material"
import Header from "../Header/Header"
import {  useNavigate,Link } from "react-router-dom"
import { API } from "../../services/Api"
import { DataContext } from "../../context/DataProvider"
import toast from 'react-hot-toast'



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
        console.log(e)
            setLogInData({...logInData, [e.target.name]: e.target.value})
    }

    console.log(logInData)
    
    const handleLogIn = async()=>{

        // console.log(logInData)
        try{
            let response = await API.login(logInData)
            
            if(!response.isSuccess){
                console.log("some error came across. RESPONSE: ", response)
                toast.error("Error in login")
            }else{
                // console.log("login successfull")
                    setLogInData(initial)
                    console.log(response)
                    
                    const name = response.data.response.name
                    const profile = response.data.response.profile
                    const _id = response.data.response._id
                    
                    const currentUser = {name, profile,_id}


                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    setAccount(response.data.response)
                    if(response.data.response.category === 'Tenant'){
                        navigate('/tenantHome')}else{
                        navigate('/landlordHome')}

            }


        }catch(err){
            console.log("Some error in LOGIN. ERROR: ", err)
                toast.error("Error in login")

        }
        
    }


    return (<>
 
        <Grid container justifyContent={'center'} sx={{ padding: '2rem', height: '100vh'}}>
            
            
      
            <Grid item sx={{textAlign: 'right', position: 'relative', display:{xs:'none', sm: 'block'} }} lg={4} md={5} sm={5} xs>
                    <StyledImg src='https://cdn.pixabay.com/photo/2019/05/24/11/00/interior-4226020_1280.jpg' alt='bg-login' />
                    {/* <Typography variant="h5" sx={{position: 'absolute', top: '5%', left: '25%'}}>screen to room</Typography> */}
            </Grid>

          
            <Grid item  lg={4} md={5} sm={6} xs={10} >

                <StyledPaper >

                        <Box sx={{display: 'grid', placeItems: 'center'}}>
                            {/* <img src='https://www.daft.ie/static/images/daft-logo-all-white.svg' alt='logo' /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 96 96"><g fill="#4d4d4d"><path d="M51 31v61h46V31H54.688zm7.406 7.438h31.188v46.03H85V77h-7v7.47H58.406z"></path><path d="M62 45v8h7v-8z"></path><path d="M85 45h-7v8h7z"></path><path d="M69 70v-8h-7v8z"></path><path d="M78 70h7v-8h-7z"></path></g><g fill="#607ddf"><path d="M39.094 0L36.5 2.828 21 19.292l-1 1.13V92h38.406V20.517l-1.218-1.226L41.812 2.828 39.094 0zm0 10.966l11.812 12.568V84.46H43V73.9h-8v10.56h-7.688V23.533l11.782-12.568z"></path><path d="M43 42h-8v13h8z"></path></g><g fill="#4d4d4d"><path d="M0 52v40h27.406V52H0zm7.406 7.47H20v24.936h-3V81h-7v3.406H7.406V59.47z"></path><path d="M17 66h-7v7h7z"></path></g></svg>

                            <Typography variant="h5">Room Finder</Typography>

                        </Box>

                        <TextField label='email' name='email'  onChange={(e)=>handleInput(e)} variant="standard" required />         
                        <TextField label='password'  name='password'  onChange={(e)=>handleInput(e)} type="password" required variant="standard" />    

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