import React, { useEffect, useState, useCallback } from 'react';
import { MovieCard } from '../../components/common/MovieCard';
import { Box } from '@mui/material';
import axios, { API } from '../../config/axios';
import useErrorsHandler from '../../hooks/useErrorHandler';

const Movies = () => {
  // States
  const [movies, setMovies] = useState([]);

  // Hooks
  const handleErrorResponse = useErrorsHandler();

  // Functions
  const getMoviesList = useCallback(() => {
    axios
      .get(API.movies('now_playing'))
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        // handle error
        handleErrorResponse(error);
      });
  }, [handleErrorResponse]);

  // UseEffects
  useEffect(() => {
    getMoviesList();
  }, [getMoviesList]);

  return (
    <Box>
      <h1> Movies List</h1>
      {movies?.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </Box>
  );
};

export { Movies };
