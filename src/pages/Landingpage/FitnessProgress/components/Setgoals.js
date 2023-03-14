import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../contexts/userContext";
import Navbar from "../../../../components/Navbar";
import { db } from "../../../../firebase";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { Container, TextField, Typography, Button, Stack } from "@mui/material";
export default function Setgoals() {
  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [distance, setDistance] = useState("");
  const [calories, setCalories] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Copy paste this template to get USERID //
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      await getDocs(collection(db, "users")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Newdata is ");
        console.log(newData);
        if (newData !== null) {
          const result = newData.filter((user) => user.userID === userID);
          setUserData(result);
        }
      });
    };
    fetchUser();
    console.log("use effect ran!");
  }, [flag]);
  console.log(userData);

  const handleDistanceChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setDistance(e.target.value);
    }else{
      setErrorMessage("Please input an integer.")
    }
  };

  const handleCaloriesChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCalories(e.target.value);
    }else{
      setErrorMessage("Please input an integer.")
    }
  };


  const handleSubmit = () => {
    console.log("Clicked submited!");
    setDoc(doc(db, "users", userData[0].userID), {
      ...userData[0],
      distance: distance,
      calories: calories,
    });
    setFlag(true);
    setErrorMessage();
  };

  return (
    <>
      <Navbar backPage="/fitnessPage" title="SET GOALS" />
      <Container>
        <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
          <Typography variant="h7">Enter your target distance:</Typography>
          <TextField
            size="small"
            onChange={handleDistanceChange}
            label="Distance"
            variant="outlined"
            value={distance}
          />
          <Typography variant="h7">
            Enter your target amount of calories to burn:
          </Typography>
          <TextField
            size="small"
            onChange={handleCaloriesChange}
            label="Calories"
            variant="outlined"
            value={calories}
          />
          <Button onClick={handleSubmit} variant="contained">
            ENTER
          </Button>
        </Stack>
        {flag && (
          <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
            <Typography variant="subtitle1" textAlign="center">
              You wish to cycle {distance}km! Keep it up, you can do it!
            </Typography>
          </Stack>
        )}
        <Typography sx={{paddingTop: 1}} textAlign="center" variant="subtitle2" color="red">{errorMessage}</Typography>
      </Container>
    </>
  );
}
