import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { setDoc, doc } from "firebase/firestore";
export default function Profilepage() {
  const styleBox = {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    border: "1px solid black",
    textAlign: "center",
  };
  const navigate = useNavigate();
  const { userID } = useContext(UserContext);
  console.log(userID);
  const [userData, setUserData] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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

  const handleSubmit = () => {
    console.log("Clicked submited!");
    setDoc(doc(db, "users", userData[0].userID), {
      ...userData[0],
      startDate: startDate,
      endDate: endDate,
    });
    setFlag(true);
  };

  return (
    <>
      <Navbar title="Profile Page" backPage="/landingPage" />
      <Container>
        <Box boxShadow={2} borderRadius={2} sx={styleBox}>
          <Stack direction="column" spacing={1}>
            <Typography  onClick={() => navigate("/editUsername")} variant="h6" textAlign="center" height="100%">
              Username
            </Typography>

            <Typography onClick={() => navigate("/editPassword")} variant="h6" textAlign="center" height="100%">
              Password
            </Typography>

            <Typography  onClick={() => navigate("/editAge")} variant="h6" textAlign="center" height="100%">
              Age
            </Typography>

            <Typography  onClick={() => navigate("/editHeight")} variant="h6" textAlign="center" height="100%">
              Height
            </Typography>

            <Typography  onClick={() => navigate("/editWeight")} variant="h6"  textAlign="center" height="100%">
              Weight
            </Typography>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
