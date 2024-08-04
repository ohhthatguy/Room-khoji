import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, FormLabel, RadioGroup, FormControlLabel, TextField, Paper, styled, Radio, TextareaAutosize, TableHead, TableCell,TableRow } from "@mui/material"
import { Category } from "@mui/icons-material"
// import { DataContext } from "../../context/DataProvider"
// import { useNavigate } from "react-router-dom"
// import { API } from "../../services/Api"





const PostForm = ()=>{

    const initialProductData = {
        Description: "",
        Location: "",
        People: "",
        Pets: "",
        Category: "",
        Parking: "",
        Quantity: "1",
        Rate: "1000",
        Water: "",
        // productImages: []

    }
    const [value, setValue] = useState('');

const [productData, setProductData] = useState(initialProductData)
const [productImage, setProductImage] = useState()

// console.log(productImage)

const validateForm = ()=>{

let sum;
    Object.entries(productData).map(([key,value])=>{
        
       if(value.length == 0){ 
        sum=true  //set disable to true
       }else{
        sum=false
       }
        
    })

        if(!sum && (productData.Quantity < 0 || productData.Quantity > 10 || productData.Rate < 1000 || productData.Rate > 100000)){
            sum = true
        }
    
    
    return sum
}

(validateForm())

    const handleInput =(e)=>{
        
        if(e.target.type !== undefined){
        setProductData({...productData, [e.target.name]: e.target.value})
        }

    }

    const handleClick = ()=>{
        console.log(productData)
    }

    return (<>
        <Paper elevation={3} sx={{ display: 'flex',flexDirection: 'column',padding: '2rem', rowGap: '2rem'}}>

                <Box>
                    <FormLabel>Category</FormLabel>
                    <RadioGroup row>

                        <FormControlLabel  value='Room' name="Category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Room" />
                        <FormControlLabel value='Flat' name="Category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Flat" />
                        <FormControlLabel value='Building' name="Category" onClick={(e)=> handleInput(e)} control={<Radio />} label="Building" />

                    </RadioGroup>
                </Box>
                
            <Box  sx={{display: 'flex',flexDirection: 'column',rowGap: '2rem'}}>
    
                
                <TextField label='Quantity' inputProps={{min: 1,max: 10}}  defaultValue={1} error={productData.Quantity  < 1 || productData.Quantity > 10} helperText={productData.Quantity < 0 ? 'Quantity must be at least 1' : productData.Quantity > 10 ? 'Quantity must be at most 10' : ''} type="number" name="Quantity" onChange={(e)=> handleInput(e)} variant="standard" required /> 

                <TextField label='Rate (/month)' defaultValue={1000}  error={productData.Rate  < 1000 || productData.Rate  > 100000}  helperText={productData.Rate < 1000 ? 'Rate must be at least 1000' : productData.Rate > 100000 ? 'Rate must be at most 100000' : ''} inputProps={{min: 1000,max: 100000}} type="number" name="Rate" onChange={(e)=> handleInput(e)} variant="standard" required />         
            </Box>

            <Box>
                <FormLabel>Water facility</FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='24hrs' name="Water" onClick={(e)=> handleInput(e)} control={<Radio />} label="24hrs" />
                    <FormControlLabel value='once /day' name="Water" onClick={(e)=> handleInput(e)} control={<Radio />} label="once /day" />
                    <FormControlLabel value='Twice /day' name="Water" onClick={(e)=> handleInput(e)} control={<Radio />} label="Twice /day" />

                </RadioGroup>
            </Box>

            <Box>
                <FormLabel>Paking facility</FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='spacious' name="Parking" onClick={(e)=> handleInput(e)} control={<Radio />} label="spacious" />
                    <FormControlLabel value='narrow' name="Parking" onClick={(e)=> handleInput(e)} control={<Radio />} label="narrow" />
                   
                </RadioGroup>
            </Box>

            <Box>
                <FormLabel>Looking for </FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='Couple' name="People" onClick={(e)=> handleInput(e)} control={<Radio />} label="Couple" />
                    <FormControlLabel value='Student' name="People" onClick={(e)=> handleInput(e)} control={<Radio />} label="Student" />
                    <FormControlLabel value='Family' name="People" onClick={(e)=> handleInput(e)} control={<Radio />} label="Family" />
                   
                </RadioGroup>
            </Box>

            <Box>
                <FormLabel>Pets </FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='Allowed' name="Pets" onClick={(e)=> handleInput(e)} control={<Radio />} label="Allowed" />
                    <FormControlLabel value='Not Allowed' name="Pets" onClick={(e)=> handleInput(e)} control={<Radio />} label="Not Allowed" />
                  
                </RadioGroup>
            </Box>

                <Box  sx={{display: 'flex',flexDirection: 'column',rowGap: '2rem'}}>

                    <TextField label='Location' name="Location" onChange={(e)=> handleInput(e)} variant="standard" required />         

                    <TextareaAutosize style={{padding: '10px', fontSize: '1.15rem'}} placeholder='Description' minRows={5} name="Description" onChange={(e)=> handleInput(e)} variant="standard" required />   
                </Box>      

                <Box>
                <FormLabel>Have any images??</FormLabel>
                <br />

                   
                        <input multiple onChange={(e)=> setProductImage(e.target.files)} type="file" id="fileInput" />
                    
                    {/* <AttachFile htmlFor="fileInput" fontSize="large" 
                    
                    sx={{
                         ':hover':{
                        cursor: 'pointer',
                        transform: 'scale(1.02)',
                        transition: '0.4s'
                    },
                   
                    transition: '0.4s' }} /> */}

                    </Box>
                    
                    <Button variant="contained" disabled={ (validateForm() ? true : false) } onClick={()=> handleClick()}>Look for teanants</Button>


                
        </Paper>


    </>
       
    )
}

export default PostForm