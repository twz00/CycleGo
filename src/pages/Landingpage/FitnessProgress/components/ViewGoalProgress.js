import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/userContext";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../../../components/Navbar";
import { Button, Stack, TextField, Typography, Container } from "@mui/material";
import { setDoc, doc } from "firebase/firestore";
export default function ViewGoalProgress() {

  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [currDistance, setCurrDistance] = useState();
  const [flag, setFlag] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
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
  }, [flag]);


  const handleDistance = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCurrDistance(e.target.value);
    }else{
      setErrorMessage("Please input only integer")
    }
  };

  const handleSubmit = () => {
    console.log("Clicked submited!");
    // Get the current distance -> convert it to integer and add it with currDistance
    // Then store it 

    let prevDistance = parseInt(userData[0].currDistance)
    if (isNaN(prevDistance)) {
      prevDistance = 0
    }

    console.log("prevdistance is " + prevDistance)
    console.log("curr distance is " + currDistance)
    setDoc(doc(db, "users", userData[0].userID), {
      ...userData[0],
      currDistance: parseInt(currDistance) + prevDistance,
    });
    setFlag(true)
  }
  console.log(userData)
  return (
    <>
      <Navbar backPage="/fitnessPage" title="Set Goal Progress" />
      <Container>
        <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
          <Typography variant="h7">Enter your trip distance:</Typography>
          <TextField
            size="small"
            onChange={handleDistance}
            label="Distance"
            variant="outlined"
            value={currDistance}
          />

          <Button onClick={handleSubmit} variant="contained">
            ENTER
          </Button>
          {flag &&
            <Typography variant="subtitle1">Successfully added into the database!</Typography>
          }
          <Typography sx={{ paddingTop: 1 }} textAlign="center" variant="subtitle2" color="red">{errorMessage}</Typography>

        </Stack>
      </Container>
    </>

  )
}
