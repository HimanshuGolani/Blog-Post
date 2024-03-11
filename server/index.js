import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

// initializing the app
const app = express();

// middlewear
app.use(express.json());

// calling routers
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// connecting to mongoose
const CONNECTION_URL =
  "mongodb+srv://author123:author123@cluster0.scpivm0.mongodb.net/Blog-Post";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port  ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
