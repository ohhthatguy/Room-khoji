import { useContext, useEffect, useState } from "react"

import { Button,Box,Typography, FormLabel, RadioGroup, FormControlLabel, TextField, Paper, styled, Radio, TextareaAutosize, TableHead, TableCell,TableRow } from "@mui/material"
import {Cancel, Category} from '@mui/icons-material';

import { DataContext } from "../../../context/DataProvider";
// import { useNavigate } from "react-router-dom"
import { API } from "../../../services/Api"
import PostAvailable from "./PostAvailable";

const PostEdit = ({post, edit, setEdit})=>{
    // console.log(post[0]._id)
    const {setIsUpdatedPost, isUpdatedPost} = useContext(DataContext)

const [postData, setPostData] = useState(post[0])

console.log(postData)

const [productImage, setProductImage] = useState()

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
                    setPostData({...postData, productImages: [...response.data, ...postData.productImages],Date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')} ` })
                 


                }catch(err){
                    console.log("Some error happend. ERROR: ",err)
                }
    
        }

        sendProductImageToDB()
    }

},[productImage])



        
const handleCancel=(ele)=>{
    console.log(ele)
    setPostData({...postData, productImages: [...postData.productImages.filter((e)=> ele !== e )]})
}

const validateForm = ()=>{

let disable;
    if(postData.Description && postData.Location && postData.People && postData.Pets && postData.Category && postData.Parking  && postData.Water && postData.productImages.length > 0 && (postData.Quantity > 0 || postData.Quantity < 10 || postData.Rate > 1000 || postData.Rate < 100000)){

        disable=false
    }else{
        disable=true
    }
    // console.log(disable)    
    return disable
}

// (validateForm())
// console.log(postData)


    const handleInput =(e)=>{
        
        if(e.target.type !== undefined){
        setPostData({...postData, [e.target.name]: e.target.value})
        }

    }

    const handleClick = async()=>{
        console.log(postData)
        try{

            let res = await API.updatePost(postData)
            // console.log(res)
            if(res.isSuccess){
                console.log("successfuly saved/updated post")
                setIsUpdatedPost(prev=>!prev)
                setEdit(0)
                    // <PostAvailable />
               {
            
               }
            }else{
                console.log("failed to saved/updated post")
            }

        }catch(err){
            console.log('error: ', err)
        }
    }

    

    return (<>


    
        <Paper elevation={3} sx={{ display: `${edit == 0 ? 'none' : 'flex'}`,flexDirection: 'column',padding: '2rem', rowGap: '2rem', }}>

                <Box>
                    <FormLabel>Category</FormLabel>
                
                   
                    <RadioGroup row value={postData.Category} onChange={(e)=>setPostData({...postData, Category: e.target.value})} >

                        <FormControlLabel  value='Room' name="Category"  control={<Radio />} label="Room" />
                        <FormControlLabel value='Flat' name="Category"  control={<Radio />} label="Flat" />
                        <FormControlLabel value='Building' name="Category" control={<Radio />} label="Building" />

                    </RadioGroup>

                
                </Box>
                
            <Box  sx={{display: 'flex',flexDirection: 'column',rowGap: '2rem'}}>
    
                
                <TextField label='Quantity' inputProps={{min: 1,max: 10}}  defaultValue={1} error={postData.Quantity  < 1 || postData.Quantity > 10} helperText={postData.Quantity < 0 ? 'Quantity must be at least 1' : postData.Quantity > 10 ? 'Quantity must be at most 10' : ''} type="number" name="Quantity" onChange={(e)=> setPostData({...postData, Quantity: e.target.value})} value={post.Quantity} variant="standard" required /> 

                <TextField label='Rate (/month)' defaultValue={1000}  error={postData.Rate  < 1000 || postData.Rate  > 100000}  helperText={postData.Rate < 1000 ? 'Rate must be at least 1000' : postData.Rate > 100000 ? 'Rate must be at most 100000' : ''} inputProps={{min: 1000,max: 100000}} type="number" name="Rate" onChange={(e)=> setPostData({...postData, Rate: e.target.value})} variant="standard"  value={post.Rate} required />         
            </Box>

            <Box>
                <FormLabel>Water facility</FormLabel>
                <RadioGroup row value={postData.Water} onChange={(e)=>setPostData({...postData, Water: e.target.value})} >

                    <FormControlLabel  value='24hrs' name="Water" control={<Radio />} label="24hrs" />
                    <FormControlLabel value='once /day' name="Water" control={<Radio />} label="once /day" />
                    <FormControlLabel value='Twice /day' name="Water"  control={<Radio />} label="Twice /day" />

                </RadioGroup>
            </Box>

            <Box>
                <FormLabel>Paking facility</FormLabel>
                <RadioGroup row value={postData.Parking} onChange={(e)=>setPostData({...postData, Parking: e.target.value})}>

                    <FormControlLabel  value='spacious' name="Parking"  control={<Radio />} label="spacious" />
                    <FormControlLabel value='narrow' name="Parking"  control={<Radio />} label="narrow" />
                   
                </RadioGroup>
            </Box>

            <Box>
                <FormLabel>Looking for </FormLabel>
                <RadioGroup row value={postData.People} onChange={(e)=>setPostData({...postData, People: e.target.value})} >

                    <FormControlLabel  value='Couple' name="People"  control={<Radio />} label="Couple" />
                    <FormControlLabel value='Student' name="People"  control={<Radio />} label="Student" />
                    <FormControlLabel value='Family' name="People"  control={<Radio />} label="Family" />
                   
                </RadioGroup>
            </Box>

            <Box>
                <FormLabel>Pets </FormLabel>
                <RadioGroup row value={postData.Pets} onChange={(e)=>setPostData({...postData, Pets: e.target.value})}>

                    <FormControlLabel  value='Allowed' name="Pets"  control={<Radio />} label="Allowed" />
                    <FormControlLabel value='Not Allowed' name="Pets" control={<Radio />} label="Not Allowed" />
                  
                </RadioGroup>
            </Box>

                <Box  sx={{display: 'flex',flexDirection: 'column',rowGap: '2rem'}}>

                    <TextField label='Location' value={postData.Location} name="Location" onChange={(e)=> handleInput(e)} variant="standard" required />         

                    <TextareaAutosize style={{padding: '10px', fontSize: '1.15rem'}} placeholder='Description' minRows={5} name="Description" value={postData.Description} onChange={(e)=> handleInput(e)} variant="standard" required />   
                </Box>      

                <Box>
                    <FormLabel>Have any images??</FormLabel>
                    <br />

                        <input multiple onChange={(e)=> setProductImage([...e.target.files])} type="file" id="fileInput" />

                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                {
                    postData.productImages && postData.productImages.length > 0 && postData.productImages.map((ele, index)=>(
                        <Box key={index} sx={{ height: '7rem', width: '7rem',border: '1px solid red',background: `url(${ele}) no-repeat 75% 25% / cover` }} >
                             <Cancel sx={{ display: postData.productImages.length <= 1 ? 'none' : 'block' }} 
                             onClick={()=>handleCancel(ele)}/> 
                        </Box>
                    ))
                }
                  </Box>  
     
                    <Button variant="contained" disabled={ (validateForm()) } onClick={()=> handleClick()}>Update</Button>


                
        </Paper>


    </>
       
    )
}

export default PostEdit