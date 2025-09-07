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
  Chip
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  Bookmark,
  BookmarkBorderOutlined,
  DarkMode,
   
} from "@mui/icons-material";

import { DataContext } from "../../../context/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../services/Api";

import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProductMarket = ({ darkMode }) => {
  const productRef = useRef(null);
  // const tl = gsap.timeline()

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
  const [selectedOption, setSelectedOption] = useState(Category);
  

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

  useEffect(() => {
    if (selectedOption.length > 0) {
      const getPostOfCategory = async () => {
        try {
          const user = localStorage.getItem("currentUser");
          const userID = JSON.parse(user);
          const res = await API.getPostByCategory({ Category: selectedOption, userID: userID });
          if (res.isSuccess) {
            // console.log(res.data)
            setCurrentPost(res.data);
          } else {
            console.log("is failure");
          }
        } catch (err) {
          console.log(err);
        }
      };

      getPostOfCategory();
      gsap.fromTo(
        productRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1 }
      );
    }
  }, [selectedOption]);

  


  //animaiton
  // useEffect(()=>{

  // },[])

  //save fav post's id to db
  useEffect(() => {
    const saveFavouritePost = async () => {
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

  const optionList = ["Flat", "Building", "Room", "Recommended"];
  //   console.log(selectedOption)
  //   console.log(favrouitPost)
  //   console.log(bookMarkClicked)

  useEffect(()=>{

    if(selectedOption == "Recommended"){
        navigate(`/tenant/recommended/${Category}`)
    }

  },[selectedOption])


  console.log(currentPost)


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


      <Grid container spacing={3} style={{padding: "0 20px"}}  >
        {currentPost.length > 0 ? (
         
            currentPost.map((e, index) => (
               <Grid
            ref={productRef}
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
                    height: "750px"
                }}
           

              >
                {bookMarkClicked.includes(e._id) ? (
                  <Bookmark
                    color="primary"
                    onClick={() => handleRemoveFavroit(e)}
                    sx={{
                      position: "absolute",
                      right: "2%",
                      top: "5%",
                      "&:hover": {
                        color: "blue",
                        cursor: "pointer",
                        transition: "0.4s",
                      },
                      transition: "0.4s",
                      "&:active": { transform: "scale(1.05)" },
                    }}
                  />
                ) : (
                  <BookmarkBorderOutlined
                    onClick={() => handleSetFavroit(e)}
                    sx={{
                      position: "absolute",
                      right: "2%",
                      top: "5%",
                      "&:hover": {
                        color: "blue",
                        cursor: "pointer",
                        transition: "0.4s",
                      },
                      transition: "0.4s",
                      "&:active": { transform: "scale(1.05)" },
                    }}
                  />
                )}

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
                  <Typography variant="h5">Rs. {e.Rate}</Typography>
                  <Chip label={e.Category} />
                </CardContent>

                <Box style={{padding: "15px"}}>
                  <div style={{fontSize: "1.2rem", fontWeight: "bold", height: "3rem", lineHeight: "1.3rem" , overflowY: "hidden"}}>{e.Description}</div>
                    <Typography style={{fontSize: "0.82rem", color: "GrayText",paddingTop: "15px", paddingBottom: "15px"}}>
                      {e.Location.split(",").slice(2).join(",").trim()}
                    </Typography>

                    <div style={{display: "flex", justifyContent: "space-between"}} >

                  <Chip label={`${e.Parking} Parking`} />
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
      </Grid>
    </>
  );
};

export default ProductMarket;
