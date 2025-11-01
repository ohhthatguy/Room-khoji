import { useState, useEffect, useContext, useRef } from "react";
import {
  Paper,
  Button,
  Grid,
  Box,
  styled,
  Checkbox,
  Typography,
  Radio,
  RadioGroup,
  CircularProgress,
  FormControlLabel,
  TextField,
  FormLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { API } from "../../services/Api";
import toast from "react-hot-toast";
import Otp from "./Otp";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #e5dfdb;
  height: 90%;
  padding: 2rem;

  gap: 2rem;
`;

const StyledImg = styled("img")`
  width: 100%;
  height: 90%;
  object-fit: cover;

  borderleft: 1px solid black;
`;

const Signup = () => {
  const navigate = useNavigate();
  const firstLoad = useRef(true);

  const initial = {
    category: "",
    profile: "",
    name: "",
    email: "",
    password: "",
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")} `,
  };

  const [signUpData, setSignUpData] = useState(initial);
  const [profileImage, setProfileImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCodeFromBackend, setOtpCodeFromBackend] = useState("");

  const handleInput = (e) => {
    if (e.target.type !== undefined) {
      setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    }
  };

   const createAccount = async () => {
        console.log(signUpData);
        setOtpCodeFromBackend('')
        setIsLoading(true);

        try {
          let response = await API.createNewAccount(signUpData);
          if (!response.isSuccess) {
            console.log(
              "Server has sent data to frontend but some eroor in frntend"
            );
          } else {
            console.log("data saved");
            toast.success("Account Created Successfully!")
            navigate("/");
          }
        } catch (err) {
          console.log("ERROR: ", err);
          if(err?.data?.err?.code == 11000){
            toast.error("Account with same email found already existing!");
            setShowOtpModal(false)
          }
        }

        setIsLoading(false);
      };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
     

      const otpAuth = async () => {
        setIsLoading(true);

        try {
          let response = await API.otpAuth(signUpData);
          if (!response.isSuccess) {
            console.log(
              "Server has sent data to frontend but some eroor in frntend while sending itp"
            );
          } else {
            console.log("otp sent");
            console.log(response)
            setOtpCodeFromBackend(response.data.code);
            setShowOtpModal(true);
            //show the dialoge box and if it enters correct call CreateAccount()
          }
        } catch (err) {
          console.log("ERROR: ", err);
        }

        setIsLoading(false);
      };

      otpAuth()

    }

    console.log("here");
    console.log(signUpData);
  }, [signUpData.profile]);

  const handleClick = async () => {
    if (!signUpData.category) {
      toast.error("Please select Tenant or Landlord");
      return;
    }

    if (
      !isValidName(signUpData.name) ||
      !isValidEmail(signUpData.email) ||
      !isValidPassword(signUpData.password)
    ) {
      // setIsFormValid(false);
      return;
    }

    console.log(signUpData);
    console.log(profileImage);
    setIsLoading(true);

    const data = new FormData();
    // data.append("name", profileImage.name)
    data.append("image", profileImage);

    try {
      let response = await API.getProductPicture(data);
      if (!response.isSuccess) {
        console.log(
          "Server has sent data to frontend but some eroor in frntend"
        );
      } else {
        console.log("photo saved");
        console.log(response.data);

        setSignUpData({ ...signUpData, profile: response.data });
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
    setIsLoading(false);
  };

  console.log(`profile: ${signUpData.profile}`);

  const isValidName = (name) => {
    if (!name) {
      toast.error("❗ Name is required.");
      return false;
    }
    if (name.length < 5) {
      toast.error("❗ Name must be at least 5 characters.");
      return false;
    }
    if (name.length > 30) {
      toast.error("❗ Name must be less than or equal to 30 characters.");
      return false;
    }
    return true;
  };

  const isValidPassword = (password) => {
    if (!password) {
      toast.error("❗ Password is required.");
      return false;
    }
    if (password.length < 5) {
      toast.error("❗ Password must be at least 5 characters.");
      return false;
    }
    if (password.length > 15) {
      toast.error("❗ Password must be at most 15 characters.");
      return false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
      toast.error(
        "❗ Password must contain at least one letter and one number."
      );
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    if (!email) {
      toast.error("❗ Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("❗ Email format is invalid.");
      return false;
    }
    return true;
  };

  const handleOtpInput = (val) => {
    console.log("val: ", val);

    if (val.length == 6) {
      // checkOtp(val);

      console.log(otpCodeFromBackend)

      if(otpCodeFromBackend == val){
        //finally call the signup
      createAccount();

      }else{
        toast.error("Wrong OTP Entered!")
      }

    }
  };

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        sx={{
          padding: "4rem",
          height: "100vh",
          background: "#85d6a9",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          sx={{
            textAlign: "right",
            position: "relative",
            display: { xs: "none", sm: "block" },
          }}
          lg={4}
          md={5}
          sm={5}
          xs
        >
          <StyledImg
            src="https://cdn.pixabay.com/photo/2019/05/24/11/00/interior-4226020_1280.jpg"
            alt="bg-login"
          />

           
        </Grid>

        <Grid item lg={4} md={5} sm={6} xs={10}>
          <StyledPaper>
            <Box sx={{ display: "grid", placeItems: "center" }}>
               <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 96 96"
            >
              <g fill="#4d4d4d">
                <path d="M51 31v61h46V31H54.688zm7.406 7.438h31.188v46.03H85V77h-7v7.47H58.406z"></path>
                <path d="M62 45v8h7v-8z"></path>
                <path d="M85 45h-7v8h7z"></path>
                <path d="M69 70v-8h-7v8z"></path>
                <path d="M78 70h7v-8h-7z"></path>
              </g>
              <g fill="#607ddf">
                <path d="M39.094 0L36.5 2.828 21 19.292l-1 1.13V92h38.406V20.517l-1.218-1.226L41.812 2.828 39.094 0zm0 10.966l11.812 12.568V84.46H43V73.9h-8v10.56h-7.688V23.533l11.782-12.568z"></path>
                <path d="M43 42h-8v13h8z"></path>
              </g>
              <g fill="#4d4d4d">
                <path d="M0 52v40h27.406V52H0zm7.406 7.47H20v24.936h-3V81h-7v3.406H7.406V59.47z"></path>
                <path d="M17 66h-7v7h7z"></path>
              </g>
            </svg>

              <Typography variant="h5">Room Finder</Typography>
            </Box>

            <Box>
              <FormLabel>Category</FormLabel>

              <RadioGroup row>
                <FormControlLabel
                  value="Tenant"
                  name="category"
                  onClick={(e) => handleInput(e)}
                  control={<Radio />}
                  label="Tenant"
                />
                <FormControlLabel
                  value="Landlord"
                  name="category"
                  onClick={(e) => handleInput(e)}
                  control={<Radio />}
                  label="Landlord"
                />
              </RadioGroup>
            </Box>

            <TextField
              label="Full Name"
              name="name"
              onChange={(e) => handleInput(e)}
              variant="standard"
              required
            />

            <TextField
              label="Email"
              name="email"
              onChange={(e) => handleInput(e)}
              variant="standard"
              required
            />

            <TextField
              label="Password"
              name="password"
              onChange={(e) => handleInput(e)}
              type="password"
              required
              variant="standard"
            />

            <label>
              <input
                onChange={(e) => setProfileImage(e.target.files[0])}
                type="file"
                id="fileInput"
              />
            </label>
            {/* && profileImage */}
            <Button
              variant="contained"
              // disabled={ isFormValid}
              // // disabled={
              // //   signUpData.name &&
              // //   signUpData.email &&
              // //   signUpData.category &&
              // //   signUpData.password
              // //     ? false
              // //     : true
              // // }
              onClick={() => handleClick()}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "SignUp"
              )}
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>

      <Modal
        isOpen={showOtpModal}
        toggle={() => setShowOtpModal((prev) => !prev)}
        centered
        scrollable
      >
        <ModalHeader toggle={() => setShowOtpModal((prev) => !prev)}>
          Check Email For OTP
        </ModalHeader>
        <ModalBody >
          <Otp length={6} onChange={(val) => handleOtpInput(val)} />
        </ModalBody>
       
      </Modal>
    </>
  );
};

export default Signup;
