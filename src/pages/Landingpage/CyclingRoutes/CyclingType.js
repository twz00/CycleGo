import { Container, Paper, Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "../../../components/Navbar";
import Map from "./MapComponent";

export default function CyclingType({ option }) {
  const { origin, destination } = option;
  // Define the waypoints

  return (
    <>
      <Navbar backPage="/cyclingRoutes" title="Cycling Routes" />
      <Container>
        <Map origin={origin} destination={destination} />

        <Paper sx={{ marginTop: 5, padding: 2, height: 80, marginBottom: 8 }} elevation={5}>
          <Typography variant="subtitle1">
            From {option.origin} to <br /> {option.destination}{" "}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
