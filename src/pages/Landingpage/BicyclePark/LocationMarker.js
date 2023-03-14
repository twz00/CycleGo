import { Box } from '@mui/material'
import React from 'react'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

export default function LocationMarker({onClick}) {

  return (
    <Box component="div" onClick={onClick} >
        <DirectionsBikeIcon  fontSize="small" />
    </Box>
  )
}