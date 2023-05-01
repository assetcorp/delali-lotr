import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";

const pages = [
  {
    name: "Movies",
    link: "/",
  },
  {
    name: "Characters",
    link: "/characters",
  },
  {
    name: "Quotes",
    link: "/quotes",
  },
];

const Nav = () => {
  const { pathname } = useRouter();

  return (
    <Box sx={{ paddingY: 3, width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb">
        {pages.map((item) => {
          return pathname === item.link ? (
            <Typography key={item.link} color="text.primary">
              {item.name}
            </Typography>
          ) : (
            <NextLink key={item.link} href={item.link}>
              <Link component="span" underline="hover" color="inherit">
                {item.name}
              </Link>
            </NextLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Nav;
