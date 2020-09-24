import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import Foody from "../assets/images/foody.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Foody})`,
    backgroundColor: "#c49c48",
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  center: {
    textAlign: "center",
    fontSize: "48px",
    fontWeight: "700",
    lineHeight: "1.2",
    textTransform: "uppercase",
  },
  marked: {
    width: "73px",
    height: "4px",
    margin: "8px auto 0",
    display: "block",
    backgroundColor: "#ff3366",
  },
}));

const ProductHero = () => {
  const classes = useStyles();

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img style={{ display: "none" }} src={Foody} alt="increase priority" />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        className={classes.center}
      >
        Explore Recipe!<span className={classes.marked}></span>
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Find the perfect recipe to cook anytime.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={Link}
        to="/register"
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Enjoy a seamless recipe search experience
      </Typography>
    </ProductHeroLayout>
  );
};

export default ProductHero;
