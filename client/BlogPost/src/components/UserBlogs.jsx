import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => {
        console.log(err);
      });
    const data = await response.data.blogs;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <>
      {blogs.length === 0 ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          margin={"auto"}
          marginTop={5}
        >
          <Typography variant="h2">You havent Posted any blog yet.</Typography>
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 30 }}
            LinkComponent={Link}
            to="/blogs/add"
          >
            Click Me to go to the page
          </Button>
        </Box>
      ) : (
        blogs.map((blog, index) => (
          <Blog
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={"You said this"}
            key={index}
          />
        ))
      )}
    </>
  );
};

export default UserBlogs;
