import express from "express";
import {
  addBlog,
  getAllBlogs,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
  likePost,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);
blogRouter.patch("/:id/likePost", likePost);

export default blogRouter;
