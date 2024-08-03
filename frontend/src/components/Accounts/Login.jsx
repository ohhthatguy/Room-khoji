import { useState, useContext } from "react"
import {Grid, Paper, Button, styled, TextField} from "@mui/material"
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
    
    padding: 2rem;
   
    gap: 2rem;
    
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

        console.log(logInData)
        try{
            let response = await API.login(logInData)
            
            if(!response.isSuccess){
                console.log("some error came across. RESPONSE: ", response)
            }else{
                console.log("login successfull")
                    setLogInData(initial)
                    console.log(response)
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
    <Header />
        <StyledGrid container >

            <Grid style={{border: "1px solid red", margin: "auto"}} item lg={4} md={6} sm={6} xs={6}>
            <StyledPaper >

                <TextField label='email' name='email' onChange={(e)=>handleInput(e)} variant="standard" required />         
                <TextField label='password'  name='password' onChange={(e)=>handleInput(e)} type="password" required variant="standard" />    

                <Button variant="contained" disabled={(logInData.email && logInData.password) ? false : true} onClick={()=>handleLogIn()} >login</Button>

                <Link style={{textAlign: "center"}} to={'/create/account'}>
                    <Button>Create New Account</Button>
                </Link>

            </StyledPaper> 
            </Grid>   
        </StyledGrid>   



    </>)


}

export default Login