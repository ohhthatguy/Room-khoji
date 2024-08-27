import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, Card, CardHeader, CardMedia, CardContent, Paper, styled, Grid, Table, TableHead, TableCell,TableRow } from "@mui/material"
// import { DataContext } from "../../context/DataProvider"
// import { useNavigate } from "react-router-dom"
// import { API } from "../../services/Api"





const PostHistory = ({darkMode})=>{

//if any history steore in a var and send it as <postcard post = {post} /> else show this no room seold

    return (<>

        <Box sx={{background: darkMode && '#0F283F ' , color: darkMode && 'white', textAlign: 'center', fontSize: '2rem'}}>No room has been selected by any tenants yet!</Box>
    </>
       
    )
}

export default PostHistory