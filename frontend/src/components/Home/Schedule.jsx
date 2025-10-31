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
  CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Schedule = ({ darkMode }) => {
  const [scheduledData, setScheduledData] = useState({});
  const [latLng, setLatLng] = useState();
  const [isUpdatedPost, setIsUpdatedPost] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <Header />

      <div style={{ marginTop: "4.3rem", height: "80vh",  }}>
        <Box style={{textAlign: "center"}}>
        <Typography
          varient="h1"
          style={{ padding: "0 20px", fontSize: "1.3rem", fontWeight: "500" }}
        >
          My Schedules
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
                          : e.Status == "REJECTED"
                          ? "error"
                          : "success"
                      }
                      label={e.Status}
                    />
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
          ) : (
            <Box style={{textAlign: "center",  width: "100%"}}>sorry but currenlty none are available</Box>
          )}
        </Grid>
        </Box>
        
      </div>
    </>
  );
};

export default Schedule;
