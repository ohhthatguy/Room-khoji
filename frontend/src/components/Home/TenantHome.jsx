import { useEffect, useState, useRef } from "react";
import Header from "../Header/Header";
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
  Rating,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../../services/Api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../footer/Footer";
import toast from "react-hot-toast";
import Loader from "../../theme/Loader";

const TenantHome = ({ darkMode }) => {
  const reviewCard = useRef([]);
  const startCard = useRef([]);

  // const {account} = useContext(DataContext)
  const [rentedAdded, setRentedAdded] = useState(false);
  const account = JSON.parse(localStorage.getItem("currentUser"));
  const [verifyData, setVerifyData] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //useLocation for query params

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");
  console.log(account);

  if (data && verifyData.length == 0) {
    const verifyPayment = async () => {
      try {
        let res = await API.verifyPayment({ data });
        // console.log(res)
        if (res.isSuccess) {
          // console.log(res)
          setVerifyData(res);
        } else {
          console.log("something wrong happened");
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log("calling verifyPayment()");
    verifyPayment();
  }

  console.log(verifyData);
  const savedPost = localStorage.getItem("currentPost");
  console.log("after esewa: savedpost: ", savedPost)

  if (verifyData.data?.status === "COMPLETE" && savedPost) {
    // save this data to db rented

    let data = JSON.parse(savedPost);
    // let rentedData = {...data[0], ...account}

    let { _id, ...restAccount } = account; // extract _id from account
    let rentedData = {
      ...data[0],
      ...restAccount, // all other fields from account
      tenantID: _id, // rename _id to tenantID
    };

    

    const sendMailAfterPay = async () => {
      try {
        let res = await API.sendMailAfterPayment(rentedData);
        // console.log(res)
        if (res.isSuccess) {
            toast.success("Contact is sent to Mail.")
        } else {
          console.log("something wrong happened");
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    };

      sendMailAfterPay()

 
// const date = localStorage.getItem("scheduledDate");
    // rentedData.Date = date;
    // const saveRentedProduct = async () => {
    //   //data is being saved in db but here it is showing error. solve this
    //   //then make a mechanism such that after saving the renteddata it deltes the data of given post id form post db colection
    //   //use the prev made postdeleteById (see API.js)

    //   try {
    //     let res = await API.saveRentedProduct(rentedData);
    //     console.log(res);

    //     if (res.isSuccess) {
    //       console.log(res);
    //       setRentedAdded(true);
    //     } else {
    //       console.log(
    //         "Server has sent data to frontend but some eroor in frntend"
    //       );
    //     }
    //   } catch (err) {
    //     console.log("ERROR: ", err);
    //   }
    // };

    // saveRentedProduct();
  }
  console.log(rentedAdded);

  if (rentedAdded == true) {
    const deleteRentedProductFromPost = async () => {
      //data is being saved in db but here it is showing error. solve this
      //then make a mechanism such that after saving the renteddata it deltes the data of given post id form post db colection
      //use the prev made postdeleteById (see API.js)
      const rented = JSON.parse(savedPost);

      console.log(rented[0]._id);
      try {
        let res = await API.deletePostsOfId({ _id: rented[0]._id });

        if (res.isSuccess) {
          console.log(res);
          console.log("deletion complete of rented product fromm post");
          setRentedAdded(false);
        } else {
          console.log("delteio faild");
        }
      } catch (err) {
        console.log(err);
      }
    };
    // deleteRentedProductFromPost()
  }

  const handleProductmarket = (e) => {
    // console.log(e)
    navigate(`/tenant/productmarket/${e.name}`);
  };

  const hellouserBg =
    "https://cdn.pixabay.com/photo/2018/09/24/08/52/mountains-3699372_1280.jpg";

  const productType = [
    {
      image:
       "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      
      name: "Room",
    },
    {
      image:
        "https://thearchitectsdiary.com/wp-content/uploads/2024/07/Flat-In-Pune-10.jpg",
      
      name: "Flat",
    },
    {
      image:
       "https://i.pinimg.com/1200x/81/7d/73/817d734c0253df69aab40dad4fbaecbf.jpg",
       
        name: "Building",
    },
  ];

  const feedback = [
    {
      content:
        "I had an excellent experience using the Room Finder app! The interface was user-friendly, and I found exactly what I was looking for in just a few clicks. The search filters were spot-on, allowing me to narrow down my options quickly. I especially appreciated the detailed listings and the ability to contact landlords directly through the app. Thanks to Room Finder, I secured a great place within my budget and preferred location. Highly recommend this app to anyone searching for a room!",

      photo:
        "https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_1280.jpg",
      name: "Ram Thapa",
    },
    {
      content:
        '"Room Finder made my room search so easy and stress-free! As a girl, safety and location were my top priorities, and the app allowed me to filter options based on those needs. The listings were detailed, with clear photos and descriptions, so I knew exactly what to expect. I loved the convenience of being able to compare different rooms side by side and even schedule visits directly through the app. I found a cozy, safe place thats perfect for me. I couldnt be happier—Room Finder is a must-have for anyone looking for a new place!"',

      photo:
        "https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg",
      name: "Sita Thapa",
    },
  ];

  //animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: startCard.current[0], // Use the first card as the trigger point
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        //   markers: true,
      },
    });

    startCard.current.forEach((card, index) => {
      tl.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        index * 0.2 // Adding delay within the timeline for each card
      );
    });

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: reviewCard.current[0], // Use the first card as the trigger point
        start: "top 100%",
        end: "top 20%",
        scrub: true,
        //   markers: true,
      },
    });

    reviewCard.current.forEach((e, index) => {
      t2.fromTo(
        e,
        {
          x: 200,
          opacity: 0,
          boxShadow: "2px 2px 2px 2px black",
        },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power2.out",

          boxShadow: "0px 0px 0px 0px black",
        },
        index * 2.2
      );
    });
  }, []);

  return (
    <>
      <Header />

      <Grid container sx={{ marginTop: "4rem", overflowX: "hidden" }}>
        <Grid
          item
          sx={{
            background: `url(${hellouserBg}) no-repeat 75% 25% / cover`,
            height: "30rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            
          }}
          xs={12}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
          
           
           
          </Box>

          <Box>
            <Typography sx={{ color: "white" }} variant="h5">
              Welcome, {account.name}
            </Typography>
          </Box>
        </Grid>

        <Box
          sx={{
            padding: "3rem",
            textAlign: "center",
            color: darkMode ? "white" : "black",
          }}
        >
          <Typography sx={{ margin: "2rem" }} variant="h3">
            {" "}
            What are you looking for exactly ?{" "}
          </Typography>

          <Typography variant="h6">
            Looking for the perfect room? You’re already in the right place! Our
            app makes finding your next home a breeze. Browse through a variety
            of listings, filter by your preferences, and connect with landlords
            directly. Enjoy a seamless experience from start to finish. Happy
            room hunting! 🏡
          </Typography>
        </Box>

        {/* , boxShadow: 'blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px' */}
        <Grid
          container
          justifyContent={"space-evenly"}
          direction={{ md: "row", lg: "row" }}
          sx={{ padding: "2rem" }}
          varient="caption"
        >
          {productType.map((e, index) => (
            <Card
              ref={(el) => (startCard.current[index] = el)}
              onClick={() => handleProductmarket(e)}
              key={index}
              sx={{
                "&:hover": {
                  transform: "scale(1.03)",
                  transition: "0.4s",
                },
                "&:active": {
                  transform: "scale(1.06)",
                },
                transition: "0.4s",
                cursor: "pointer",

                background: "#91ae98",
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={`${e.image}`}
                alt={`${e.name}`}

              />

              <CardHeader
                sx={{ textAlign: "center", color: "black" }}
                title={`${e.name}`}
              />
            </Card>
          ))}
        </Grid>

        <Typography
          sx={{
            textAlign: "center",
            width: "100%",
            color: darkMode ? "white" : "black",
            margin: "2rem",
          }}
          variant="h3"
        >
          See What People have to Say !
        </Typography>

        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ margin: "1.25rem 0px" }}
        >
          <Grid item lg={10} md={10} sm={10} xs={10}>
            {feedback.map((e, index) => (
              <Card
                ref={(e) => (reviewCard.current[index] = e)}
                key={index}
                sx={{
                  marginTop: "1.52rem",
                  background: darkMode ? "#494F55" : "",
                  color: darkMode ? "white" : "black",
                  boxShadow:  "0px 2px 2px 2px black",
                  borderRight: "4px solid green"
                }}
              >
                <CardHeader
                  avatar={<Avatar src={e.photo} alt={e.name} />}
                  title={e.name}
                  subheader={
                    <Rating name="read-only" value={5} size="small" readOnly />
                  }
                />

                <CardContent>
                  <Typography variant="h5">{e.content}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        <Footer />
      </Grid>
    </>
  );
};

export default TenantHome;
