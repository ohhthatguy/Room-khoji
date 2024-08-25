import { useContext, useRef, useEffect } from "react"
import { Box,Typography,Button,Paper, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import { gsap } from "gsap"
import Header from "../Header/Header"



const LogOut = () => {
    const navigate = useNavigate()
    const logOutRef = useRef(null)
    const { openPortal, setOpenPortal} = useContext(DataContext)
    const tl = useRef(gsap.timeline())

   
    const handleLogOut1 =()=>{
        navigate('/')
        setOpenPortal(false)
    }

    const handleCancel = ()=>{
       
        console.log('herer2')
        tl.current.reverse().eventCallback("onReverseComplete", () => {
            setOpenPortal(false);
        });
        

    }

    useEffect(()=>{
            console.log('herer1')
            tl.current.fromTo(logOutRef.current, { opacity: 0}, {opacity: 1})
            console.log('herer2')

    },[])

    //popup animation 
    // console.log(openPortal)
 
    
  
 
  return (
    <>
    <Header />


        <Grid ref={logOutRef} container justifyContent={'center'} alignItems={'center'} sx={{border: '1px solid black', background: '#000000', width: '40%', position: 'fixed', top: '30%', left: '50%', transform: 'Translate(-50%)', padding: '2rem'}} >
            
            <Grid item sx={{ padding: '1.5rem', background: '#111010', width: '90%', height: '100%'}}>
                <Typography variant="h5" sx={{color: 'white'}}>Are you sure you want to logout ?</Typography>
                <hr></hr>
                    <Box sx={{padding: '1.25rem', display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="contained" onClick={()=>handleLogOut1()}>logout</Button>
                        <Button onClick={()=>handleCancel()}>Cancel</Button>

                    </Box>
                </Grid>
        </Grid>
  
    
    </>
  )
}

export default LogOut