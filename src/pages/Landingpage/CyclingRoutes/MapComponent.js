import React, { useRef, useEffect } from 'react';

function Map({origin, destination, waypoints}) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create the map instance
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: 1.342792,
        lng: 103.682346,
      },
      zoom: 13,
    });

    // Create the DirectionsService object
    const directionsService = new window.google.maps.DirectionsService();

    // // Define the origin and destination locations
    // const origin = 'Yishun Park, Singapore';
    // const destination = 'Sembawang Park, Singapore';

 
    // Create the DirectionsRequest object
    const directionsRequest = {
      origin,
      destination,
      waypoints,
      optimizeWaypoints: true, // Optional, to optimize the order of the waypoints
      travelMode: window.google.maps.TravelMode.BICYCLING,
    };

    // Call the DirectionsService to calculate the route
    directionsService.route(directionsRequest, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        // Display the route on the map
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map);
      } else {
        console.error(`Directions request failed due to ${status}`);
      }
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}

export default Map;