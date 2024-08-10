
import { AppBar,Box, Toolbar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { useContext } from "react"


const Header =()=>{

    const {account} = useContext(DataContext)
    const navigate = useNavigate()
    // console.log(account)

const homeNavigation=()=>{
    (account.category == "Tenant") ? navigate('/tenantHome') : navigate('/landlordHome')
}

const myFav =()=>{
    navigate(`/tenant/favroit`)
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

            <Toolbar sx={{'&:hover':{
                cursor: 'pointer',
                transform: 'Scale(1.02)',
                transition: '0.3s'
            },'&:active':{
                cursor: 'pointer',
                transform: 'Scale(1.04)',
            
            },
            transition: '0.3s'}} onClick={()=>myFav()}>My Favourite</Toolbar>

        
        </Box>
       
       </AppBar>
    </>)
}

export default Header