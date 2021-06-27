import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";

import { Context } from "./context";
import Logo from "./assets/logo.png";
import Loader from "./components/Loading";
import UserList from "./components/UserList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "200px",
    height: "70px",
  },
  navBackground: {
    backgroundColor: "#394e89",
  },
  IconButton: {
    marginLeft: "auto",
  },
  homeIcon: {
    fontSize: "45px",
    color: "#fdbe4b",
  },
}));

const App = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context); // Accessing Global State of the Application using useContext hook, It returns the application state as well as dispatch to update the global state.
  const { user } = state;

  // First application render in the DOM useEffect hook will execute and fetch data from remote server
  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants").then(
      (res) =>
        res.json().then((data) => dispatch({ type: "GET_DATA", payload: data })) // After fetched data from remote server dispatch the action called "GET_DATA" and  It will store data in global store of the application and accessible in all components.
    );
  }, []);

  return (
    <div>
      <AppBar position="static" className={classes.navBackground}>
        <Toolbar>
          <img src={Logo} className={classes.image} alt="travclan" />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.IconButton}
          >
            <HomeIcon className={classes.homeIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>{user ? <UserList /> : <Loader />}</div>
      <div>
        <div className="border-line"></div>
        <h3 className="name">Created by Md Riyaz Ansari</h3>
      </div>
    </div>
  );
};

export default App;
