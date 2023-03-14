import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { Container, TextField, Typography, Button, Stack } from "@mui/material";
import {
  getAuth,
  updatePassword,
} from 'firebase/auth';

import { auth } from "../../firebase";
export default function EditPassword() {

  const [flag, setFlag] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccess] = useState()
  const handleSubmit =  (event) => {
    event.preventDefault();
    updatePassword(auth.currentUser, newPassword).then( ()=> {
      setFlag(true)
      setErrorMessage("")
    }).catch((error)=> {
      const errorCode = error.code;
      let errorMessage = error.message; 

      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email address is already in use.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
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
          errorMessage = 'Please fill up all details';
          break;
      }
      setErrorMessage(errorMessage)
    })
  };

  return (
    <>
     <Navbar backPage="/profile" title="Edit Password" />
      <Container>
        <Stack sx={{ paddingTop: 2 }} direction="column" spacing={1}>
          <Typography variant="h7">Enter your new password:</Typography>
          <TextField
          type="password"
            size="small"
            value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
            variant="outlined"
          />

          <Button onClick={handleSubmit} variant="contained">
            Update Password
          </Button>
        </Stack>
       
        {flag && <Typography variant="subtitle1" textAlign="center" color="green" sx={{ marginTop: 1 }}>Successfully changed your password!</Typography>}
        {errorMessage && <Typography sx={{ paddingTop: 1 }} textAlign="center" variant="subtitle2" color="red">{errorMessage}</Typography>
        }
      </Container>
      </>
    
  )
}
