import { useContext, useRef, useState } from "react";
import { Logout, DarkMode, LightMode } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import PostForm from "./landlord/PostForm";
import PostHistory from "./landlord/PostHistory";
import PostAvailable from "./landlord/PostAvailable";
import Footer from "../footer/Footer";

const LandLordHome = ({ darkMode }) => {
  const { setOpenPortal, setDarkMode } = useContext(DataContext);
  const account = JSON.parse(localStorage.getItem("currentUser"));

  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const opt3 = useRef(null);

  const [option, setOption] = useState("PostAvailable");

  const checkColor = (opt) => {
    console.log();
    // .style.backgroundColor = '#F5F5DC'

    const temp = [opt1.current, opt2.current, opt3.current];
    temp.map((e) => {
      if (e == opt.current) {
        darkMode
          ? (e.style.backgroundColor = " #000000")
          : (e.style.backgroundColor = "#F1E9D2");
      } else {
        e.style.backgroundColor = "";
      }
    });
  };

  const hellouserBg =
    "https://cdn.pixabay.com/photo/2018/09/24/08/52/mountains-3699372_1280.jpg";

  console.log(option);

  return (
    <>
      <Paper
        elevation={9}
        sx={{
          background: darkMode ? " #494F55" : "#91ae98",
          height: "5rem",
          fontSize: "3rem",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
         
        }}
      >
        {" "}
        <Typography variant="h3">
          Room-Finder
        </Typography>
       
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            right: "2%",
            width: "15%",
            justifyContent: "space-evenly",
            
          }}
        >
          <Box
            onClick={() => (!darkMode ? setDarkMode(true) : setDarkMode(false))}
            sx={{
              "&:hover": {
                cursor: "pointer",
                // transform: 'Scale(1.02)',
                transition: "0.3s",
              },
              "&:active": {
                cursor: "pointer",
                transform: "rotate(-90deg)",
              },
              transition: "0.3s",
            }}
          >
            {darkMode ? <DarkMode /> : <LightMode />}
          </Box>

          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
                // transform: 'Scale(1.02)',
                transition: "0.3s",
              },
              "&:active": {
                cursor: "pointer",
                transform: "Scale(1.04)",
              },
              transition: "0.3s",
            }}
          >
            <Logout onClick={() => setOpenPortal((prev) => !prev)} />
          </Box>
        </Box>
      </Paper>

      <Grid container sx={{}}>
        <Grid
          item
          sx={{
            background: `url(${hellouserBg}) no-repeat 75% 25% / cover`,
            height: "20rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={12}
        >
          <Card
            sx={{
              backgroundColor: darkMode ? " #494F55" : "#D5D0A4",
              color: darkMode ? "white" : "black",
              opacity: "0.95",
              width: "25.8%",
              
             border: "1px solid black", borderRadius: "8px",
                boxShadow: "0px 2px 2px 0px"
            }}
          >
            <Box
              sx={{
                margin: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
              }}
            >
              <Box
                sx={{
                  height: "7rem",
                  width: "7rem",
                  
                  backgroundImage: `url('${account.profile}')`,
                  backgroundPosition: "75% 25%",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              ></Box>
            </Box>

            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="body1" style={{border: "1px solid black", borderRadius: "8px",
                boxShadow: "0px 2px 2px 0px"}}> Welcome, <strong>{account.name}</strong></Typography>
              {/* <Typography> ID:{account._id}</Typography> */}
            </CardContent>
          </Card>
        </Grid>

        {/* <Typography>What are you looking for ?</Typography> */}

        <Grid container >
          {/* table */}
          <Grid
            sx={{
            
              background: darkMode ? "#494F55" : " #F5F5F5",
              height: "38vh"
            }}
            item
            lg={3}
            md={2}
            sm={1.6}
            xs={12}
          >
            <Table>
              <TableHead>
                <TableRow
                  ref={opt1}
                  
                  onClick={() => checkColor(opt1)}
                >
                  <TableCell
                    
                    sx={{
                      // color: darkMode ? "white" : "black",
                    cursor: "pointer",
                    fontSize: "50%",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "0.4s",
                      boxShadow: "0px 2px 2px 0px black",
                    },
                    "&:active": {
                      transform: "scale(1.06)",
                    },
                    transition: "0.4s",
                  }}
                    onClick={() => setOption((prev) => "PostHistory")}
                    
                  >
                    <Typography variant="body1">
                      <strong>Check Status</strong>
                    </Typography>
                  
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableHead>
                <TableRow
                  ref={opt2}
                 
                  onClick={() => checkColor(opt2)}
                >
                  <TableCell
                  
                     sx={{
                      // color: darkMode ? "white" : "black",
                    cursor: "pointer",
                    fontSize: "50%",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "0.4s",
                      boxShadow: "0px 2px 2px 0px black",
                    },
                    "&:active": {
                      transform: "scale(1.06)",
                    },
                    transition: "0.4s",
                  }}
                    onClick={() => setOption((prev) => "PostAvailable")}
                  >
                     <Typography variant="body1">
                      <strong>Your Rentals</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableHead>
                <TableRow
                  ref={opt3}
                  
                  onClick={() => checkColor(opt3)}
                >
                  <TableCell
                    
                     sx={{
                      // color: darkMode ? "white" : "black",
                    cursor: "pointer",
                    fontSize: "50%",
                    "&:hover": {
                      transform: "scale(1.03)",
                      transition: "0.4s",
                      boxShadow: "0px 2px 2px 0px black",
                    },
                    "&:active": {
                      transform: "scale(1.06)",
                    },
                    transition: "0.4s",
                  }}
                    onClick={() => setOption((prev) => "PostForm")}
                  >
                     <Typography variant="body1">
                      <strong>Add Rentals</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Grid>

          {/* posts */}
          <Grid item lg={8.9} md={9.7} sm={9.8} xs={12}>
            {option == "PostForm" ? (
              <PostForm darkMode={darkMode} />
            ) : option == "PostAvailable" ? (
              <PostAvailable darkMode={darkMode} />
            ) : option == "PostHistory" ? (
              <PostHistory darkMode={darkMode} />
            ) : (
              " so emptyyyy"
            )}
          </Grid>
        </Grid>
      </Grid>
<div style={{marginTop: "10px"}}>
       <Footer />

</div>
    </>
  );
};

export default LandLordHome;
