import React from "react";
import { Box, Link, Typography, useTheme } from "@mui/material";
import NextLink from "next/link";
import MainSearch from "./MainSearch";

const DefaultHeader = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: { xs: 1, md: 0 },
          marginRight: 1,
        }}
      >
        <NextLink href="/" style={{ textDecoration: "none" }}>
          <Link component="span" underline="none">
            <Typography variant="h6">LOTR Showcase</Typography>
          </Link>
        </NextLink>
      </Box>
      <Box sx={{ flexGrow: { xs: 0, md: 1 } }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <MainSearch />
      </Box>
    </>
  );
};

export default DefaultHeader;
