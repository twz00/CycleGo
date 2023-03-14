import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import { Button, Stack, TextField, Typography, Container } from "@mui/material";
import { setDoc, doc } from "firebase/firestore";

export default function EditAge() {
  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [flag, setFlag] = useState(false)
  const [age, setAge] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const handleChange = (e) => {

    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAge(e.target.value);
    } else {
      setErrorMessage("Please input an integer.")
    }
  }


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

  const handleSubmit = () => {
    console.log("Clicked submited!");
    setDoc(doc(db, "users", userData[0].userID), {
      ...userData[0],
      age: age
    });
    setFlag(true)
    setErrorMessage()
  }


  return (
    <>

      <Navbar backPage="/profile" title="Edit Age" />
      <Container>
        <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
          <Typography variant="h7">Enter your new Age:</Typography>
          <TextField
            size="small"
            onChange={handleChange}
            variant="outlined"
            value={age}
          />
          <Button onClick={handleSubmit} variant="contained">
            Change Age
          </Button>
        </Stack>
        {flag && <Typography variant="subtitle1" textAlign="center" color="green" sx={{ marginTop: 1 }}>Successfully changed your age to {age}!</Typography>}
        {errorMessage && <Typography sx={{ paddingTop: 1 }} textAlign="center" variant="subtitle2" color="red">{errorMessage}</Typography>
        }

      </Container>
    </>
  )
}
