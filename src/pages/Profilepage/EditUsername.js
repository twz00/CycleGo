import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import { Button, Stack, TextField, Typography, Container } from "@mui/material";
import { setDoc, doc } from "firebase/firestore";

export default function EditUsername() {
  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [flag, setFlag] = useState(false)
  const [userName, setUsername] = useState()
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
      username: userName
    });
    setFlag(true)
  }

  return (
    <>
    <Navbar backPage="/profile" title="Edit Username" />
      <Container>
        <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
          <Typography variant="h7">Enter your new username:</Typography>
          <TextField
            size="small"
            onChange={(e)=> setUsername(e.target.value)}
            variant="outlined"
          />
          <Button onClick={handleSubmit} variant="contained">
            Change Username
          </Button>
        </Stack>
        {flag && <Typography variant="subtitle1" textAlign="center" color="green" sx={{marginTop: 1}}>Successfully changed your name to {userName}!</Typography>}
      
      </Container>
    </>
  )
}
