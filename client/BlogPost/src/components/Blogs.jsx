import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box } from "@mui/material";
import { useBlogContext } from "./BlogContext";
import Loader from "./Loader";

const Blogs = () => {
  const { blogs, setBlogs } = useBlogContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/blog");
        await setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Ensure setLoading(false) is called after the asynchronous operation completes
      }
    };

    fetchBlogs(); // No need to set loading to true before calling fetchBlogs()
  }, [setBlogs]);

  return (
    <>
      {!loading ? (
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
                likeCount={blog.likeCount}
              />
            ))}
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Blogs;
