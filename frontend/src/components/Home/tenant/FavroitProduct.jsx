import { useContext, useEffect, useState } from "react";
import Header from "../../Header/Header";
import {
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Paper,
  styled,
  Chip,
  Grid,
  Avatar,
} from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";

import { DataContext } from "../../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../services/Api";
import Loader from "../../../theme/Loader";
const FavroitProduct = ({ darkMode }) => {
  // const {id} = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const [favPost, setFavPost] = useState([]);
  const [posts, setposts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [selectedOption, setSelectedOption] = useState(Category)

  const [movement, setMovement] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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

  //gets posts id
  useEffect(() => {
    const getFavPost = async () => {
      setIsLoading(true);
      try {
        const res = await API.getFavouritePost({ id: account._id });
        if (res.isSuccess) {
          // console.log(...res.data.initializeBookmark
          //     [0].Post_id)
          setposts([...res.data.initializeBookmark[0].Post_id]);
        } else {
          console.log("is failure");
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getFavPost();
  }, []);

  console.log(posts);

  //fetches data of post id
  useEffect(() => {
   
    const fetchPost = async () => {
       setIsLoading(true


       );
      try {
        const res = await API.getFavDataFromFavPostId({ id: posts });

        if (res.isSuccess) {
          console.log(res);
          setFavPost(res.data);
          console.log("succesully fetched fav post from fav id");
        } else {
          console.log("something happened");
        }
      } catch (err) {
        console.log(err);
      }
       setIsLoading(false);
    };
    fetchPost();
  }, [posts]);

  console.log(favPost);


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
          <Typography
                  varient="h1"
                  style={{ padding: "0 20px", fontSize: "1.3rem", fontWeight: "500" }}
                >
                    My Favourite
                </Typography>
     
      </Box>

      {/* <Grid container justifyContent="center">
        {favPost.length > 0 ? (


          <Grid
            item
            sx={{
              display: "flex",
              rowGap: "2rem",
              flexDirection: "column-reverse",
            }}
            lg={7}
            md={8}
            sm={8}
          >
            {favPost.map((e, index) => (
              <Card
                key={index}
                sx={{
                  position: "relative",
                  backgroundColor: darkMode ? "#494F55" : " #F5F5F5",
                  color: darkMode ? "white" : "black",
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
                          background: `url(${item}) no-repeat 50% 50% / contain`,
                          width: "100%",
                          height: "20rem",
                          flex: "0 0 100%",
                          height: "100%",
                        }}
                      ></Box>
                    ))}
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="h5">{e.Description}</Typography>
                </CardContent>

                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box
                    sx={{
                      marginLeft: "2rem",
                      display: "flex",
                      columnGap: "1.4rem",
                    }}
                  >
                    <Box sx={{}}>
                      <Typography>
                        <strong>Quantity</strong>
                      </Typography>
                      <Typography>
                        {" "}
                        <strong>Rate</strong>
                      </Typography>
                      <Typography>
                        {" "}
                        <strong>Location</strong>
                      </Typography>
                    </Box>

                    <Box>
                      <Typography>: {e.Quantity}</Typography>
                      <Typography>: {e.Rate}</Typography>
                      <Typography>: {e.Location}</Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "1.4rem",
                      "&::before": {
                        content: '""',
                        borderLeft: "1px solid black",
                        marginRight: "5rem",
                      },
                    }}
                  >
                    <Box>
                      <Typography>
                        <strong>Water</strong>
                      </Typography>
                      <Typography>
                        {" "}
                        <strong>Parking</strong>
                      </Typography>
                      <Typography>
                        {" "}
                        <strong>Prefered</strong>
                      </Typography>
                      <Typography>
                        {" "}
                        <strong>Pets</strong>
                      </Typography>
                    </Box>

                    <Box>
                      <Typography>: {e.Water}</Typography>
                      <Typography>: {e.Parking}</Typography>
                      <Typography>: {e.People}</Typography>
                      <Typography>: {e.Pets}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/tenant/BusinessTalk/${e._id}`)}
                  >
                    lets talk business
                  </Button>
                </Box>
              </Card>
            ))}
          </Grid>


        ) : (
          <Box>You have not selected any favroutes</Box>
        )}
      </Grid> */}
  {
    isLoading ? <Loader /> : 
  
      <Grid container spacing={3} style={{padding: "0 20px"}}  >
              {favPost.length > 0 ? (
               
                  favPost.map((e, index) => (
                     <Grid
                  
                  item
                 
                  lg={4}
                  md={8}
                  sm={8}
                >
                    <Card
                      key={index}
                 
      
                      sx={{
                        position: "relative",
                        backgroundColor: darkMode ? "#494F55" : " #F5F5F5",
                        color: darkMode ? "white" : "black",
                          height: "750px",
                          // border: "1px solid black",
                          boxShadow: "1px 3px 4px 0px"
                    
      
      
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
      
                      <CardContent style={{display: "flex", justifyContent: "space-between", padding: "15px"}}>
                        <Typography variant="body1">Rs. {e.Rate}</Typography>
                        <Chip label={e.Category} />
                      </CardContent>
      
                      <Box style={{padding: "15px"}}>
                        <Typography style={{fontSize: "1.2rem", fontWeight: "bold", height: "3rem", lineHeight: "1.3rem" , overflowY: "hidden"}} variant="caption">{e.Description}</Typography>
                          <Typography style={{fontSize: "0.82rem", paddingTop: "15px", paddingBottom: "15px"}}>
                            {e.Location.split(",").slice(2).join(",").trim()}
                          </Typography>
      
                          <div style={{display: "flex", justifyContent: "space-between"}} >
      
                        <Chip  label={`${e.Parking} Parking`} />
                        <Chip label={`Pets ${e.Pets}`} />
                        <Chip label={`Prefered ${e.People}`} />
      
      
      
                          </div>
      
                      </Box>
      
                      {/* <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    
                        <Box
                          sx={{
                            marginLeft: "2rem",
                            display: "flex",
                            columnGap: "1.4rem",
                          }}
                        >
                          <Box sx={{}}>
                            <Typography>
                              <strong>Quantity</strong>
                            </Typography>
                            <Typography>
                              {" "}
                              <strong>Rate</strong>
                            </Typography>
                           
                          </Box>
      
                          <Box>
                            <Typography>: {e.Quantity}</Typography>
                            <Typography>: {e.Rate}</Typography>
                          
                          </Box>
                        </Box>
      
                        <Box
                          sx={{
                            display: "flex",
                            columnGap: "1.4rem",
                            "&::before": {
                              content: '""',
                              borderLeft: "1px solid black",
                              marginRight: "5rem",
                            },
                          }}
                        >
                          <Box>
                            <Typography>
                              <strong>Water</strong>
                            </Typography>
                            <Typography>
                              {" "}
                              <strong>Parking</strong>
                            </Typography>
                            <Typography>
                              {" "}
                              <strong>Prefered</strong>
                            </Typography>
                            <Typography>
                              {" "}
                              <strong>Pets</strong>
                            </Typography>
                          </Box>
      
                          <Box>
                            <Typography>: {e.Water}</Typography>
                            <Typography>: {e.Parking}</Typography>
                            <Typography>: {e.People}</Typography>
                            <Typography>: {e.Pets}</Typography>
                          </Box>
                        </Box>
                      </Box> */}
      
                      <Box style={{ marginBottom: "1.2rem", padding: "15px" }}>
                        
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/tenant/BusinessTalk/${e._id}`)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Card>
      
                </Grid>
              
                  ))
                
              ) : (
                <Box>sorry but currenlty none are available</Box>
              )}
            </Grid> }
    </>
  );
};

export default FavroitProduct;
