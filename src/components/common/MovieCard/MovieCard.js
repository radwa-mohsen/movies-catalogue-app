import React from 'react';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarsIcon from "@mui/icons-material/Stars";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import dayjs from 'dayjs';
import notFound from '../../../assets/imgs/not-found.png';
import StyledGrid from './MovieCard.style';

const MovieCard = ({ movie }) => {
  return (
    <StyledGrid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Box className="movieCard">
        <Box className="movieCardHeader">
          <Box className="cardHeaderContent">
            <Typography className="cardHeaderTitle" component="h5">
              {movie.title}
            </Typography>
            <Typography className="cardHeaderSubtitle" component="body1">
              {`Release Date: ${dayjs(movie.release_date).format(
                'MMM D, YYYY',
              )}`}
            </Typography>
          </Box>
        </Box>
        <img
          src={
            `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}` ||
            notFound
          }
          alt={movie.title}
          height="250px"
          className='cardImage'
        />
        <Box className="cardContent">
          <Typography className="cardContentSubtitle">
            {movie.overview}
          </Typography>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            {/* Functionality will be add as a bonus */}
          {movie.favorite ?
            <IconButton onClick={()=>{}} aria-label="Remove to favorites">
              <FavoriteIcon color="primary" />
            </IconButton>:
            <IconButton onClick={()=>{}} aria-label="Add from favorites">
            <FavoriteBorderIcon />
          </IconButton>
            }
            <Badge color="secondary" badgeContent={movie.vote_average}>
              <StarsIcon />
            </Badge>
          </Box>
        </Box>
      </Box>
    </StyledGrid>
  );
};
export { MovieCard };