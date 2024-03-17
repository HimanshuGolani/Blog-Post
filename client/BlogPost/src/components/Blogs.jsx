import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
        }}
      >
        {Array.isArray(blogs) &&
          blogs.map((blog, index) => (
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              key={index}
              title={blog.title}
              description={blog.description}
              imgUrl={blog.image}
              userName={blog.user.name}
            />
          ))}
      </Box>
    </>
  );
};

export default Blogs;
