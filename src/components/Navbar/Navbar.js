import React, { useState, useEffect } from "react";
import { AppBar, Typography, IconButton, Toolbar, Button } from "@mui/material";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import useStyles from "../../styles/navbar";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      elevation={0}
    >
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h4" align="center">
          DoSomeMath
        </Typography>
      </div>
      <div className={classes.navButtons}>
        <IconButton aria-label="home" component={Link} to="/">
          <CalculateOutlinedIcon className={classes.auth} />
        </IconButton>
        <IconButton aria-label="leaderboard" component={Link} to="/leaderboard">
          <LeaderboardOutlinedIcon className={classes.auth} />
        </IconButton>
        <IconButton
          aria-label="auth"
          component={Link}
          to={user ? "/user" : "/auth"}
        >
          {user ? (
            <PersonIcon className={classes.auth} />
          ) : (
            <PersonOutlinedIcon className={classes.auth} />
          )}
          {user ? (
            <Typography className={classes.userName} variant="body1">
              {user.result.name}
            </Typography>
          ) : null}
        </IconButton>
      </div>
      <div>
        <Toolbar className={classes.toolbar}>
          {location.pathname === "/user" ? (
            <div className={classes.profile}>
              <Button variant="text" className={classes.auth} onClick={logout}>
                Logout
              </Button>
            </div>
          ) : null}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
