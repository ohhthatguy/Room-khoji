import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, FormLabel, RadioGroup, FormControlLabel, TextField, Paper, styled, Radio, TextareaAutosize, TableHead, TableCell,TableRow } from "@mui/material"
import {Cancel} from '@mui/icons-material';

import { DataContext } from "../../../context/DataProvider";
// import { useNavigate } from "react-router-dom"
import { API } from "../../../services/Api"
import PostAvailable from "./PostAvailable";

const PostForm = ({darkMode})=>{

    const account = JSON.parse(localStorage.getItem('currentUser'))

    const initialProductData = {
        Gharbeti_id: account._id,
        Gharbeti_name: account.name,
        Gharbeti_profile: account.profile[0],
        Description: "",
        Location: "",
        People: "",
        Pets: "",
        Category: "",
        Parking: "",
        Quantity: "1",
        Rate: "1000",
        Water: "",
        productImages: [],
        Date: ""
    }


const [productData, setProductData] = useState(initialProductData)
const [productImage, setProductImage] = useState()
const [success, setSuccess] = useState(false)

// console.log(productImage)

useEffect(()=>{

    if(productImage){
            
        const sendProductImageToDB = async()=>{
            
            console.log('here')
                const data = new FormData()
                
                productImage.map((e)=>{
                    data.append("image", e)
                })
                
                try{

                    let response = await API.getProductPicture(data)
                    console.log(response.data);
                    setProductData({...productData, productImages: [...response.data],Date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')} ` })
                 


                }catch(err){
                    console.log("Some error happend. ERROR: ",err)
                }
    
        }

        sendProductImageToDB()
    }

},[productImage])



        
const handleCancel=(ele)=>{
    console.log(ele)
    setProductData({...productData, productImages: [...productData.productImages.filter((e)=> ele !== e )]})
}

const validateForm = ()=>{

let disable;
    if(productData.Description && productData.Location && productData.People && productData.Pets && productData.Category && productData.Parking  && productData.Water && productData.productImages.length > 0 && (productData.Quantity > 0 || productData.Quantity < 10 || productData.Rate > 1000 || productData.Rate < 100000)){

        disable=false
    }else{
        disable=true
    }
    // console.log(disable)    
    return disable
}




    const handleInput =(e)=>{
        
        if(e.target.type !== undefined){
        setProductData({...productData, [e.target.name]: e.target.value})
        }

    }

    const handleClick = async()=>{
        console.log(productData)
        try{

            let res = await API.savePost(productData)
            // console.log(res)
            if(res.isSuccess){
                console.log("successfuly saved/updated post")
                setSuccess(true)
              
            }else{
                console.log("failed to saved/updated post")
            }

        }catch(err){
            console.log('error: ', err)
        }
    }

    return (<>
                {

                 (success == true) ?
                <PostAvailable /> :


        <Paper elevation={3} sx={{border: '2px solid #587351', background: darkMode ? '#494F55' : '#F5F5F5', display: 'flex',flexDirection: 'column',padding: '2rem', rowGap: '2rem'}}>

                <Box  sx={{color: darkMode ? 'white' : 'black'}}>
                    <FormLabel sx={{color: darkMode ? 'white' : 'black'}}>Category</FormLabel>
                    <RadioGroup row >

                        <FormControlLabel  value='Room' name="Category" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}}/>} label="Room" />
                        <FormControlLabel value='Flat' name="Category" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Flat" />
                        <FormControlLabel value='Building' name="Category" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Building" />

                    </RadioGroup>
                </Box>
                
            <Box  sx={{display: 'flex',flexDirection: 'column',rowGap: '2rem'}}>
    
                
                <TextField label='Quantity' inputProps={{min: 1,max: 10}}  defaultValue={1} error={productData.Quantity  < 1 || productData.Quantity > 10} helperText={productData.Quantity < 0 ? 'Quantity must be at least 1' : productData.Quantity > 10 ? 'Quantity must be at most 10' : ''} type="number" name="Quantity" onChange={(e)=> handleInput(e)} variant="standard"  required sx={{
      '& .MuiInputLabel-root': { color: darkMode ? 'white' : 'black' },
      '& .MuiInputBase-input': { color: darkMode ? 'white' : 'black' },
      '& .MuiFormHelperText-root': { color: darkMode ? 'white' : 'black' },
    }} /> 

                <TextField label='Rate (/month)' defaultValue={1000}  error={productData.Rate  < 1000 || productData.Rate  > 100000}  helperText={productData.Rate < 1000 ? 'Rate must be at least 1000' : productData.Rate > 100000 ? 'Rate must be at most 100000' : ''} inputProps={{min: 1000,max: 100000}} type="number" name="Rate" onChange={(e)=> handleInput(e)} variant="standard" required sx={{
      '& .MuiInputLabel-root': { color: darkMode ? 'white' : 'black' },
      '& .MuiInputBase-input': { color: darkMode ? 'white' : 'black' },
      '& .MuiFormHelperText-root': { color: darkMode ? 'white' : 'black' },
    }} />         
            </Box>

            <Box sx={{color: darkMode ? 'white' : 'black'}}>
                <FormLabel sx={{color: darkMode ? 'white' : 'black'}}>Water facility</FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='24hrs' name="Water" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="24hrs" />
                    <FormControlLabel value='once /day' name="Water" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="once /day" />
                    <FormControlLabel value='Twice /day' name="Water" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Twice /day" />

                </RadioGroup>
            </Box>

            <Box sx={{color: darkMode ? 'white' : 'black'}}>
                <FormLabel sx={{color: darkMode ? 'white' : 'black'}}>Paking facility</FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='spacious' name="Parking" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="spacious" />
                    <FormControlLabel value='narrow' name="Parking" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="narrow" />
                   
                </RadioGroup>
            </Box>

            <Box sx={{color: darkMode ? 'white' : 'black'}}>
                <FormLabel sx={{color: darkMode ? 'white' : 'black'}}>Looking for </FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='Couple' name="People" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Couple" />
                    <FormControlLabel value='Student' name="People" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Student" />
                    <FormControlLabel value='Family' name="People" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Family" />
                   
                </RadioGroup>
            </Box>

            <Box sx={{color: darkMode ? 'white' : 'black'}}>
                <FormLabel sx={{color: darkMode ? 'white' : 'black'}}>Pets </FormLabel>
                <RadioGroup row >

                    <FormControlLabel  value='Allowed' name="Pets" onClick={(e)=> handleInput(e)} control={<Radio  sx={{color: darkMode ? 'white' : 'black'}}/>} label="Allowed" />
                    <FormControlLabel value='Not Allowed' name="Pets" onClick={(e)=> handleInput(e)} control={<Radio sx={{color: darkMode ? 'white' : 'black'}} />} label="Not Allowed" />
                  
                </RadioGroup>
            </Box>

                <Box  sx={{display: 'flex',flexDirection: 'column',rowGap: '2rem'}}>

                    <TextField label='Location' name="Location" onChange={(e)=> handleInput(e)} variant="standard" required sx={{
      '& .MuiInputLabel-root': { color: darkMode ? 'white' : 'black' },
      '& .MuiInputBase-input': { color: darkMode ? 'white' : 'black' },
      '& .MuiFormHelperText-root': { color: darkMode ? 'white' : 'black' },
    }}   />         

                    <TextareaAutosize style={{padding: '10px', fontSize: '1.15rem'}} placeholder='Description' minRows={5} name="Description" onChange={(e)=> handleInput(e)} variant="standard" required  style={{
    padding: '10px',
    fontSize: '1.15rem',
    color: darkMode ? 'white' : 'black',
    backgroundColor: darkMode ? '#333' : '#fff',  // Optionally adjust background color for dark mode
  }} />   
                </Box>      

                <Box sx={{color: darkMode ? 'white' : 'black'}}>
                    <FormLabel sx={{color: darkMode ? 'white' : 'black'}}>Have any images??</FormLabel>
                    <br />

                        <input multiple onChange={(e)=> setProductImage([...e.target.files])} type="file" id="fileInput" />

                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                {
                    productData.productImages.length > 0 && productData.productImages.map((ele, index)=>(
                        <Box key={index} sx={{ height: '7rem', width: '7rem',border: '1px solid red',background: `url(${ele}) no-repeat 75% 25% / cover` }} > <Cancel onClick={()=>handleCancel(ele)}/> </Box>
                    ))
                }
                  </Box>  
     
                    <Button variant="contained" disabled={ (validateForm()) } style={{color: darkMode ? 'white' : 'black'}} onClick={()=> handleClick()}>Look for teanants</Button>


                
        </Paper>

            }
    </>
       
    )
}

export default PostForm