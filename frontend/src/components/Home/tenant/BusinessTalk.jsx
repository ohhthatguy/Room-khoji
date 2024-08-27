import { useEffect, useState, useContext } from "react"
import Header from "../../Header/Header"
import { Button,Box,Typography, Card, CardHeader, CardContent, Table,TableHead, TableRow, TableCell, Grid, Avatar, TableBody } from "@mui/material"
import {NavigateNext, NavigateBefore } from '@mui/icons-material';
import { useParams } from "react-router-dom"
import { API } from "../../../services/Api"
import {DataContext} from "../../../context/DataProvider"

const BusinessTalk = ({darkMode}) => {

    const {id} = useParams();
    const {currentPost,setCurrentPost} = useContext(DataContext) //post tobe rented is saved
  
    // console.log(id)
    
   
    const [signature, setSignature] = useState('')
    const [total_amount, setTotalAmount] = useState('')
    const [uuid, setUuid] = useState('')
    // const [properAmount, setProperAmount] = useState(false)
    // const [selectedOption, setSelectedOption] = useState(Category)
    // const myUUID = uuidv4();
    // console.log(myUUID);

    
    const eSewaParameters = {
        total_amount: `${(currentPost[0]?.Rate * currentPost[0]?.Quantity + (0.25 * currentPost[0]?.Rate * currentPost[0]?.Quantity))/1000}`
    }

    
    const [movement, setMovement] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
   
    // eSewaParameters.amount >= 0 ? console.log(true) : console.log(false)

    const handleNext = (totalProductImages, index)=>{
   console.log(index)
   setActiveIndex(index)
     if(movement == totalProductImages - 1){ //last img
          //  //donothing
            
         }else{
            setMovement(prev=> prev+1)
            }     
    }

    const handlePrev= (index)=>{
        setActiveIndex(index)
        console.log(index)
        if(movement-1 == -1){ //first img
            //do nothing
            
        }else if(movement!=0){
            setMovement(prev=> prev-1)
        }
       
        
    }

   
    
    useEffect(()=>{

            const getPostOfCategory = async()=>{
                try{
                    const res = await API.getPostsOfId({postId: id})
                    if(res.isSuccess){
                        // console.log(res.data)
                        localStorage.setItem('currentPost', JSON.stringify(res.data));
                        setCurrentPost(res.data)
                       
                    }else{
                        console.log('is failure')
                    }
                }catch(err){
                    console.log(err)
                }


            }

            getPostOfCategory()
        }

    ,[])

    if(currentPost.length > 0){
   
    }
        
       

    //signature and uuid
    useEffect(()=>{
// console.log('here')
        if(currentPost[0]?.Rate >=0){
            // console.log(eSewaParameters)
            const getSignature = async()=>{
                try{
                    const res = await API.getSignature(eSewaParameters)
                    if(res.isSuccess){
                        // console.log("success in getting singuatire", res.data.signature)S
                        setSignature(res.data.signature)
                        setUuid(res.data.transaction_uuid)
                        setTotalAmount(res.data.total_amount)
                    }else{
                        console.log("fialed to get singature, ", res)
                    }
                }catch(err){
                    console.log(err)
                }
            }
            getSignature()
        }

    },[currentPost])
    
console.log(currentPost)


console.log(eSewaParameters)
// console.log(signature)
      
const checkForTable = ['Location', 'Parking', 'Quantity', 'Rate', 'Location']
          

  return (
  <>
   <Header />

{/* <Box>
  
 </Box> */}

 

   
   <Box sx={{marginTop: '4rem',display:'flex', color: darkMode ? 'white' : 'black', justifyContent: 'center', gap: '10px', marginBottom: '1.22rem', paddingTop: '1.5rem'}}>

          lets talk business

        </Box>

       <Grid container justifyContent="center" >

      
       
             
        {
            (currentPost.length > 0) ? 
        
        <Grid item sx={{display:'flex',rowGap: '2rem', flexDirection: 'column-reverse' }} lg={7} md={8} sm={8}>
            {

            currentPost.map((e,index)=>(

                <Card key={index} sx={{border: '1px solid red', position: 'relative',  backgroundColor: '#FFF9E6'}} >


                <CardHeader avatar={ <Avatar  src={e.Gharbeti_profile} alt={e.Gharbeti_name} />} title={ e.Gharbeti_name} subheader={e.Date} /> 

                {/* <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    
                </Box> */}

                <Box sx={{border: '1px solid red', position: 'relative'}}>
           
                    <Box sx={{width: '100%', zIndex: '1', position: 'absolute', top: '50%'}}>
            
                        <NavigateBefore disabled={(movement-1 == -1) ? true : false} fontSize="large" sx={{ marginRight: '0%', display:`${e.productImages.length <= 1 ? 'none' : 'block'}`}} onClick={()=>handlePrev(index)}/>
                       
                        <NavigateNext disabled={(movement == e.productImages.length - 1) ? true : false}  fontSize="large" sx={{marginLeft: '90%', display:`${e.productImages.length <= 1 ? 'none' : 'block'}`}} onClick={()=>handleNext( e.productImages.length, index)}/>

                        
                    </Box>    
           

                <Box sx={{border: '2px solid black', height: '20rem', display: 'flex',  transform: (activeIndex === index) ? `  translateX(-${movement * 100}%)` : `translateX(0px)`, transition: '0.5s' }} >

                   
                    {
                        e.productImages.map((item,index)=>(
                            <Box key={index} sx={{background: `url(${item}) no-repeat 50% 50% / contain`, width: '100%', height: '20rem', flex: '0 0 100%',
                            height: '100%',}} ></Box>
                            
                        ))
                    }
                </Box>

                </Box>

                    <Typography variant="caption"> Reciept </Typography>
                <CardContent>
                    
                    <Typography variant="h5">{e.Description}</Typography>
                </CardContent>
                    
                        <Table sx={{border: '1px solid black'}}>
                        <TableHead>
                            <TableRow sx={{background: 'grey'}}>
                        {
                            Object.entries(currentPost[0]).map(([key,value], index)=>(
                                (checkForTable.includes(key)) &&
                                <TableCell key={index}>
                               <strong> {key} </strong>
                                </TableCell>
                            ))
                        }
                            </TableRow>
                        </TableHead>

                        <TableBody>
                          
                        <TableRow>
                        {
                                Object.entries(currentPost[0]).map(([key,value], index)=>(
                                    (checkForTable.includes(key)) &&
                            <TableCell key={index}>
                            {value}
                            </TableCell>
                            ))
                        }
                        </TableRow>
                            
                        </TableBody>

                        </Table>
 
                <Box>
             
                
                <Table sx={{marginTop: '2rem', border: '1px solid black', padding: '2rem'}} >
                    <TableHead>
                        <TableRow >
                            <TableCell>
                            <strong>DownPayment</strong>: {e.Rate}
                            </TableCell>
                        </TableRow>
                    </TableHead>
             
                    <TableHead>

                      <TableRow sx={{background: 'grey'}}>

                            <TableCell>

                            <strong>Commision</strong>: {0.05 * e.Rate}

                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableHead>

                    <TableRow >

                            <TableCell>
                            <strong>total</strong>: {e.Rate * e.Quantity + (0.25 * e.Rate * e.Quantity)}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableHead>

                    <TableRow sx={{background: 'grey'}}>

                        <TableCell sx={{textAlign: 'center'}}>
                        {/* */}
                        <form  action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">

                            <input type="hidden" id="amount" name="amount" value={total_amount} required />
                            
                            <input type="hidden" id="tax_amount" name="tax_amount" value ="0" required />
                            
                            <input type="hidden" id="total_amount" name="total_amount" value={eSewaParameters.total_amount} required />
                            
                            <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={uuid} required />
                            
                            <input type="hidden" id="product_code" name="product_code" value ="EPAYTEST" required />
                            
                            <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
                            
                            <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
                            
                            <input type="hidden" id="success_url" name="success_url" value="http://localhost:3000/tenantHome" required />
                            
                            <input type="hidden" id="failure_url" name="failure_url" value="http://localhost:3000/tenantHome" required />
                            
                            <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
                            
                            <input type="hidden" id="signature" name="signature" value={signature}  required />
                            

                            <Button value="Submit" type="submit" disabled={(signature.length > 0) ? false : true }  variant="contained" >Pay by esewa</Button>
                        </form>

                            

                        </TableCell>
                        </TableRow>
                    </TableHead>

                </Table>
               
     
                </Box>
    
    
    
            </Card>
            ))
        }
            </Grid>

        :

        <Box>sorry but currenlty none are available</Box>

        }


            
       </Grid>


  
  </>
  )
}

export default BusinessTalk