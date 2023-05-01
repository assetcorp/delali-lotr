import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { useMovies } from "../hooks/useMovies";
import { Movie } from "@delali/lotrsdk/dist/src/interfaces";
import { useRouter } from "next/router";

const MainSearch = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const { movies, isLoading } = useMovies({ filter: { name: search } });
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    setSearch(selectedMovie?.name ?? "");
    if (selectedMovie?._id) {
      router.push(`/movies/${selectedMovie._id}`);
    }
  }, [selectedMovie]);

  return (
    <Autocomplete
      id="search-movies-autocomplete"
      sx={{
        transition: (theme) => theme.transitions.create("width"),
        width: 300,
        "&:hover": {
          width: {
            md: 600,
            lg: 600,
          },
        },
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      options={movies?.docs ?? []}
      loading={isLoading}
      onChange={(_, val) => setSelectedMovie(val)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={!selectedMovie || !search ? "Search movies" : ""}
          onChange={(evt) => setSearch(evt.target.value)}
          InputLabelProps={{
            shrink: false,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default MainSearch;
