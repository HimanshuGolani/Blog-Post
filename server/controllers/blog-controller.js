import mongoose, { mongo } from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "Blog not found " });
  } else {
    return res.status(200).json({ blogs });
  }
};

export const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find the user by this id" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const blog = new Blog({
      title,
      description,
      image,
      user,
    });

    await blog.save({ session });

    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();

    res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    session.endSession();
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getById = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(404).json * { message: "Something went wrong" };
  } else {
    return res.status(200).json({ blog });
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    if (!blog) {
      // If no blog is found with the given ID
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "no blogs found" });
  } else {
    return res.status(200).json({ blogs: userBlogs });
  }
};
