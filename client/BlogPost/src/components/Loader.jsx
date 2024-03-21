import React from "react";
import { Box } from "@mui/material";
import "../css/loader.css";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Set height to full viewport height
    >
      <Box>
        <span className="loader"></span>
      </Box>
    </Box>
  );
};

export default Loader;
