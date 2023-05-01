import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useMovies } from "../hooks/useMovies";
import ChipBadge from "./ChipBadge";
import NextLink from "next/link";

const Movies = () => {
  const { movies, isLoading } = useMovies();

  const renderLoading = () =>
    [1, 2, 3].map((item) => {
      return (
        <Card key={item} sx={{ minWidth: 275, maxWidth: 300 }}>
          <CardContent>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "4rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </CardContent>
          <CardActions>
            <Skeleton
              variant="rectangular"
              sx={{
                width: 100,
                height: 30,
                borderRadius: (theme) => theme.shape.borderRadius,
                ml: 1,
              }}
            />
          </CardActions>
        </Card>
      );
    });
  return (
    <Box>
      <Typography
        id="movies-title"
        variant="h3"
        component="h1"
        align="center"
        sx={{ mb: 2, pt: 4 }}
      >
        Movies
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        sx={{ paddingY: 4 }}
        alignItems="center"
        justifyContent="center"
      >
        {!movies || isLoading
          ? renderLoading()
          : movies.docs.map((item) => {
              return (
                <Card
                  key={item._id}
                  sx={{ minWidth: 275, marginY: 1, overflow: "visible" }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      useFlexGap
                      flexWrap="wrap"
                      sx={{ marginY: 2 }}
                    >
                      <ChipBadge
                        label="Runtime"
                        icon="update"
                        badgeContent={`${item.runtimeInMinutes} mins`}
                      />
                      <ChipBadge
                        label="Budget"
                        icon="monetization_on"
                        badgeContent={`${item.budgetInMillions} million`}
                      />
                      <ChipBadge
                        label="Awards"
                        icon="military_tech"
                        badgeContent={`${item.academyAwardWins}`}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <NextLink
                      href={`/movies/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Link component="span" underline="none">
                        <Button size="small">View Details</Button>
                      </Link>
                    </NextLink>
                  </CardActions>
                </Card>
              );
            })}
      </Stack>
    </Box>
  );
};

export default Movies;
