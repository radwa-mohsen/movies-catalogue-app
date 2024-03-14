import React, { useEffect, useState, useCallback } from "react";
import { MovieCard } from "../../components/common/MovieCard";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import axios, { API } from "../../config/axios";
import useErrorsHandler from "../../hooks/useErrorHandler";
import SearchIcon from "@mui/icons-material/Search";

const Movies = () => {
  // States
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Hooks
  const handleErrorResponse = useErrorsHandler();

  // Functions
  const getMoviesList = useCallback(() => {
    axios
      .get(API.movies("now_playing"))
      .then((res) => {
        setMovies(res.data.results);
        setFilteredMovies(res.data.results);
      })
      .catch((error) => {
        // handle error
        handleErrorResponse(error);
      });
  }, [handleErrorResponse]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    !query && setFilteredMovies(movies);
    setSearchText(query);
  };
  const handleSearchClick = () => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(!searchText ? movies : filteredMovies);
  };

  // UseEffects
  useEffect(() => {
    getMoviesList();
  }, []);

  return (
    <Container maxWidth="xl">
      <h1> Movies List</h1>
      <Box display="flex" justifyContent="end" mb={4}>
        <Box display="flex">
          <FormControl variant="outlined">
            <InputLabel htmlFor="search-field">Search</InputLabel>
            <OutlinedInput
              id="search-field"
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search by Movie Title"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearchClick}
                    onMouseDown={handleSearchClick}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search"
            />
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Container>
  );
};

export { Movies };
