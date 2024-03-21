import React, { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
