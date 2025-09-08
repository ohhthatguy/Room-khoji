import { useEffect, useState, useContext } from "react";
import Header from "../../Header/Header";
import {
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Avatar,
  
  Chip,
  Paper,
} from "@mui/material";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Calendar from "../../Calendar/Calendar";
import PlaceIcon from "@mui/icons-material/Place";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { API } from "../../../services/Api";
import { DataContext } from "../../../context/DataProvider";
import toast from "react-hot-toast";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BusinessTalk = ({ darkMode }) => {
  const { id } = useParams();
  const { currentPost, setCurrentPost } = useContext(DataContext); //post tobe rented is saved
  const [latLng, setLatLng] = useState();
  const [schedule, setSchedule] = useState(false)
  // console.log(id)

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

  const [movement, setMovement] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState();

  // eSewaParameters.amount >= 0 ? console.log(true) : console.log(false)

  const handleNext = (totalProductImages, index) => {
    console.log(index);
    setActiveIndex(index);
    if (movement == totalProductImages - 1) {
      //last img
      //  //donothing
    } else {
      setMovement((prev) => prev + 1);
    }
  };

  const handlePrev = (index) => {
    setActiveIndex(index);
    console.log(index);
    if (movement - 1 == -1) {
      //first img
      //do nothing
    } else if (movement != 0) {
      setMovement((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const getPostOfCategory = async () => {
      try {
        const res = await API.getPostsOfId({ postId: id });
        if (res.isSuccess) {
          // console.log(res.data)
          localStorage.setItem("currentPost", JSON.stringify(res.data));
          setCurrentPost(res.data);
        } else {
          console.log("is failure");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const registerClick = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("currentUser"));

        const res = await API.registerClickAPI({
          userId: userId._id, // from auth context or localStorage
          postId: id, // the ID of the post/room being clicked
        });
        if (res.isSuccess) {
          // console.log(res.data)
          toast.success("clicked registered!");
        } else {
          console.log("is failure");
          toast.success("clicked registered failure!");
        }
      } catch (err) {
        console.log(err);
        toast.success("somehitng wornfg");
      }
    };

    getPostOfCategory();
    registerClick();
  }, []);

  if (currentPost.length > 0) {
  }

  //signature and uuid
  useEffect(() => {
    // console.log('here')
    if (currentPost[0]?.Rate >= 0) {
      // console.log(eSewaParameters)
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

      const setLatLngFunc = () => {
        const coords = currentPost[0].Location.split(",")
          .slice(0, 2)
          .map(Number);
        setLatLng(coords);
      };

      getSignature();
      setLatLngFunc();
    }
  }, [currentPost]);

  console.log(currentPost);

  console.log(eSewaParameters);
  // console.log(signature)

  const checkForTable = ["Location", "Parking", "Quantity", "Rate", "Location"];

   const toggleModal = () => {
    setSchedule((prev) => !prev);
  };

 
  const handleDate = (date) => {
    console.log("Selected Dayjs:", date);
    console.log("Formatted:", date.format("YYYY-MM-DD"));
    setSelectedDate(date)
    localStorage.setItem("scheduledDate", date);
  };

  return (
    <>
      <Header />

      {/* <Box>
  
 </Box> */}

      <Box
        sx={{
          marginTop: "4rem",
          display: "flex",
          color: darkMode ? "white" : "black",
          justifyContent: "center",
          gap: "10px",
        }}
      ></Box>

      <Grid container justifyContent="center">
        {currentPost.length > 0 ? (
          <Grid
            item
            sx={{
              display: "flex",
              rowGap: "2rem",
              flexDirection: "column-reverse",
            }}
            lg={12}
            md={8}
            sm={8}
          >
            {currentPost.map((e, index) => (
              <Card
                key={index}
                sx={{
                  position: "relative",
                  color: darkMode ? "white" : "black",
                  backgroundColor: darkMode ? "#494F55" : " #F5F5F5",
                }}
              >
                {/* <CardHeader
                  sx={{
                    "& .MuiCardHeader-title": {
                      color: darkMode ? "white" : "black",
                    },
                    "& .MuiCardHeader-subheader": {
                      color: darkMode ? "white" : "black",
                    },
                  }}
                  avatar={
                    <Avatar src={e.Gharbeti_profile} alt={e.Gharbeti_name} />
                  }
                  title={e.Gharbeti_name}
                  subheader={e.Date}
                /> */}

                {/* <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    
                </Box> */}

                <Box sx={{ position: "relative" }}>
                  {/* width: '100%', display: 'flex', justifyContent: 'space-around', alignContent: 'center', top: '50%', position: 'absolute' */}
                  <Box
                    sx={{
                      width: "100%",
                      zIndex: "1",
                      position: "absolute",
                      top: "50%",
                    }}
                  >
                    <NavigateBefore
                      disabled={movement - 1 == -1 ? true : false}
                      fontSize="large"
                      sx={{
                        display: `${
                          e.productImages.length <= 1 ? "none" : "block"
                        }`,
                      }}
                      onClick={() => handlePrev(index)}
                    />

                    <NavigateNext
                      disabled={
                        movement == e.productImages.length - 1 ? true : false
                      }
                      fontSize="large"
                      sx={{
                        marginLeft: "95%",
                        marginTop: "-4%",
                        display: `${
                          e.productImages.length <= 1 ? "none" : "block"
                        }`,
                      }}
                      onClick={() => handleNext(e.productImages.length, index)}
                    />
                  </Box>

                  <Box
                    sx={{
                      height: "20rem",
                      display: "flex",
                      transform:
                        activeIndex === index
                          ? `  translateX(-${movement * 100}%)`
                          : `translateX(0px)`,
                      transition: "0.5s",
                    }}
                  >
                    {e.productImages.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          background: `url(${item}) no-repeat 50% 50% / cover`,
                          width: "100%",
                          height: "20rem",
                          flex: "0 0 100%",
                          height: "100%",
                        }}
                      ></Box>
                    ))}
                  </Box>
                </Box>

                <Box style={{ margin: "0 10%" }}>
                  {/* <CardContent>
                  <Typography variant="h5">{e.Description}</Typography>
                </CardContent>

                <Table sx={{ border: "1px solid black" }}>
                  <TableHead>
                    <TableRow sx={{ background: "grey" }}>
                      {Object.entries(currentPost[0]).map(
                        ([key, value], index) =>
                          checkForTable.includes(key) && (
                            <TableCell
                              key={index}
                              sx={{ color: darkMode ? "white" : "black" }}
                            >
                              <strong> {key} </strong>
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      {Object.entries(currentPost[0]).map(
                        ([key, value], index) =>
                          checkForTable.includes(key) && (
                            <TableCell
                              key={index}
                              sx={{ color: darkMode ? "white" : "black" }}
                            >
                              {value}
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  </TableBody>
                </Table> */}

                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >
                    <Box style={{ padding: "15px" }}>
                      <div style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                        {e.Description}
                      </div>
                      <Typography
                        style={{
                          fontSize: "0.82rem",
                          color: "GrayText",
                          paddingTop: "15px",
                          paddingBottom: "15px",
                        }}
                      >
                        <PlaceIcon fontSize="small" />
                        {e.Location.split(",").slice(2).join(",").trim()}
                      </Typography>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Chip color="secondary" label={e.Category} />

                        <Typography variant="h5">Rs. {e.Rate}</Typography>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          // gridAutoColumns: "2",
                          gap: "2rem",

                          margin: "20px 0",
                          overflowX: "auto",
                        }}
                      >
                        <Paper
                          style={{
                            width: "200px",
                            height: "150px",
                            padding: "20px",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "0.9rem",
                                color: "GrayText",
                              }}
                            >
                              Parking
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "1.3rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {e.Parking}
                            </div>
                          </div>
                        </Paper>

                        <Paper
                          style={{
                            width: "200px",
                            height: "150px",
                            padding: "20px",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "0.9rem",
                                color: "GrayText",
                              }}
                            >
                              Prefered
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "1.3rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {e.People}
                            </div>
                          </div>
                        </Paper>

                        <Paper
                          style={{
                            width: "200px",
                            height: "150px",
                            padding: "20px",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "0.9rem",
                                color: "GrayText",
                              }}
                            >
                              Pets
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "1.3rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {e.Pets}
                            </div>
                          </div>
                        </Paper>

                        <Paper
                          style={{
                            width: "200px",
                            height: "150px",
                            padding: "20px",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "0.9rem",
                                color: "GrayText",
                              }}
                            >
                              Water Available
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "1.3rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {e.Water}
                            </div>
                          </div>
                        </Paper>

                        <Paper
                          style={{
                            width: "200px",
                            height: "150px",
                            padding: "20px",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "0.9rem",
                                color: "GrayText",
                              }}
                            >
                              Available Unit
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                fontSize: "1.3rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {e.Quantity}
                            </div>
                          </div>
                        </Paper>
                      </div>
                    </Box>
                  </CardContent>

                  <Typography variant="h5" style={{ margin: "20px 0 10px 0" }}>
                    Gallery ({e.productImages.length})
                  </Typography>
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {e.productImages.map((ele) => (
                      <div>
                        <img
                          src={ele}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "3%",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <Typography variant="h5" style={{ margin: "20px 0 10px 0" }}>
                    Location
                  </Typography>

                  <div>
                    {" "}
                    {latLng && (
                      <MapContainer
                        center={latLng}
                        zoom={18}
                        style={{ height: "200px", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={latLng} />
                      </MapContainer>
                    )}
                  </div>

                  <Typography variant="h5" style={{ margin: "20px 0 10px 0" }}>
                    Contact
                  </Typography>

                  <Box>
                    <Table sx={{ margin: "1rem 0 2rem 0" }}>
                      <TableHead>
                        <Paper>
                          <TableRow style={{ display: "grid" }}>
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

                            <Typography style={{fontSize: "0.92rem", padding: "0 2rem"}}>To Schedule a meeting, You have to pay RS. 50 upfront. This is refundable fund once you reach the meeting. This measure is taken to reduce the fraud message </Typography>
                            <TableCell sx={{ textAlign: "right" }}>
                              {/* */}
                                <button className="btn btn-primary" onClick={toggleModal}>Schedule</button>

                              {/* <form
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
                              </form> */}
                            </TableCell>
                          </TableRow>
                        </Paper>
                      </TableHead>
                    </Table>
                  </Box>
                </Box>
              </Card>
            ))}
          </Grid>
        ) : (
          <Box>sorry but currenlty none are available</Box>
        )}
      </Grid>


        
              <Modal isOpen={schedule} toggle={toggleModal} centered scrollable>
                <ModalHeader toggle={toggleModal}>Schedule Meeting</ModalHeader>
                <ModalBody style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {/* <DateCalendar /> */}
                  <Calendar onDateChange={handleDate} />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
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
                </ModalFooter>
              </Modal>


    </>
  );
};

export default BusinessTalk;
