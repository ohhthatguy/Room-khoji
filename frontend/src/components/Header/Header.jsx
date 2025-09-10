
import { AppBar,Avatar,Box, Toolbar } from "@mui/material"
import {Logout, DarkMode, LightMode} from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { useContext } from "react"




const Header =()=>{

    const {account, setOpenPortal, setDarkMode, darkMode} = useContext(DataContext)
    const navigate = useNavigate()
    // console.log(account)

const homeNavigation=()=>{
    (JSON.parse(localStorage.getItem('currentUser')).category == "Tenant") ? navigate('/tenantHome') :  navigate('/landlordHome') 
}

const myFav =()=>{
    navigate(`/tenant/favroit`)
}

const handleLogOut=()=>{
   
}

const handleDarkMode =()=>{
    !darkMode ?  setDarkMode(true) : setDarkMode(false)
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
                    transition: '0.3s'}} onClick={()=>navigate("/myschedule")}>My Schedule</Toolbar>

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
                        // transform: 'Scale(1.02)',
                        transition: '0.3s'
                    },'&:active':{
                        cursor: 'pointer',
                        transform: 'Scale(1.04)',
                    
                    },
                    transition: '0.3s'}}>
                  
                        <Logout onClick={()=>  setOpenPortal(prev=> !prev)} />
                    </Toolbar>




                    <Toolbar  onClick={()=> handleDarkMode()}  sx={{'&:hover':{
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

                    </Toolbar>

                </Box>
        
        </Box>
       
       </AppBar>
    </>)
}

export default Header