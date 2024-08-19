import { Box,Typography,Grid } from "@mui/material"
import {Instagram, Facebook, GitHub} from '@mui/icons-material';


const Footer = () => {
  return (<>
    <Grid container justifyContent={"space-around"} sx={{border: '1px solid black', height: '20rem', padding: '2rem', background: 'grey'}}>

        <Box sx={{display: 'grid', placeItems: 'center', rowGap: '1.2rem', height: 'fit-content'}}>
            <img  src='https://houses.splash.html.themeplayers.net/images/country-logo2.png' alt='logo' />
            
            <Typography>your final destination for a better home</Typography>
        
            <Box>
                <Instagram />
                <Facebook />
                <GitHub />
            </Box>

        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-around', gap: '5rem', width: '40%'}}>
            <Box >
               <strong> About </strong>

               <Typography>Site</Typography>
               <Typography>Developer</Typography>

            </Box>

            <Box>
               <strong> Home </strong>
               <Typography>Homepage</Typography>
            </Box>

            <Box>
               <strong> Favourites </strong>
               <Typography>My Favourites</Typography>
            </Box>
        </Box>


    </Grid>
 </> )
}

export default Footer