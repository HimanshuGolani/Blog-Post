import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";
import "dotenv/config";

// initializing the app
const app = express();
app.use(cors());
// middlewear
app.use(express.json());

// calling routers
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// connecting to mongoose
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5001;

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
