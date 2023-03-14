import React from 'react'
import { Container, TextField, Typography, Stack, Button, Box } from "@mui/material";
import Navbar from '../../components/Navbar';
import Googlemap from './BicyclePark/Googlemap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
export default function Landingpage() {
  const navigate = useNavigate();
  
  const imageCSS = {
    width: '100%',
    height: '170px',
    maxWidth: '400px', // optional styling
  }

  return (
    // Render 3 components
    // 1. Google map
    // 2. Weather forecast
    // 3. Edit information
    <>
      <Navbar title="Main Page" profile />
      <Container>
      <Stack sx={{ paddingTop: 5, paddingBottom: 2 }} direction="column" spacing={2}>
          <Box onClick={() => navigate("/googlemap")} sx={imageCSS} component="img" src="/img/Bike.jpg" />
          <Box onClick={() => navigate("/cyclingRoutes")} sx={imageCSS} component="img" src="/img/cyclingRoutes.jpg" />
          <Box onClick={() => navigate("/weather")} sx={imageCSS} component="img" src="/img/weather.jpg" />
          <Box onClick={() => navigate("/fitnessPage")} sx={imageCSS} component="img" src="/img/fitnessProgress.png" />
        </Stack>
      </Container>
    </>
  )
}
