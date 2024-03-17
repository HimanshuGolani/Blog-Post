import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null); // Initialize blog state with null
  const [inputs, setInputs] = useState();

  const id = useParams().id;

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/blog/update/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data));
    navigate("/blogs");
  };

  return (
    <>
      {blog && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="#fefefe"
            borderRadius={10}
            boxShadow="10px 10px 10px 10px #eee"
            padding={3}
            margin="auto"
            marginTop={2}
            display="flex"
            flexDirection="column"
            width="80%"
          >
            <Typography
              fontWeight="bold"
              padding={3}
              color="grey"
              variant="h3"
              textAlign="center"
            >
              Edit Blog
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

            <Button
              type="submit"
              variant="contained"
              sx={{ margin: 1, borderRadius: 30 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default BlogDetails;
