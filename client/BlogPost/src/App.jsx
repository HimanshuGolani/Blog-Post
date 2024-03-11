import React from "react";
import Header from "./components/Header";
import {Routes , Route} from "react-router-dom"
import Auth from "./components/Auth";
import Blogs from "./components/Blogs"
import UserBlogs from "./components/UserBlogs"
import BlogDetails from './components/BlogDetails'
import AddBlog from "./components/AddBlog"
const App = () => {
  return (
    <>
      <header>
      <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/myblogs" element={<UserBlogs/>} />
          <Route path="/myblogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
