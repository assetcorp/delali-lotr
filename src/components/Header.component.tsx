import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import DefaultHeader from "./DefaultHeader.component";

const Header = () => {
  const renderHeader = () => {
    return (
      <AppBar
        id="app-header"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.8)"
              : "rgba(0,0,0,0.2)",
          backdropFilter: "blur(8px)",
          borderColor: "divider",
          borderStyle: "solid",
          borderWidth: "0 0 thin",
          color: "text.primary",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={0}
      >
        <Container
          maxWidth="xl"
          sx={{
            paddingX: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Toolbar id="app-header-inner" variant="regular" disableGutters>
            <DefaultHeader />
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  return <>{renderHeader()}</>;
};

export default Header;
