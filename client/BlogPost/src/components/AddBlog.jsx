import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "./BlogContext";
import Loader from "./Loader";

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const AddBlog = () => {
  const navigate = useNavigate();
  const { setBlogs } = useBlogContext();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      });
      const newBlog = await response.data.blog;
      await setBlogs((prevBlogs) => [...prevBlogs, newBlog]); // Update blogs state
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // Handle image selection
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setInputs((prevState) => ({
            ...prevState,
            image: reader.result, // Store the image as base64 string
          }));
        };
      }
    } else {
      // Handle other inputs
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendRequest();
    setLoading(false);
    navigate("/blogs");
  };

  return (
    <>
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="#fefefe"
            borderRadius={10}
            boxShadow={"10px 10px 10px 10px #eee"}
            padding={3}
            margin={"auto"}
            marginTop={2}
            display={"flex"}
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color={"grey"}
              variant="h3"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              placeholder="Enter your blog's title"
              margin="normal"
              onChange={handleChange}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              placeholder="Enter your description"
              margin="normal"
              onChange={handleChange}
            />
            <InputLabel sx={labelStyles}>Image</InputLabel>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ margin: 1, borderRadius: 30 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AddBlog;
