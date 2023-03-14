import { Grid, Box, Typography, Container } from "@mui/material";
import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function CyclingRoutes() {
  const navigate = useNavigate();
  const styleBox = {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    border: "1px solid black",
    textAlign: 'center',
  }
  return (
    <>
      <Navbar backPage="/landingPage" title="Cycling Routes" />
      <Container sx={{paddingTop: 5}}>
        <Grid
          container spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1">
            Explore biking routes in Singapore by clicking on one of the boxes below. 
            </Typography>
            <Typography variant="subtitle2">
            Click on a box to find out more and start your biking adventure in Singapore today!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box boxShadow={2}
              borderRadius={2}
              textAlign="center"
              height="100%"
              p={2} onClick={() => navigate("/cyclingTypeN")} sx={styleBox}>
              <Typography>NORTH</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box boxShadow={2}
              borderRadius={2}
              textAlign="center"
              height="100%" onClick={() => navigate("/cyclingTypeS")} sx={styleBox} >
              <Typography>SOUTH</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box boxShadow={2}
              borderRadius={2}
              textAlign="center"
              height="100%" onClick={() => navigate("/cyclingTypeE")} sx={styleBox} >
              <Typography>EAST</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box boxShadow={2}
              borderRadius={2}
              
              textAlign="center"
              height="100%" onClick={() => navigate("/cyclingTypeW")} sx={styleBox} >
              <Typography>
                WEST
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
