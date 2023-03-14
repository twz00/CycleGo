import React, { useState, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { Container, Typography, Stack, Paper, Box } from "@mui/material";
import Navbar from "../../../components/Navbar";
import LocationMarker from "./LocationMarker";
import bikeParks from "../../../data/bikePark";
export default function Googlemap() {
  const [bike, setBike] = useState("")

  const [center, setCenter] = useState({
    lat: 1.342792,
    lng: 103.682346,
  });

  const defaultProps = {
    center: {
      lat: 1.342792,
      lng: 103.682346,
    },
    zoom: 15,
  };
  return (
    <>
      <Navbar backPage="/landingPage" title="Park Availability" />
      <Container  style={{ paddingTop: 20, height: "60vh", width: "100%"}}>
        <Typography sx={{ paddingBottom: 5 }} variant="subtitle1">
          View the available park in your area by clicking on a marker below!
        </Typography>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCMdI-47o1C6dIqTMY-SVhqnWlgsYwfVDA",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              center={center}
            >
              {bikeParks.map((bikePark) => (
                <LocationMarker onClick={()=> setBike(bikePark)} lat={bikePark.lat} lng={bikePark.lng} />
              ))}
            </GoogleMapReact>
          <Paper sx={{ marginTop: 2, padding: 2, height: 150, marginBottom: 10}} elevation={5}>
            <Typography variant="h5">{bike.name}</Typography>
            <Typography variant="subtitle1">
              {bike.description}
            </Typography>
          </Paper>
       </Container>
    </>
  );
}
