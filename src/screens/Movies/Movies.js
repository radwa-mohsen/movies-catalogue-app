import { Box } from '@mui/material'
import React from 'react'
import { MovieCard } from '../../components/common/MoviewCard'

const Movies = () => {
  return (
    <Box>
      <h1> Movies List</h1>
      <MovieCard/>
    </Box>
    )
}

export {Movies}