import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, imgUrl, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handelEdit = (e) => {
    navigate(`/myblogs/${id}`);
  };
  const deleteRequest = async () => {
    const response = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((error) => {
        console.log(error);
      });
    const data = await response.data;
    return data;
  };
  const handelDelete = () => {
    deleteRequest();
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "10px 10px 20px 20px #eee",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          action={
            isUser && (
              <>
                <IconButton onClick={handelDelete} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={handelEdit} aria-label="edit">
                  <CreateIcon />
                </IconButton>
              </>
            )
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={imgUrl} alt="image" />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            {<b>{userName}</b>} : {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Blog;
