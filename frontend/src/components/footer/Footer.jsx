import { Box, Typography, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const Footer = () => {
  return (
    <>
      <Grid
        sx={{ paddingBottom: "1rem", background: "#91ae98", width: "100%" }}
      >
        
          <Box
            sx={{
              display: "flex",
              padding: "2rem",
              justifyContent: "space-around",
              gap: "5rem",
              width: "40%",
              width: "100%",
            }}
          >
            {
JSON.parse(localStorage.getItem("currentUser")).category ==
          "Tenant"  ?
            
            <Box>
              <strong> Quick Links </strong>
              <Typography>
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={
                    JSON.parse(localStorage.getItem("currentUser")).category ==
                    "Tenant"
                      ? "/tenantHome"
                      : "/landlordHome"
                  }
                >
                  Homepage
                </a>
              </Typography>

              <Typography>
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href="/myschedule"
                >
                  Status
                </a>
              </Typography>
            </Box> : <Box></Box>
}
            <Box>
              <strong> Contact </strong>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <EmailIcon />
                <Typography>roomKhojiHR@gmail.com</Typography>
              </div>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <PhoneIcon />
                <Typography>091 - 560123</Typography>
              </div>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <FmdGoodIcon />
                <Typography>Koteshwor, Kathmandu</Typography>
              </div>
            </Box>
          </Box>
        

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.2rem",
            height: "fit-content",
          }}
        >
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

          <Typography variant="body2">
            &copy; 2025 Room Khoji. All Rights Reserved.
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default Footer;
