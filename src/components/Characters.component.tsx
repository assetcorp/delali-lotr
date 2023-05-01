import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Icon,
  IconButton,
  Link,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ChipBadge from "./ChipBadge";
import NextLink from "next/link";
import { useCharacters } from "../hooks/useCharacters";
import { red } from "@mui/material/colors";
import { RequestOptions } from "@delali/lotrsdk";

const Characters = () => {
  const {
    characters,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters();

  const handleLoadMore = () => {
    fetchNextPage();
  };

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
        variant="h3"
        component="h1"
        align="center"
        sx={{ mb: 2, pt: 4 }}
      >
        Movie Characters
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
        {!characters?.pages[0] || isLoading
          ? renderLoading()
          : characters?.pages.map((page) => (
              <React.Fragment key={page?.docs.length}>
                {page &&
                  page!.docs.map((item) => {
                    return (
                      <Card
                        key={item._id}
                        sx={{
                          minWidth: 275,
                          maxWidth: 300,
                          marginY: 1,
                          overflow: "visible",
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{
                                bgcolor: (theme) => theme.palette.primary.main,
                              }}
                              aria-label="recipe"
                            >
                              <Icon>
                                {item.gender === "Male" ? "man" : "woman"}
                              </Icon>
                            </Avatar>
                          }
                          title={item.name}
                          subheader={`Birth: ${item.birth ?? "Unknown"}`}
                        />
                        <CardContent>
                          <Stack direction="column" spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                              Race: {item.race}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Birth date: {item.birth || "Unknown"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Death date: {item.race || "Unknown"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Gender: {item.gender || "Unknown"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Spouse: {item.spouse || "Unknown"}
                            </Typography>
                          </Stack>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button>
                            <Link
                              href={item.wikiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read more
                            </Link>
                          </Button>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginLeft: "auto" }}
                          >
                            {item.race && (
                              <Chip size="small" label={`Race: ${item.race}`} />
                            )}
                            {item.realm && (
                              <Chip
                                size="small"
                                label={`Realm: ${item.realm}`}
                              />
                            )}
                          </Stack>
                        </CardActions>
                      </Card>
                    );
                  })}
              </React.Fragment>
            ))}
      </Stack>
      {hasNextPage && (
        <Stack sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}>
          <Button
            disabled={isLoading || isFetchingNextPage}
            variant="contained"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Stack>
      )}
      <Box sx={{ mb: "300px" }} />
    </Box>
  );
};

export default Characters;
