import { useContext, useEffect, useState } from "react";

import {
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Paper,
  styled,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
// import { DataContext } from "../../context/DataProvider"
// import { useNavigate } from "react-router-dom"
import { API } from "../../../services/Api";
import PostCard from "./PostCard";
import Loader from "../../../theme/Loader";

const PostHistory = ({ darkMode }) => {
  //if any history steore in a var and send it as <postcard post = {post} /> else show this no room seold

  const [historyPost, setHistoryPost] = useState([]);
  const account = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(false);

      const getHistoryPost = async () => {
      try {
        setIsLoading(true)
        const res = await API.getRentedProduct();

        if (res.isSuccess) {
          // console.log(res.data)
          setHistoryPost(res.data);
        } else {
          console.log("some wrng");
        }
      } catch (err) {
        console.log("error: ", err);
      }
       setIsLoading(false)
    };

  useEffect(() => {


    getHistoryPost();
  }, []);

  // console.log(historyPost[0].Gharbeti_id)
  // console.log(account._id)

  return (
    <>
      {
        isLoading ? <Loader /> :
      historyPost.length > 0 && historyPost[0].Gharbeti_id == account._id ? (
        <PostCard post={historyPost} darkMode={darkMode} getHistoryPostfunc={getHistoryPost} />
      ) : (
        <Box
          sx={{
            background: darkMode ? "#494F55" : "#F5F5F5 ",
            color: darkMode && "white",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          you have no tenants yet!
        </Box>
      )}
    </>
  );
};

export default PostHistory;
