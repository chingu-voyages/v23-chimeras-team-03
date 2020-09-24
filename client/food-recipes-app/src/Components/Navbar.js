import React, { useState } from "react";
import LandingPagebody from "./LandingPageBody";
import ErrorSnackBar from "./ErrorSnackBar";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import ProductHero from "./ProductHero";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    margin: "5px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    color: "#1A1C20",
    fontWeight: "bold",
    fontSize: "30px",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    flexGrow: "0.75",
    marginRight: "15px",
  },
  login: {
    fontSize: 20,
    color: "#F4F4F4",
    marginRight: theme.spacing(2),
  },
  register: {
    fontSize: 20,
    marginRight: theme.spacing(2),
    fontWeight: "bold",
  },
  recipes: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

function NavBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "109df0b1";
  const APP_KEY = "8910f0fb1c1d41a518962eb7e3ae7375";

  async function getRecipes() {
    if (search !== "") {
      const response = await Axios.get(baseUrl);

      if (!response.data.more) {
        return setAlert("No food with provided name!");
      }

      setRecipes(response.data.hits);
      setSearch("");
      setAlert("");
    } else {
      setAlert("Please type recipes you wanna search in the above searchbar!");
    }
  }

  function searchHandler(e) {
    setSearch(e.target.value);
  }

  function formSubmit(e) {
    e.preventDefault();
    getRecipes();
  }

  const baseUrl = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#f0a500" }}>
        <Toolbar>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon aria-controls="simple menu" aria-haspopup="true" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/login" color="primary">
                  {"LOG IN"}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/register" color="secondary">
                  {"SIGN UP"}
                </Link>
              </MenuItem>
            </Menu>
          </div>

          <div className={classes.brand}>
            <Link href="/" underline="none">
              <img
                src="/favicon.ico"
                alt="logo"
                width="80"
                height="80"
                className={classes.logo}
              />
            </Link>
          </div>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" underline="none" className={classes.title}>
              Foody
            </Link>
          </Typography>

          <div className={classes.search}>
            <form onSubmit={formSubmit}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={searchHandler}
                value={search}
                type="text"
              />
            </form>
          </div>
          <div className={classes.grow} />
          <div className={classes.right}>
            <Link href="/login" className={classes.login}>
              {"LOG IN"}
            </Link>
            <Link
              href="/register"
              underline="none"
              color="secondary"
              className={classes.register}
            >
              {"SIGN UP"}
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      {alert !== "" && <ErrorSnackBar alert={alert} />}

      <div className={classes.recipes}>
        {recipes === [] && <ProductHero />}
        {recipes !== [] &&
          recipes.map((recipe) => (
            <LandingPagebody key={uuidv4()} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}

export default NavBar;
