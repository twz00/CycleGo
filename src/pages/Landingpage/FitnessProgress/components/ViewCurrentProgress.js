import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/userContext";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../../../components/Navbar";
import { Button, Stack, TextField, Typography, Container, Box } from "@mui/material";
import { setDoc, doc } from "firebase/firestore";
import { KeyboardDatePicker } from '@material-ui/pickers';
export default function ViewCurrentProgress() {
  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [flag, setFlag] = useState(false)
  let calories
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
    console.log("use effect ran!")
  }, [flag]);


  const handleSubmit = () => {
    console.log("Clicked submited!");
    setDoc(doc(db, "users", userData[0].userID), {
      ...userData[0],
      startDate: startDate,
      endDate: endDate,
    });
    setFlag(true)
  }

  return (
    <>
      <Navbar title="MY FITNESS" backPage="/fitnessPage" />
      <Container>
        <Stack direction="column" spacing={1}>
          <Typography variant="h6">Start Date:</Typography>
          <TextField
            size="small"
            onChange={(e) => setStartDate(e.target.value)}
            variant="outlined"
            type="date"
          />
          <Typography variant="h6">End Date:</Typography>
          <TextField
            size="small"
            onChange={(e) => setEndDate(e.target.value)}
            variant="outlined"
            type="date"
          />
          <Button onClick={handleSubmit} variant="contained">
            ENTER
          </Button>
        </Stack>
        <Stack sx={{ marginTop: 2 }}>
          {userData && (
            <Typography textAlign="center" variant="subtitle1">Age: {userData[0]?.age}</Typography>
          )}
          {userData && (
            <Typography textAlign="center" variant="subtitle1">Height: {userData[0]?.height}</Typography>
          )}
          {userData && (
            <Typography textAlign="center" variant="subtitle1">Weight: {userData[0]?.weight}</Typography>
          )}
          {userData && (
            <>
              <Typography textAlign="center" variant="subtitle1">Start Date: {userData[0]?.startDate}</Typography>
              <Typography textAlign="center" variant="subtitle1">End Date: {userData[0]?.endDate}</Typography>

            </>
          )}
          {userData && userData[0]?.currDistance && <Box boxShadow={2}
            borderRadius={2} sx={{ border: 1, marginTop: 2, padding: 2 }}>
            {
              userData && <Typography textAlign="center" >
                Calories burnt: {
                  (parseInt(userData[0]?.currDistance) * 0.035 * parseInt(userData[0]?.weight) * parseInt(userData[0]?.height)).toFixed(1)
                } / {userData[0]?.calories}
              </Typography>

            }
            {
              userData && <Typography textAlign="center" >Distance Cycled: {userData[0]?.currDistance}km / {userData[0]?.distance}km</Typography>
            }
          </Box>
          }
        </Stack>
      </Container>
    </>
  );
}
