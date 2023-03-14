import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { Container, TextField, Typography, Button, Stack } from "@mui/material";
export default function EditWeight() {

  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [flag, setFlag] = useState(false)
  const [weight, setWeight] = useState()
  const [errorMessage, setErrorMessage] = useState()


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

  const handleChange = (e) => {

    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setWeight(e.target.value);
    } else {
      setErrorMessage("Please input an integer.")
    }
  }

  const handleSubmit = () => {
    console.log("Clicked submited!");
    setDoc(doc(db, "users", userData[0].userID), {
      ...userData[0],
      weight: weight
    });
    setFlag(true)
    setErrorMessage()
  }

  return (
    <>
    
    <Navbar backPage="/profile" title="Edit Weight" />
      <Container>
        <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
          <Typography variant="h7">Enter your new Weight:</Typography>
          <TextField
            size="small"
            onChange={handleChange}
            variant="outlined"
          />
          <Button onClick={handleSubmit} variant="contained">
            Change Weight
          </Button>
        </Stack>
       
        {flag && <Typography variant="subtitle1" textAlign="center" color="green" sx={{ marginTop: 1 }}>Successfully changed your weight to {weight}cm!</Typography>}
        {errorMessage && <Typography sx={{ paddingTop: 1 }} textAlign="center" variant="subtitle2" color="red">{errorMessage}</Typography>
        }
      </Container>
      </>
  )
}
