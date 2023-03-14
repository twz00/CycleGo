import { Container, Stack } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {auth} from "../firebase"
export default function Navbar({ title, profile, backPage }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully');
        navigate("/")
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const handleProfile = () => {
    navigate("/profile")
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 2, textAlign: "center", borderBottom: 1, borderColor: "grey.400" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing="2"
        direction={"row"}
      >
        {backPage && (
          <ArrowBackIcon fontSize="large"
            onClick={() => navigate(backPage)}
            sx={{ paddingRight: 2 }}
          />
        )}
        <Typography variant="h4">{title}</Typography>
        {profile && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
            </Menu>
          </div>
        )}
      </Stack>
    </Container>
  );
}
