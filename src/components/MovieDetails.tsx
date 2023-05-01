import { useMovieDetails } from "@/src/hooks/useMovies";
import {
  Box,
  Container,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

interface MovieDetailsProps {
  movieId: string;
}
const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { data, isLoading } = useMovieDetails(movieId as string);

  return (
    <Box>
      {isLoading ? (
        <Stack alignItems="center" justifyContent="center">
          <Skeleton
            variant="text"
            sx={{ mb: 2, pt: 4, fontSize: "3rem", width: "60%" }}
          />
        </Stack>
      ) : (
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ mb: 2, pt: 4 }}
        >
          {data?.movie.name}
        </Typography>
      )}

      <Container maxWidth="sm">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon>update</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Runtime"
                secondary={
                  isLoading ? (
                    <Skeleton variant="text" />
                  ) : (
                    `${data?.movie.runtimeInMinutes} minutes`
                  )
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon>monetization_on</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Budget"
                secondary={
                  isLoading ? (
                    <Skeleton variant="text" />
                  ) : (
                    `${data?.movie.budgetInMillions} million`
                  )
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon>military_tech</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Academy Awards Won"
                secondary={
                  isLoading ? (
                    <Skeleton variant="text" />
                  ) : (
                    `${data?.movie.academyAwardWins}`
                  )
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon>new_releases</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Academy Awards Nominated"
                secondary={
                  isLoading ? (
                    <Skeleton variant="text" />
                  ) : (
                    `${data?.movie.academyAwardNominations}`
                  )
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon>score</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Rotten Tomatoes Score"
                secondary={
                  isLoading ? (
                    <Skeleton variant="text" />
                  ) : (
                    `${data?.movie.rottenTomatoesScore}`
                  )
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 2, pt: 4 }}
        >
          Top 10 Quotes
        </Typography>
        {data?.quotes.length ? (
          <List>
            {data?.quotes.map((item, index) => {
              return (
                <ListItem key={item._id} disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={`# ${index + 1}`}
                      secondary={item.dialog}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="h6" align="center">
            There are no quotes for this movie
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetails;
