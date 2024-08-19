import { useContext } from "react"
import { Box,Typography,Button,Paper, Portal } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"


const LogOut = () => {
    const navigate = useNavigate()
    const { setOpenPortal} = useContext(DataContext)

    const handleLogOut =()=>{
        navigate('/')
        setOpenPortal(false)
    }
  return (
    <>
 
        <Paper sx={{border: '1px solid black', background: 'red'}} >
            <Typography>Are you sure you want to logout ?</Typography>
                <Box>
                    <Button variant="contained" onClick={()=>handleLogOut()}>logout</Button>
                    <Button onClick={()=>setOpenPortal(false)}>Cancel</Button>

                </Box>
        </Paper>
  
    
    </>
  )
}

export default LogOut