import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { API } from "../../services/Api";
import {
  Box,
  Chip,
  Card,
  CardHeader,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


import "leaflet/dist/leaflet.css";

const Schedule = ({ darkMode }) => {
  const [scheduledData, setScheduledData] = useState({});
  const [latLng, setLatLng] = useState();
  const [isUpdatedPost, setIsUpdatedPost] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState('');

  useEffect(() => {
    const getHistoryPost = async () => {
      try {
        const tenantId = JSON.parse(localStorage.getItem("currentUser"));
        console.log(tenantId._id);
        const res = await API.getRentedProduct(tenantId);

        if (res.isSuccess) {
          console.log(res.data);
          setScheduledData(res.data);

          const coords = res.data.map((e) =>
            e.Location.split(",").slice(0, 2).map(Number)
          );
          console.log(coords);
          setLatLng(coords);
        } else {
          console.log("some wrng");
        }
      } catch (err) {
        console.log("error: ", err);
      }
    };

    getHistoryPost();
  }, [isUpdatedPost]);

  const deleteSchedule = async (e) => {
    setIsLoading(true);
    console.log(e);
    try {
      let res = await API.deleteScheduleOfId({ _id: e._id });

      if (res.isSuccess) {
        console.log(res);
        setIsUpdatedPost((prev) => !prev);
      } else {
        console.log("delteio faild");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const [signature, setSignature] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [uuid, setUuid] = useState("");
  // const [properAmount, setProperAmount] = useState(false)
  // const [selectedOption, setSelectedOption] = useState(Category)
  // const myUUID = uuidv4();
  // console.log(myUUID);

  const eSewaParameters = {
    total_amount: "50",
    // total_amount: `${(currentPost[0]?.Rate * currentPost[0]?.Quantity + (0.25 * currentPost[0]?.Rate * currentPost[0]?.Quantity))/1000}`
  };


        const getSignature = async () => {
          try {
            const res = await API.getSignature(eSewaParameters);
            if (res.isSuccess) {
              // console.log("success in getting singuatire", res.data.signature)S
              setSignature(res.data.signature);
              setUuid(res.data.transaction_uuid);
              setTotalAmount(res.data.total_amount);
            } else {
              console.log("fialed to get singature, ", res);
            }
          } catch (err) {
            console.log(err);
          }
        };
  
        const setLatLngFunc = (e) => {
          const coords = e.Location.split(",")
            .slice(0, 2)
            .map(Number);
          setLatLng(coords);
        };
  
       


    const handleContact = (e)=>{
     
      setSelectedRental(e);
      setOpenPayModal(true);
       getSignature();
        // setLatLngFunc(e);
      

    }
  
    console.log(selectedRental)

  return (
    <>
      <Header />

      <div style={{ marginTop: "4.3rem", height: "80vh",  }}>
        <Box style={{textAlign: "center"}}>
        <Typography
          varient="h1"
          style={{ padding: "0 20px", fontSize: "1.3rem", fontWeight: "500" }}
        >
          Property Status
        </Typography>
        </Box>


        <Box >
        <Grid container spacing={3} style={{ padding: "20px 20px"}}>
          {scheduledData?.length > 0 ? (
            scheduledData?.map((e, index) => (
              <Grid item lg={6} md={8} sm={8}>
                <Card
                  key={index}
                  sx={{
                    position: "relative",
                    backgroundColor: darkMode ? "#494F55" : " #F5F5F5",
                    color: darkMode ? "white" : "black",
                    height: "400px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      placeItems: "center",
                        
                    }}
                  >
                    <CardHeader
                      sx={{
                        "& .MuiCardHeader-title": {
                          color: darkMode ? "white" : "black",
                        },
                        "& .MuiCardHeader-subheader": {
                          color: darkMode ? "white" : "black",
                        },
                      }}
                      avatar={
                        <Avatar
                          src={e.Gharbeti_profile}
                          alt={e.Gharbeti_name}
                        />
                      }
                      title={e.Gharbeti_name}
                      subheader={e.Date}
                    />

                    <div  style={{
                      display: "flex",
                      // justifyContent: "space-between",
                      gap: "2rem",
                      justifyContent: "flex-end",
                      placeItems: "center",
                     
                      width: "20rem"
                      
                    }}>
                    <div
                      onClick={() => deleteSchedule(e)}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <DeleteIcon />
                      )}
                    </div>

                    <Chip
                      color={
                        e.Status == "PENDING"
                          ? "warning"
                          : e.Status == "UNAVAILABLE"
                          ? "error"
                          : "success"
                      }
                      label={e.Status}
                    />

                 
                   
                      {e.Status == "AVAILABLE" && <Button onClick={()=>handleContact(e)} variant="contained">Contact</Button>}

                    </div>
                  </div>

                  <Box style={{ padding: "15px" }}>




                    <Typography>Address: </Typography>
                    <Typography
                      style={{
                        fontSize: "0.82rem",
                        color: "GrayText",
                      }}
                    >
                      {e.Location.split(",").slice(2).join(",").trim()}
                    </Typography>
                  </Box>

                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        height: "20rem",
                        display: "flex",
                      }}
                    >
                      <div style={{ height: "250px", width: "100%" }}>
                        {" "}
                        {latLng && (
                          <MapContainer
                            center={latLng[index]}
                            zoom={15}
                            style={{ height: "250px", width: "100%" }}
                          >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={latLng[index]} />
                          </MapContainer>
                        )}
                      </div>

                     
                    </Box>
                  </Box>

                   
                </Card>
              </Grid>
            ))
          )
          
          : (
            <Box style={{textAlign: "center",  width: "100%"}}>sorry but currenlty none are available</Box>
          )}
        </Grid>
        </Box>
        
      </div>

      <Modal isOpen={openPayModal} toggle={()=>setOpenPayModal(prev=>!prev)} centered>
              <ModalHeader toggle={()=>setOpenPayModal(prev=>!prev)}>Contact</ModalHeader>
              <ModalBody >
                To unlock the contact of the landlord, you must pay Rs 50 upfront. <br/> <strong>This is not refundable amount.</strong>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={()=>setOpenPayModal(false)}>
                  Cancel
                </Button>
      
                  <Button color="primary">
                    <form
                                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                                method="POST"
                              >
                                <input
                                  type="hidden"
                                  id="amount"
                                  name="amount"
                                  value={total_amount}
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="tax_amount"
                                  name="tax_amount"
                                  value="0"
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="total_amount"
                                  name="total_amount"
                                  value={eSewaParameters.total_amount}
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="transaction_uuid"
                                  name="transaction_uuid"
                                  value={uuid}
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="product_code"
                                  name="product_code"
                                  value="EPAYTEST"
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="product_service_charge"
                                  name="product_service_charge"
                                  value="0"
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="product_delivery_charge"
                                  name="product_delivery_charge"
                                  value="0"
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="success_url"
                                  name="success_url"
                                  value={`${process.env.REACT_APP_LINK_TO_FRONTEND}/tenantHome`}
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="failure_url"
                                  name="failure_url"
                                  value={`${process.env.REACT_APP_LINK_TO_FRONTEND}/tenantHome`}
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="signed_field_names"
                                  name="signed_field_names"
                                  value="total_amount,transaction_uuid,product_code"
                                  required
                                />

                                <input
                                  type="hidden"
                                  id="signature"
                                  name="signature"
                                  value={signature}
                                  required
                                />

                                  
                                <Button
                                  value="Submit"
                                  type="submit"
                                  disabled={signature.length > 0 ? false : true}
                                  variant="contained"
                                >
                                  Pay by esewa
                                </Button>
                              </form>
                </Button>
                
              </ModalFooter>
            </Modal>
    </>
  );
};

export default Schedule;
