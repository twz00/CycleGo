import React, {useState, useContext} from "react";
import { Container, TextField, Typography, Stack, Button } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from "../../firebase";
import { setDoc, doc } from 'firebase/firestore'
import { UserContext } from "../../contexts/userContext"
import Navbar from "../../components/Navbar";

export default function Registerpage() {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  const { setUserID } = useContext(UserContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();

    const handleAge = (e) => {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setAge(e.target.value);
      }else{
        setErrorMessage("Please input only integers")
      }
    };

    const handleWeight = (e) => {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setWeight(e.target.value);
      }else{
        setErrorMessage("Please input only integers")
      }
    };

    const handleHeight = (e) => {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setHeight(e.target.value);
      }else{
        setErrorMessage("Please input only integers")
      }
    };

    const onSubmit = async (e) => {
      console.log(email, password)
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            setUserID(userCredential.user.uid)

            // Create a database of user
            // Creates a user in the users database and set the document name as the unique user id
            setDoc(doc(db, "users", userCredential.user.uid), {
              email: email,
              userID: userCredential.user.uid,
              username: username,
              age: age,
              height: height,
              weight: weight
            })
            
            navigate("/landingPage")
            // ...
        })
        .catch((error) => {
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
            // ..
        });
      
    }

  
  return (
    <Container>
      <Navbar backPage="/" title="Register Page"/>
      <Stack
        sx={{paddingTop: 2}}
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
   
      >
  
        <DirectionsBikeIcon fontSize="large" />
        <TextField onChange={(e) => setEmail(e.target.value)}  label="Email" variant="standard" />
        <TextField onChange={(e) => setUsername(e.target.value)} label="Username" variant="standard" />
        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password"  variant="standard" />
        <TextField onChange={handleAge} value={age} type="number" label="Age" variant="standard" />
        <TextField onChange={handleHeight} value={height} type="number" label="Height" variant="standard" />
        <TextField onChange={handleWeight} value={weight} type="number" label="Weight" variant="standard" />
        <Button variant="contained" onClick={onSubmit}>Register</Button>
        <Typography variant="subtitle2" color="red">{errorMessage}</Typography>
      </Stack>
    </Container>
  );
}
