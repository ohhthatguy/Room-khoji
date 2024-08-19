
import { AppBar,Avatar,Box, Toolbar } from "@mui/material"
import {Logout, LightMode, DarkMode} from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { useContext } from "react"


const Header =()=>{

    const {account, setOpenPortal} = useContext(DataContext)
    const navigate = useNavigate()
    console.log(account)

const homeNavigation=()=>{
    (account.category == "Tenant") ? navigate('/tenantHome') :  navigate('/') 
}

const myFav =()=>{
    navigate(`/tenant/favroit`)
}

const handleLogOut=()=>{
    setOpenPortal(true)
}


    return (<>
       <AppBar sx={{background: 'black'}}>

            <Box sx={{display: "flex", justifyContent: 'space-between'}}>
                
                <Box sx={{display: "flex"}}>
                    <Toolbar>
                    <Avatar  src='https://houses.splash.html.themeplayers.net/images/country-logo2.png' alt='logo' />
                    </Toolbar>
                

                    <Toolbar sx={{'&:hover':{
                        cursor: 'pointer',
                        transform: 'Scale(1.02)',
                        transition: '0.3s'
                    },'&:active':{
                        cursor: 'pointer',
                        transform: 'Scale(1.04)',
                    
                    },
                    transition: '0.3s'}} onClick={()=>homeNavigation()}>Home</Toolbar>

                    <Toolbar sx={{'&:hover':{
                        cursor: 'pointer',
                        transform: 'Scale(1.02)',
                        transition: '0.3s'
                    },'&:active':{
                        cursor: 'pointer',
                        transform: 'Scale(1.04)',
                    
                    },
                    transition: '0.3s'}} onClick={()=>myFav()}>My Favourite</Toolbar>

        <Toolbar sx={{'&:hover':{
                        cursor: 'pointer',
                        transform: 'Scale(1.02)',
                        transition: '0.3s'
                    },'&:active':{
                        cursor: 'pointer',
                        transform: 'Scale(1.04)',
                    
                    },
                    transition: '0.3s'}}>About</Toolbar>
                </Box>

                <Box sx={{display: 'flex'}}>

                    <Toolbar sx={{'&:hover':{
                        cursor: 'pointer',
                        transform: 'Scale(1.02)',
                        transition: '0.3s'
                    },'&:active':{
                        cursor: 'pointer',
                        transform: 'Scale(1.04)',
                    
                    },
                    transition: '0.3s'}}>
                  
                        <Logout onClick={()=> handleLogOut()} />
                    </Toolbar>

                    <Toolbar>

                        <DarkMode />

                    </Toolbar>

                </Box>
        
        </Box>
       
       </AppBar>
    </>)
}

export default Header