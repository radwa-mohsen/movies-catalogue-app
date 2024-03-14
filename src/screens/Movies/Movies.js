import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieCard } from "../../components/common/MovieCard";
import axios, { API } from "../../config/axios";
import useErrorsHandler from "../../hooks/useErrorHandler";

const Movies = () => {
  // States
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");

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
    setSearchText(query);
  };
  const handleSearchClick = () => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(!searchText ? movies : filteredMovies);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    if (option === "rate") {
      setFilteredMovies([...filteredMovies].sort((a, b) => b.vote_average - a.vote_average));
    } else if (option === "date") {
      setFilteredMovies(
        [...filteredMovies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      );
    } else {
      const filterBySearch = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredMovies(!searchText ? movies : filterBySearch);
    }
  };

  // UseEffects
  useEffect(() => {
    getMoviesList();
  }, []);

  return (
    <>
      <h1> Movies List</h1>
      <Box display="flex" justifyContent="end" mb={4}>
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
                <IconButton onClick={handleSearchClick} onMouseDown={handleSearchClick} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
        <FormControl sx={{ marginLeft: "16px", minWidth: "200px" }} variant="outlined">
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort By"
            variant="outlined"
            onChange={handleSortChange}
            value={sortOption}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="rate">Rating</MenuItem>
            <MenuItem value="date">Release Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </>
  );
};

export { Movies };
