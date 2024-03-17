import React from "react";
import { AppBar, Box, Button, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 100%, rgba(255,0,0,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography
            onClick={() => {
              navigator("/");
            }}
            variant="h5"
            color={"white"}
            sx={{
              cursor: "pointer",
            }}
          >
            Blog Post
          </Typography>
          {isLoggedIn && (
            <Box display="flex" margin="auto">
              <Tabs textColor="inherit" fontWeight="bold">
                <Button LinkComponent={Link} to="/blogs" variant="text">
                  All Blogs
                </Button>
                <Button variant="text" LinkComponent={Link} to="/myblogs">
                  My Blogs
                </Button>
                <Button variant="text" LinkComponent={Link} to="/blogs/add">
                  Add Blog
                </Button>
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 30 }}
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 30 }}
                >
                  Sign-Up
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => {
                  dispatch(authActions.logout());
                  localStorage.clear();
                }}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 30 }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
