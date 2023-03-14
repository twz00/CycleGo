import { Container } from "@mui/material";
import React from "react";
import ReactWeather, { useWeatherBit } from "react-open-weather";
import Navbar from "../../../components/Navbar";
export default function Weather() {
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: "590312b49d2b4f62858624260d86f55b",
    lat: "1.3521",
    lon: "103.8198",
    lang: "en",
    unit: "M", // values are (M,S,I)
  });
  console.log(data);
  return (
    <>
      <Navbar title="Rain Prediction" backPage="/landingPage" />
      <Container sx={{ paddingTop: 2}}>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Singapore"
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        />
      </Container>
    </>
  );
}
