import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
const Header = () => {
  return (
    <>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 100%, rgba(255,0,0,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h5" color={"white"}>
            Blog Post
          </Typography>
          <Box display="flex" marginLeft="auto">
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 30 }}
              color="warning"
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 30 }}
              color="warning"
            >
              Sign-Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
