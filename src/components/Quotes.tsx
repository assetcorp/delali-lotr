import {
  Alert,
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
import { useQuotes } from "../hooks/useQuotes";

const Quotes = () => {
  const { quotes, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQuotes();
  const [open, setOpen] = React.useState(false);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleCopy = (data: string) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data);
        setOpen(true);
      }
    } catch (_) {}
  };

  const handleClose = () => {
    setOpen(false);
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
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          Quote copied
        </Alert>
      </Snackbar>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{ mb: 2, pt: 4 }}
      >
        Movie Quotes
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
        {!quotes?.pages[0] || isLoading
          ? renderLoading()
          : quotes?.pages.map((page) => (
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
                                {item.characterlist.gender === "Male"
                                  ? "man"
                                  : "woman"}
                              </Icon>
                            </Avatar>
                          }
                          title={item.characterlist.name}
                          subheader={`Birth: ${
                            item.characterlist.birth || "Unknown"
                          }`}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {item.dialog}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button>
                            <Link
                              href={item.characterlist.wikiUrl}
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
                            {item.characterlist.race && (
                              <Chip
                                size="small"
                                label={`Race: ${item.characterlist.race}`}
                              />
                            )}
                          </Stack>
                          <IconButton
                            onClick={() => handleCopy(item.dialog)}
                            sx={{ marginLeft: "auto" }}
                          >
                            <Icon color="secondary">content_copy</Icon>
                          </IconButton>
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

export default Quotes;
