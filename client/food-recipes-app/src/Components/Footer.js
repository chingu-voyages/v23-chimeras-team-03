import React from "react";
import { AppBar } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link
        color="inherit"
        href="https://github.com/chingu-voyages/v23-chimeras-team-03"
      >
        Foody, Inc.
      </Link>{" "}
      {new Date().getFullYear()}. &nbsp; All rights reserved
    </React.Fragment>
  );
}

export default function Footer() {
  const styles = {
    display: "flex",
    justifyContent: "center",
    left: "auto",
    right: "0",
    bottom: "0",
    position: "fixed",
    background: "#f0a500",
    width: "100%",
    height: "94px",
  };

  return (
    <div style={styles}>
      <AppBar position="fixed" style={{ background: "#f0a500" }}>
        <Container maxWidth="md">
          <Toolbar style={styles}>
            <Typography variant="body1" align="center">
              <Copyright />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
