import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataContext } from "../../../context/DataProvider";
import {
  NavigateNext,
  NavigateBefore,
  Delete,
  Edit,
} from "@mui/icons-material";

import PostEdit from "./PostEdit";
import { API } from "../../../services/Api";
import Loader from "../../../theme/Loader";

const PostCard = ({ post, darkMode, getHistoryPostfunc }) => {
  // console.log(post)
  const { setIsUpdatedPost } = useContext(DataContext);
  const [movement, setMovement] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edit, setEdit] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [obj, setObj] = useState({});

  const [selectedStatus, setSelectedStatus] = useState({
    selectedObject: {},
    status: "",
  });

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

  const handleDelete = async (e) => {
    // console.log(e)
    try {
      setIsLoading(true);
      let res = await API.deletePostsOfId({ _id: e._id });

      if (res.isSuccess) {
        console.log(res);
        setIsUpdatedPost((prev) => !prev);
      } else {
        console.log("delteio faild");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false)
  };

  let k;
  if (edit != 0) {
    console.log(edit);
    k = post.filter((e) => e._id == edit);
    console.log(k);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, e) => {
    setAnchorEl(event.currentTarget);
    setObj(e);
  };

  const handleClose = (x) => {
    setAnchorEl(null);

    setSelectedStatus({ selectedObject: obj, status: x });
  };

  useEffect(() => {
    const updateRentedPost = async () => {
      try {
        setIsLoading(true)
        const updatedObject = {
          ...selectedStatus.selectedObject,
          Status: selectedStatus.status,
        };
        console.log(updatedObject);
        const res = await API.updateRentedProduct({
          updatedObject,
        });

        console.log(res);
        console.log("sucessful update");
        getHistoryPostfunc();
      } catch (err) {
        console.log("Error: ", err);
      }
      setIsLoading(false)
    };

    if (selectedStatus.status != "") {
      updateRentedPost();
    }
  }, [selectedStatus]);

  return (
    <>
      { isLoading ? <Loader /> :  edit != 0 ? (
        <PostEdit
          edit={edit}
          setEdit={setEdit}
          darkMode={darkMode}
          post={post.filter((ele) => ele._id == edit)}
        />
      ):(

      <Grid container spacing={3}>
        {post.map((e, index) => (
    

          <Grid item md={6}>
            <Card
              key={index}
              sx={{
                position: "relative",
                backgroundColor: darkMode ? "#494F55" : " #F5F5F5",
                color: darkMode ? "white" : "black",
                height: "680px",
                // border: "1px solid black",
                boxShadow: "1px 3px 4px 0px",
                // width: "450px"
              }}
            >
              {!e?.name && (
                <Delete
                  onClick={() => handleDelete(e)}
                  sx={{
                    position: "absolute",
                    top: "5%",
                    right: "2%",
                    "&:hover": {
                      color: "red",
                      cursor: "pointer",
                      transition: "0.4s",
                    },
                    transition: "0.4s",
                    "&:active": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              )}

              {!e?.name && (
                <Edit
                  onClick={() => setEdit(e._id)}
                  sx={{
                    position: "absolute",
  top: "5%",
                    right: "10%",
                    "&:hover": {
                      color: "green",
                      cursor: "pointer",
                      transition: "0.4s",
                    },
                    transition: "0.4s",
                    "&:active": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              )}

              {e?.name ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    placeItems: "center",
                  
                  }}
                >
                  <CardHeader
                 
                    avatar={<Avatar src={e.profile[0]} alt={e.name} />}
                    sx={{
                      "& .MuiCardHeader-title": {
                        color: darkMode ? "white" : "black",
                      },
                      "& .MuiCardHeader-subheader": {
                        color: darkMode ? "white" : "black",
                      },
                      
                    }}

                      titleTypographyProps={{
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: darkMode ? "white" : "black",
  }}
  subheaderTypographyProps={{
    color: darkMode ? "#cfcfcf" : "#555",
  }}
                    title={`${e.name}`}
                    // subheader={e.Date}
                  />

                  <div key={index}>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(ele) => handleClick(ele, e)}
                    >
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
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleClose("PENDING")}>
                        PENDING
                      </MenuItem>
                      <MenuItem onClick={() => handleClose("UNAVAILABLE")}>
                        UNAVAILABLE
                      </MenuItem>
                      <MenuItem onClick={() => handleClose("AVAILABLE")}>
                        AVAILABLE
                      </MenuItem>
                    </Menu>
                  </div>
                </Box>
              ) : (
                <CardHeader
                  sx={{
                    "& .MuiCardHeader-title": {
                      color: darkMode ? "white" : "black",
                    },
                    "& .MuiCardHeader-subheader": {
                      color: darkMode ? "white" : "black",
                    },
                  }}
                  title={e.Category}
                  subheader={e.Date}
                />
              )}

            

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

              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <Typography variant="body1" sx={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
  }}>Rs. {e.Rate}</Typography>
                <Chip sx={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
  }} label={e.Category} />
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
                <Typography
                  style={{
                    fontSize: "0.82rem",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  {e.Location.split(",").slice(2).join(",").trim()}
                </Typography>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Chip sx={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
  }} label={`${e.Parking} Parking`} />
                  <Chip sx={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
  }} label={`Pets ${e.Pets}`} />
                  <Chip sx={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
  }} label={`Prefered ${e.People}`} />
                </div>
              </Box>

            </Card>
          </Grid>
        ))}
      </Grid>

)}
     
      
    </>
  );
};

export default PostCard;
