import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Loginpage/Loginpage";
import Registerpage from "./pages/Registerpage/Registerpage";
import Landingpage from "./pages/Landingpage/Landingpage";
import { Route, Routes } from "react-router-dom";
import Googlemap from "./pages/Landingpage/BicyclePark/Googlemap";
import Weather from "./pages/Landingpage/Weather/Weather";
import CyclingRoutes from "./pages/Landingpage/CyclingRoutes/CyclingRoutes";
import CyclingType from "./pages/Landingpage/CyclingRoutes/CyclingType";
import Profilepage from "./pages/Profilepage/Profilepage";
import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import FitnessPage from "./pages/Landingpage/FitnessProgress/FitnessPage";
import ViewCurrentProgress from "./pages/Landingpage/FitnessProgress/components/ViewCurrentProgress";
import Setgoals from "./pages/Landingpage/FitnessProgress/components/Setgoals";
import ViewGoalProgress from "./pages/Landingpage/FitnessProgress/components/ViewGoalProgress";
import { getAuth } from "firebase/auth";
import EditUsername from "./pages/Profilepage/EditUsername";
import EditPassword from "./pages/Profilepage/EditPassword";
import EditAge from "./pages/Profilepage/EditAge";
import EditHeight from "./pages/Profilepage/EditHeight";
import EditWeight from "./pages/Profilepage/EditWeight";
function App() {
  const [userID, setUserID] = useState();
  
  // North Region
  const northOption1 = {
    destination: "Lower Seletar Reservoir Park, Singapore",
    origin: "Sembawang Park, Singapore",
    travelMode: "BICYCLING",
  };

  // East Region
  const eastOption1 = {
    origin: "East Coast Park, Singapore",
    destination: "Bedok Reservoir Park, Singapore",
    travelMode: "BICYCLING",
  };


  // West Region
  const westOption1 = {
    origin: "West Coast Park, Singapore",
    destination: "Kent Ridge Park, Singapore",
    travelMode: "BICYCLING",
  };


  // South Region
  const southOption1 = {
    origin: "Mount Faber Park, Singapore",
    destination: "Haw Par Villa, Singapore",
    travelMode: "BICYCLING",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336', // Change the default color for primary buttons to green
      },

      
    
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ setUserID, userID }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/editUsername" element={<EditUsername />} />
          <Route path="/editPassword" element={<EditPassword />} />
          <Route path="/editAge" element={<EditAge />} />
          <Route path="/editHeight" element={<EditHeight />} />
          <Route path="/editWeight" element={<EditWeight />} />

          <Route path="/Landingpage" element={<Landingpage />} />
          <Route path="/googlemap" element={<Googlemap />} />
          <Route path="/weather" element={<Weather />} />

          
          <Route path="/cyclingRoutes" element={<CyclingRoutes />} />
          <Route path="/cyclingTypeN" element={<CyclingType option={northOption1}/>} />
          <Route path="/cyclingTypeS" element={<CyclingType option={southOption1}/>} />
          <Route path="/cyclingTypeE" element={<CyclingType option={eastOption1}/>} />
          <Route path="/cyclingTypeW" element={<CyclingType option={westOption1} />} />

          <Route path="/fitnessPage" element={<FitnessPage />} />
          <Route path="/viewProgress" element={<ViewCurrentProgress/>} />
          <Route path="/setGoals" element={<Setgoals/>} />
          <Route path="/viewGoalProgress" element={<ViewGoalProgress/>} />


        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
