import { Stack, Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function FitnessPage() {
  const navigate = useNavigate();
  const styleBox = {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    border: "1px solid black",
    textAlign: "center",
  };
  return (
    <>
      <Navbar backPage="/landingPage" title="MY FITNESS" />
      <Stack>
        <Box

          boxShadow={2}
          borderRadius={2}
          textAlign="center"
          onClick={() => navigate("/viewProgress")}
          sx={styleBox}
        >
          <Typography variant="subtitle1">View Current Progress</Typography>
        </Box>
        <Box
          boxShadow={2}
          borderRadius={2}
          textAlign="center"
          onClick={() => navigate("/setGoals")}
          sx={styleBox}
        >
          <Typography variant="subtitle1">Set Goals</Typography>
        </Box>
        <Box
          boxShadow={2}
          borderRadius={2}

          textAlign="center"
          onClick={() => navigate("/viewGoalProgress")}
          sx={styleBox}
        >
          <Typography variant="subtitle1">Track Goal Progress</Typography>
        </Box>
      </Stack>
    </>
  );
}
