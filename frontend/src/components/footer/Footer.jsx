import { Box,Typography,Grid } from "@mui/material"
import {Instagram, Facebook, GitHub} from '@mui/icons-material';


const Footer = () => {
  return (<>
    <Grid container justifyContent={"space-around"} sx={{border: '1px solid black', height: '20rem', padding: '2rem', background: 'grey'}}>

        <Box sx={{display: 'grid', placeItems: 'center', rowGap: '1.2rem', height: 'fit-content'}}>
            {/* <img  src='https://houses.splash.html.themeplayers.net/images/country-logo2.png' alt='logo' /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 96 96"><g fill="#4d4d4d"><path d="M51 31v61h46V31H54.688zm7.406 7.438h31.188v46.03H85V77h-7v7.47H58.406z"></path><path d="M62 45v8h7v-8z"></path><path d="M85 45h-7v8h7z"></path><path d="M69 70v-8h-7v8z"></path><path d="M78 70h7v-8h-7z"></path></g><g fill="#607ddf"><path d="M39.094 0L36.5 2.828 21 19.292l-1 1.13V92h38.406V20.517l-1.218-1.226L41.812 2.828 39.094 0zm0 10.966l11.812 12.568V84.46H43V73.9h-8v10.56h-7.688V23.533l11.782-12.568z"></path><path d="M43 42h-8v13h8z"></path></g><g fill="#4d4d4d"><path d="M0 52v40h27.406V52H0zm7.406 7.47H20v24.936h-3V81h-7v3.406H7.406V59.47z"></path><path d="M17 66h-7v7h7z"></path></g></svg>
            
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