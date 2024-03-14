import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MovieCard } from "../../components/common/MovieCard";
import axios, { API } from "../../config/axios";
import useErrorsHandler from "../../hooks/useErrorHandler";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieIcon from "@mui/icons-material/Movie";
const Movies = () => {
  // States
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedTab, setSelectedTab] = React.useState(0);

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

  useEffect(() => {
    if (selectedTab === 1) {
      const favorites = movies.filter((movie) => movie.favorite);
      setFilteredMovies(favorites);
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedTab, movies]);

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
      {selectedTab === 1 && filteredMovies.length === 0 && (
        <Box mt={12}>
          <center>
            <p>you don't have any Movie in your list, you can add one from</p>
          </center>
        </Box>
      )}
      <Grid container spacing={4}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      <Paper sx={{ zIndex: 1, position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={selectedTab}
          onChange={(event, newValue) => {
            setSelectedTab(newValue);
          }}
        >
          <BottomNavigationAction label="Now Playing" icon={<MovieIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export { Movies };
