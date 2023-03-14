import { Container, Typography, Box, Button, Stack } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Link } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';


import React from "react";
export default function Homepage() {
  const theme = useTheme();
  return (
    <Container  sx={{backgroundColor: theme.palette.background.default , textAlign: "center", paddingTop: 20, paddingBottom: 30}} >
        <DirectionsBikeIcon fontSize='large'/>
        <Typography  variant="h3">
          CycleGo
        </Typography>
        <Typography >
          Welcome to CycleGo!
        </Typography>
        <Typography sx={{paddingTop: 1}}>
        An app that is able to cater to your cycling needs.
        </Typography>

        <Stack direction="column" sx={{paddingTop: 5}}>
          <Button component={Link} to="/login" variant="contained" sx={{marginBottom: 1}}>Login</Button>
          <Button component={Link} to="/register" variant="contained">Register</Button>
        </Stack>
        
    </Container>
  );
}
