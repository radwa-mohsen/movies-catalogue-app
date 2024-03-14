import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../components/common/MoviewCard';
import { Box } from '@mui/material';
import axios, { API } from '../../config/axios';

const Movies = () => {
    // States
    const [movies, setMovies] = useState([]);
  
    // Functions
    const getMoviesList = () => {
      axios
        .get(API.movies('now_playing'))
        .then((res) => {
          setMovies(res.data.results);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    };
  
    // UseEffects
    useEffect(() => {
      getMoviesList();
    }, []);
  
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