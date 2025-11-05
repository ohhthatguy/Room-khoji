import { useContext, useEffect, useState, useRef } from "react";
import Header from "../../Header/Header";
import {
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Paper,
  Table,
  TableRow,
  TableHead,
  Grid,
  Avatar,
  TableCell,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  TextField,
  styled,
  Radio,
  TextareaAutosize,
  Chip,
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  Bookmark,
  BookmarkBorderOutlined,
  DarkMode,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MapSelector from "../../Location-Selector/LocationSelector";
import { DataContext } from "../../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../services/Api";
import Loader from "../../../theme/Loader";

import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Recommened = ({ darkMode }) => {
  const productRef = useRef(null);

  const initialProductData = {
    Location: "",
    People: "",
    Pets: "",

    Parking: "",
    Quantity: "1",
    Rate: "1000",
    Water: "",
  };

  const [productData, setProductData] = useState(initialProductData);
  // const tl = gsap.timeline()
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useContext(DataContext);
  const { Category } = useParams();
  const navigate = useNavigate();

  const [currentPost, setCurrentPost] = useState([]);
  const [bookMarkClicked, setBookmarkClicked] = useState([]);
  // const [currIndex, setCurrIndex] = useState('')
  const [favrouitPost, setFavouritePost] = useState({
    add: "",
    delete: "",
  });
  const [selectedOption, setSelectedOption] = useState("");

  const [movement, setMovement] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [getUserPref, setGetUserPref] = useState(false);
  const [location, setLocation] = useState(null);

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

  const getPostOfRecomended = async (userPrefData = "") => {
    try {
      let res;
      if (userPrefData == "") {
        res = await API.getRecommendedList({ Category });
      } else {
        console.log(userPrefData);
        setIsLoading(true);
        res = await API.getRecommendedList({
          Category: Category,
          userPrefData,
        });
      }
      if (res.isSuccess) {
        // console.log(res.data)
        setCurrentPost(res.data);
      } else {
        console.log("is failure");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);

    setGetUserPref((prev) => !prev);
  };

  useEffect(() => {
    const getPostOfCategory = async () => {
      try {
        const res = await API.getPostByCategory({ Category });
        if (res.isSuccess) {
          // console.log(res.data)
          setCurrentPost(res.data);
          console.log(res.data);
        } else {
          console.log("is failure");
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedOption.length > 0 && selectedOption !== "Filter") {
      getPostOfCategory();
      gsap.fromTo(
        productRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1 }
      );
    }

    if (selectedOption.length > 0 && selectedOption == "Filter") {
      getPostOfRecomended();
      gsap.fromTo(
        productRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1 }
      );
    }
  }, [selectedOption]);

  console.log(selectedOption);

  //save fav post's id to db
  useEffect(() => {
    const saveFavouritePost = async () => {
      // setIsLoading(true);

      try {
        let res;

        if (favrouitPost.add.length > 0) {
          res = await API.saveFavouritePost({
            Tenant_id: account._id,
            Post_id: favrouitPost.add,
          });
        } else if (favrouitPost.delete.length > 0) {
          res = await API.saveFavouritePost({
            Tenant_id: account._id,
            Post_id: favrouitPost.delete,
          });
        } else {
          res = await API.getFavouritePost({ id: account._id });
        }

        // console.log('im here')

        if (res.isSuccess) {
          // console.log(res.data.msg?.length )
          // console.log(res.data?.initializeBookmark[0] )

          if (res.data.msg?.length > 0) {
            res.data.msg.map(
              (e) =>
                !bookMarkClicked.includes(e) &&
                setBookmarkClicked([...bookMarkClicked, e])
            );
          }

          if (res.data.initializeBookmark[0]) {
            //first remder
            console.log("inside");
            if (bookMarkClicked.length == 0) {
              setBookmarkClicked([...res.data.initializeBookmark[0].Post_id]);
            } else {
              res.data.initializeBookmark[0].Post_id.map(
                (e) =>
                  !bookMarkClicked.includes(e) &&
                  setBookmarkClicked([...bookMarkClicked, e])
              );
            }
          }

          console.log("successfully updated");
          // setCurrentPost(res.data)
        } else {
          console.log("is failure");
        }
      } catch (err) {
        console.log(err);
      }
      // setIsLoading(true);
    };

    saveFavouritePost();
    // console.log("here")
  }, [favrouitPost]);

  const handleSetFavroit = (e) => {
    setBookmarkClicked((prev) => {
      if (prev.includes(e._id)) {
        return prev.filter((itemId) => itemId !== e._id); // Remove from array if already bookmarked
      } else {
        return [...prev, e._id]; // Add to array if not bookmarked
      }
    });
    setFavouritePost({ add: e._id, delete: "" });
  };

  const handleRemoveFavroit = (e) => {
    setBookmarkClicked((prev) => {
      if (prev.includes(e._id)) {
        return prev.filter((itemId) => itemId !== e._id); // Remove from array if already bookmarked
      } else {
        return [...prev, e._id]; // Add to array if not bookmarked
      }
    });
    setFavouritePost({ add: "", delete: e._id });
  };

  const optionList = ["Flat", "Building", "Room", "Filter"];
  //   console.log(selectedOption)
  //   console.log(favrouitPost)
  //   console.log(bookMarkClicked)

  useEffect(() => {
    if (selectedOption !== "" && selectedOption !== "Filter") {
      navigate(`/tenant/productmarket/${Category}`);
    }
  }, [selectedOption]);

  console.log(selectedOption);
  console.log(Category);

  //getUserPref == false, get the user Pref through modal
  //getUserPref == true, show recomended list

  const toggleModal = () => {
    setGetUserPref((prev) => !prev);
  };

  const handleInput = (e) => {
    if (e.target.type !== undefined) {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleModalData = () => {
    if (!location) {
      toast.error("Location not found");

      return;
    }

    const allAreFilled = Object.values(productData).some(
      (value) => String(value).trim() === ""
    );

    if (allAreFilled) {
      toast.error("Please fill all the data");
    } else {
      console.log("here");
      getPostOfRecomended(productData);
    }
  };

  const handleLocation = (latlng) => {
    setProductData({
      ...productData,
      Location: `${latlng.lat},${latlng.lng},${latlng.address}`,
    });
  };

  console.log(currentPost);

  return (
    <>
      <Header />

      <Box
        sx={{
          marginTop: "4rem",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "1.22rem",
          paddingTop: "1.5rem",
        }}
      >
        {optionList.map((e) =>
          selectedOption === e ? (
            <Button
              sx={{
                backgroundColor: darkMode ? "black" : "white",
                color: darkMode ? "white" : "black",
                "&:hover": {
                  backgroundColor: darkMode ? "white" : "black",
                  color: darkMode ? "black" : "white",
                },
              }}
              variant={!darkMode && "contained"}
            >
              {e}
            </Button>
          ) : (
            <Button
              sx={{
                backgroundColor: darkMode ? "white" : "black",
                color: darkMode ? "black" : "white",
                "&:hover": {
                  backgroundColor: darkMode ? "black" : "white",
                  color: darkMode ? "white" : "black",
                },
              }}
              onClick={() => setSelectedOption(e)}
              variant={!darkMode && "outlined"}
            >
              {e}
            </Button>
          )
        )}
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        // <Grid container spacing={3}>
        //   {currentPost?.finalByRate.length > 0 && getUserPref ? (
        //     <Grid
        //       ref={productRef}
        //       item

        //       md={6}

        //     >
        //       {currentPost?.finalByRate?.map((e, index) => (
        //         <Card
        //           key={index}
        //           sx={{
        //             position: "relative",
        //             backgroundColor: darkMode ? "#494F55" : " #F5F5F5",
        //             color: darkMode ? "white" : "black",
        //           }}
        //         >
        //           {bookMarkClicked.includes(e._id) ? (
        //             <Bookmark
        //               color="primary"
        //               onClick={() => handleRemoveFavroit(e)}
        //               sx={{
        //                 position: "absolute",
        //                 right: "2%",
        //                 top: "5%",
        //                 "&:hover": {
        //                   color: "blue",
        //                   cursor: "pointer",
        //                   transition: "0.4s",
        //                 },
        //                 transition: "0.4s",
        //                 "&:active": { transform: "scale(1.05)" },
        //               }}
        //             />
        //           ) : (
        //             <BookmarkBorderOutlined
        //               onClick={() => handleSetFavroit(e)}
        //               sx={{
        //                 position: "absolute",
        //                 right: "2%",
        //                 top: "5%",
        //                 "&:hover": {
        //                   color: "blue",
        //                   cursor: "pointer",
        //                   transition: "0.4s",
        //                 },
        //                 transition: "0.4s",
        //                 "&:active": { transform: "scale(1.05)" },
        //               }}
        //             />
        //           )}

        //           <CardHeader
        //             sx={{
        //               "& .MuiCardHeader-title": {
        //                 color: darkMode ? "white" : "black",
        //               },
        //               "& .MuiCardHeader-subheader": {
        //                 color: darkMode ? "white" : "black",
        //               },
        //             }}
        //             avatar={
        //               <Avatar src={e.Gharbeti_profile} alt={e.Gharbeti_name} />
        //             }
        //             title={e.Gharbeti_name}
        //             subheader={e.Date}
        //           />

        //           <Box sx={{ position: "relative" }}>
        //             <Box
        //               sx={{
        //                 width: "100%",
        //                 zIndex: "1",
        //                 position: "absolute",
        //                 top: "50%",
        //               }}
        //             >
        //               <NavigateBefore
        //                 disabled={movement - 1 == -1 ? true : false}
        //                 fontSize="large"
        //                 sx={{
        //                   marginRight: "0%",
        //                   display: `${
        //                     e?.productImages?.length <= 1 ? "none" : "block"
        //                   }`,
        //                 }}
        //                 onClick={() => handlePrev(index)}
        //               />

        //               <NavigateNext
        //                 disabled={
        //                   movement == e.productImages.length - 1 ? true : false
        //                 }
        //                 fontSize="large"
        //                 sx={{
        //                   marginLeft: "90%",
        //                   display: `${
        //                     e.productImages.length <= 1 ? "none" : "block"
        //                   }`,
        //                 }}
        //                 onClick={() =>
        //                   handleNext(e.productImages.length, index)
        //                 }
        //               />
        //             </Box>

        //             <Box
        //               sx={{
        //                 height: "20rem",
        //                 display: "flex",
        //                 transform:
        //                   activeIndex === index
        //                     ? `  translateX(-${movement * 100}%)`
        //                     : `translateX(0px)`,
        //                 transition: "0.5s",
        //               }}
        //             >
        //               {e.productImages.map((item, index) => (
        //                 <Box
        //                   key={index}
        //                   sx={{
        //                     background: `url(${item}) no-repeat 50% 50% / contain`,
        //                     width: "100%",
        //                     height: "20rem",
        //                     flex: "0 0 100%",
        //                     height: "100%",
        //                   }}
        //                 ></Box>
        //               ))}
        //             </Box>
        //           </Box>

        //           <CardContent>
                    // <Typography variant="body1">
                    //   {" "}
                    //   <span
                    //     style={{
                    //       background: "#91ae98",
                    //       borderRadius: "6px",
                    //       padding: "3px",
                    //       color: "white",
                    //     }}
                    //   >
                    //     <strong>{Math.floor(e.score * 100)}%</strong> match
                    //   </span>
                    // </Typography>

        //             <Typography variant="h5">{e.Description}</Typography>
        //           </CardContent>

        //           <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        //             {/* <Typography variant="h5">About {selectedOption}</Typography> */}
        //             <Box
        //               sx={{
        //                 marginLeft: "2rem",
        //                 display: "flex",
        //                 columnGap: "1.4rem",
        //               }}
        //             >
        //               <Box sx={{}}>
        //                 <Typography>
        //                   <strong>Quantity</strong>
        //                 </Typography>
        //                 <Typography>
        //                   {" "}
        //                   <strong>Rate</strong>
        //                 </Typography>
        //                 {/* <Typography> <strong>Location</strong></Typography> */}
        //               </Box>

        //               <Box>
        //                 <Typography>: {e.Quantity}</Typography>
        //                 <Typography>: {e.Rate}</Typography>
        //                 {/* <Typography>: {e.Location}</Typography> */}
        //               </Box>
        //             </Box>

        //             {/* <Typography variant="h5">Additional Info</Typography> */}
        //             <Box
        //               sx={{
        //                 display: "flex",
        //                 columnGap: "1.4rem",
        //                 "&::before": {
        //                   content: '""',
        //                   borderLeft: "1px solid black",
        //                   marginRight: "5rem",
        //                 },
        //               }}
        //             >
        //               <Box>
        //                 <Typography>
        //                   <strong>Water</strong>
        //                 </Typography>
        //                 <Typography>
        //                   {" "}
        //                   <strong>Parking</strong>
        //                 </Typography>
        //                 <Typography>
        //                   {" "}
        //                   <strong>Prefered</strong>
        //                 </Typography>
        //                 <Typography>
        //                   {" "}
        //                   <strong>Pets</strong>
        //                 </Typography>
        //               </Box>

        //               <Box>
        //                 <Typography>: {e.Water}</Typography>
        //                 <Typography>: {e.Parking}</Typography>
        //                 <Typography>: {e.People}</Typography>
        //                 <Typography>: {e.Pets}</Typography>
        //               </Box>
        //             </Box>
        //           </Box>

        //           <Box style={{ marginBottom: "1.2rem" }}>
        //             <div style={{ marginBottom: "2rem" }}>
        //               <Typography>
        //                 {" "}
        //                 <strong>Location: </strong>
        //               </Typography>
        //               <Typography>
        //                 {e.Location.split(",").slice(2).join(",").trim()}
        //               </Typography>
        //             </div>
        // <Button
        //   variant="contained"
        //   onClick={() => navigate(`/tenant/BusinessTalk/${e._id}`)}
        // >
        //   lets talk business
        // </Button>
        //           </Box>
        //         </Card>
        //       ))}
        //     </Grid>
        //   ) : (
        //     <Box>sorry but currenlty none are available</Box>
        //   )}
        // </Grid>

        <Box>
          {currentPost?.finalByRate?.length > 0 && getUserPref ? (
            <>

            {/* by price */}

            <div>
               <div><Typography variant="body1">
                      {" "}
                      <span
                        style={{
                          background: "#91ae98",
                          borderRadius: "6px",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        <strong>Filter By Price</strong> 
                      </span>
                    </Typography></div>
            <Box 
             sx={{
            display: "flex", // horizontal layout
            overflowX: "auto", // enable horizontal scroll
            gap: 3, // spacing between cards
            padding: 2,
            scrollBehavior: "smooth", // smooth scroll
            "&::-webkit-scrollbar": {
              // hide scrollbar (optional)
              // display: "none",
            },
            // msOverflowStyle: "none",
            scrollbarWidth: "5px",
          }}>
           
              {currentPost.finalByRate?.map((e, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "450px", // width of each card
                    flexShrink: 0, // prevent shrinking
                    backgroundColor: darkMode ? "#494F55" : "#F5F5F5",
                    color: darkMode ? "white" : "black",
                    height: "680px",
                    boxShadow: "1px 3px 4px 0px",
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
                      <Avatar src={e.Gharbeti_profile} alt={e.Gharbeti_name} />
                    }
                    title={e.Gharbeti_name}
                    subheader={e.Date}
                  />

                  <Box sx={{ position: "relative" }}>
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
                          marginRight: "0%",
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
                          marginLeft: "90%",
                          display: `${
                            e.productImages.length <= 1 ? "none" : "block"
                          }`,
                        }}
                        onClick={() =>
                          handleNext(e.productImages.length, index)
                        }
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

                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Rs. {e.Rate}
                    </Typography>
                    <Chip
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                      label={e.Category}
                    />
                  </CardContent>

                  <Box style={{ padding: "15px" }}>
                    <Typography
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        height: "3rem",
                        lineHeight: "1.3rem",
                        overflowY: "hidden",
                      }}
                      variant="caption"
                    >
                      {e.Description}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`${e.Parking} Parking`}
                      />
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`Pets ${e.Pets}`}
                      />
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`Prefered ${e.People}`}
                      />
                    </div>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/tenant/BusinessTalk/${e._id}`)}
                  >
                    lets talk business
                  </Button>
                </Card>
              ))}
            </Box>

            </div>

            {/* by distance  */}

              <div style={{marginTop: "20px", marginBottom: "20px"}}>
            {
              currentPost?.finalByDistance?.length > 0 ?
               (<div>
               <div> <Typography variant="body1">
                      {" "}
                      <span
                        style={{
                          background: "#91ae98",
                          borderRadius: "6px",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        <strong>Filter By Distance</strong> 
                      </span>
                    </Typography></div>
            <Box 
             sx={{
            display: "flex", // horizontal layout
            overflowX: "auto", // enable horizontal scroll
            gap: 3, // spacing between cards
            padding: 2,
            scrollBehavior: "smooth", // smooth scroll
            "&::-webkit-scrollbar": {
              // hide scrollbar (optional)
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}>
           
              {currentPost.finalByDistance.map((e, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "450px", // width of each card
                    flexShrink: 0, // prevent shrinking
                    backgroundColor: darkMode ? "#494F55" : "#F5F5F5",
                    color: darkMode ? "white" : "black",
                    height: "680px",
                    boxShadow: "1px 3px 4px 0px",
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
                      <Avatar src={e.room.Gharbeti_profile} alt={e.room.Gharbeti_name} />
                    }
                    title={e.room.Gharbeti_name}
                    subheader={e.room.Date}
                  />

                  <Box sx={{ position: "relative" }}>
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
                          marginRight: "0%",
                          display: `${
                            e.room.productImages.length <= 1 ? "none" : "block"
                          }`,
                        }}
                        onClick={() => handlePrev(index)}
                      />

                      <NavigateNext
                        disabled={
                          movement == e.room.productImages.length - 1 ? true : false
                        }
                        fontSize="large"
                        sx={{
                          marginLeft: "90%",
                          display: `${
                            e.room.productImages.length <= 1 ? "none" : "block"
                          }`,
                        }}
                        onClick={() =>
                          handleNext(e.room.productImages.length, index)
                        }
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
                      {e.room.productImages.map((item, index) => (
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

                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >

                    
                    
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Rs. {e.room.Rate}
                    </Typography>
                    <Chip
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                      label={e.room.Category}
                    />
                  </CardContent>

                  <Box style={{ padding: "15px" }}>
                     <Typography variant="body1">
                      {" "}
                      <span
                        style={{
                          background: "#91ae98",
                          borderRadius: "6px",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        <strong>{e.distance > 0 && e.distance <1 ? "Less than 1" :Math.floor((e.distance))}Km</strong> Far
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        height: "3rem",
                        lineHeight: "1.3rem",
                        overflowY: "hidden",
                      }}
                      variant="caption"
                    >
                      {e.room.Description}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`${e.room.Parking} Parking`}
                      />
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`Pets ${e.room.Pets}`}
                      />
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`Prefered ${e.room.People}`}
                      />
                    </div>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/tenant/BusinessTalk/${e.room._id}`)}
                  >
                    lets talk business
                  </Button>
                </Card>
              ))}
            </Box>

            </div>) : 
             <Box> rental matchiing the Distance</Box>
            }
            </div>

            {/* by final score */}

            <div>
            {
              currentPost?.finalByScore?.length > 0 ?
               (<div>
           <Typography variant="body1">
                      {" "}
                      <span
                        style={{
                          background: "#91ae98",
                          borderRadius: "6px",
                          padding: "3px",
                          color: "white",
                         
                        }}
                      >
                        <strong>Final Recommendation</strong> 
                      </span>
                    </Typography>
            <Box 
             sx={{
            display: "flex", // horizontal layout
            overflowX: "auto", // enable horizontal scroll
            gap: 3, // spacing between cards
            padding: 2,
            scrollBehavior: "smooth", // smooth scroll
            "&::-webkit-scrollbar": {
              // hide scrollbar (optional)
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}>
           
              {currentPost.finalByScore.map((e, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "450px", // width of each card
                    flexShrink: 0, // prevent shrinking
                    backgroundColor: darkMode ? "#494F55" : "#F5F5F5",
                    color: darkMode ? "white" : "black",
                    height: "680px",
                    boxShadow: "1px 3px 4px 0px",
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
                      <Avatar src={e.Gharbeti_profile} alt={e.Gharbeti_name} />
                    }
                    title={e.Gharbeti_name}
                    subheader={e.Date}
                  />

                  <Box sx={{ position: "relative" }}>
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
                          marginRight: "0%",
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
                          marginLeft: "90%",
                          display: `${
                            e.productImages.length <= 1 ? "none" : "block"
                          }`,
                        }}
                        onClick={() =>
                          handleNext(e.productImages.length, index)
                        }
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

                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "15px",
                    }}
                  >

                    
                    
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Rs. {e.Rate}
                    </Typography>
                    <Chip
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                      label={e.Category}
                    />
                  </CardContent>

                  <Box style={{ padding: "15px" }}>
                     <Typography variant="body1">
                      {" "}
                      <span
                        style={{
                          background: "#91ae98",
                          borderRadius: "6px",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        <strong>{Math.floor(e.score * 100)}%</strong> Matched
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        height: "3rem",
                        lineHeight: "1.3rem",
                        overflowY: "hidden",
                      }}
                      variant="caption"
                    >
                      {e.Description}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`${e.Parking} Parking`}
                      />
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`Pets ${e.Pets}`}
                      />
                      <Chip
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                        }}
                        label={`Prefered ${e.People}`}
                      />
                    </div>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/tenant/BusinessTalk/${e._id}`)}
                  >
                    lets talk business
                  </Button>
                </Card>
              ))}
            </Box>

            </div>) : 
             <Box> No rental to recommend</Box>
            }
            </div>
          



            </>
          ) : (
            <Box>No rental matchiing the rate</Box>
          )}
        </Box>
      )}

      <Modal
        isOpen={!getUserPref}
        toggle={toggleModal}
        centered
        size="lg"
        scrollable
      >
        <ModalHeader toggle={toggleModal}>User Prefernces</ModalHeader>
        <ModalBody style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <Paper
            elevation={3}
            sx={{
              border: "2px solid #587351",
              background: darkMode ? "#494F55" : "#F5F5F5",
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              rowGap: "2rem",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
            >
              <TextField
                label="Quantity"
                inputProps={{ min: 1, max: 10 }}
                defaultValue={1}
                error={productData.Quantity < 1 || productData.Quantity > 10}
                helperText={
                  productData.Quantity < 0
                    ? "Quantity must be at least 1"
                    : productData.Quantity > 10
                    ? "Quantity must be at most 10"
                    : ""
                }
                type="number"
                name="Quantity"
                onChange={(e) => handleInput(e)}
                variant="standard"
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: darkMode ? "white" : "black",
                  },
                  "& .MuiInputBase-input": {
                    color: darkMode ? "white" : "black",
                  },
                  "& .MuiFormHelperText-root": {
                    color: darkMode ? "white" : "black",
                  },
                }}
              />

              <TextField
                label="Rate (/month)"
                defaultValue={1000}
                error={productData.Rate < 1000 || productData.Rate > 100000}
                helperText={
                  productData.Rate < 1000
                    ? "Rate must be at least 1000"
                    : productData.Rate > 100000
                    ? "Rate must be at most 100000"
                    : ""
                }
                inputProps={{ min: 1000, max: 100000 }}
                type="number"
                name="Rate"
                onChange={(e) => handleInput(e)}
                variant="standard"
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: darkMode ? "white" : "black",
                  },
                  "& .MuiInputBase-input": {
                    color: darkMode ? "white" : "black",
                  },
                  "& .MuiFormHelperText-root": {
                    color: darkMode ? "white" : "black",
                  },
                }}
              />
            </Box>

            <Box sx={{ color: darkMode ? "white" : "black" }}>
              <FormLabel sx={{ color: darkMode ? "white" : "black" }}>
                Water facility
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="24hrs"
                  name="Water"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="24hrs"
                />
                <FormControlLabel
                  value="once /day"
                  name="Water"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="once /day"
                />
                <FormControlLabel
                  value="Twice /day"
                  name="Water"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="Twice /day"
                />
              </RadioGroup>
            </Box>

            <Box sx={{ color: darkMode ? "white" : "black" }}>
              <FormLabel sx={{ color: darkMode ? "white" : "black" }}>
                Paking facility
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="spacious"
                  name="Parking"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="spacious"
                />
                <FormControlLabel
                  value="narrow"
                  name="Parking"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="narrow"
                />
              </RadioGroup>
            </Box>

            <Box sx={{ color: darkMode ? "white" : "black" }}>
              <FormLabel sx={{ color: darkMode ? "white" : "black" }}>
                Looking for{" "}
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="Couple"
                  name="People"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="Couple"
                />
                <FormControlLabel
                  value="Student"
                  name="People"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="Student"
                />
                <FormControlLabel
                  value="Family"
                  name="People"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="Family"
                />
              </RadioGroup>
            </Box>

            <Box sx={{ color: darkMode ? "white" : "black" }}>
              <FormLabel sx={{ color: darkMode ? "white" : "black" }}>
                Pets{" "}
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="Allowed"
                  name="Pets"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="Allowed"
                />
                <FormControlLabel
                  value="Not Allowed"
                  name="Pets"
                  onClick={(e) => handleInput(e)}
                  control={
                    <Radio sx={{ color: darkMode ? "white" : "black" }} />
                  }
                  label="Not Allowed"
                />
              </RadioGroup>
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "3rem" }}
            >
              <div>
                <MapSelector
                  onAddressChange={(latlng) => handleLocation(latlng)}
                  location={location}
                  setLocation={setLocation}
                />
              </div>
            </Box>
          </Paper>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleModalData}>
            Search
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Recommened;
