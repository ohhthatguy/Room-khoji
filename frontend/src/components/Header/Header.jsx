
import { AppBar,Box, Toolbar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"

const Header =()=>{


const homeNavigation=()=>{
    navigate('/home')
}


    return (<>
       <AppBar>
            <Box sx={{display: "flex"}}>

            <Toolbar>Hello</Toolbar>

            <Toolbar sx={{'&:hover':{
                cursor: 'pointer',
                transform: 'Scale(1.02)',
                transition: '0.3s'
            },'&:active':{
                cursor: 'pointer',
                transform: 'Scale(1.04)',
            
            },
            transition: '0.3s'}} onClick={()=>homeNavigation()}>Home</Toolbar>

        
        </Box>
       
       </AppBar>
    </>)
}

export default Header