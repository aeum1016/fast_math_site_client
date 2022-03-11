import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import useStyles from "../styles/navbar";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };

  // useEffect(() => {
  //   const token = user?.token;

  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) {
  //       logout();
  //     }
  //   }

  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      elevation={0}
    >
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h3" align="center">
          QUICK
        </Typography>
      </div>
      <div classname={classes.navButtons}>
        <IconButton aria-label="home" component={Link} to="/">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="leaderboard">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="settings">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="auth">
          <DeleteIcon />
        </IconButton>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.grey}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="text" className={classes.auth} onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="text"
            className={classes.auth}
            component={Link}
            to="/auth"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
