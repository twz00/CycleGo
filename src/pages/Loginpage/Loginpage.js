import React, {useState, useContext} from 'react'
import { Container, TextField, Typography, Stack, Button } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserContext } from "../../contexts/userContext"
import Navbar from '../../components/Navbar';
export default function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserID } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState("")
  const onLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          setUserID(userCredential.user.uid)
          navigate("/Landingpage")
      })
      .catch((error) => {
          const errorCode = error.code;
          let errorMessage = error.message;
          switch (errorCode) {
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address.';
              break;
            case 'auth/user-disabled':
              errorMessage = 'Your account has been disabled.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'User not found. Please check your email and try again.';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Incorrect password. Please try again.';
              break;
            // Add more cases as needed...
            default:
              errorMessage = 'An unknown error occurred.';
              break;
            }
            setErrorMessage(errorMessage)
      });
     
  }
  return (
    <Container>
       <Navbar backPage="/" title="Login Page"/>
      <Stack
        sx={{paddingTop: 2}}
        spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
   
      >
        <DirectionsBikeIcon fontSize="large" />
        <TextField onChange={(e) => setEmail(e.target.value)} label="Username" variant="standard" />
        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="standard" />
        <Button onClick={onLogin}variant="contained">Log in</Button>
        <Typography variant="subtitle2" color="red">{errorMessage}</Typography>
      </Stack>
    </Container>
  )
}
