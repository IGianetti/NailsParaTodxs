import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Typography variant="h6" className="title">
          Mi Empresa
        </Typography>
        <div className="navButtonsContainer">
          <Button component={Link} to="/" className="navButton">
            Inicio
          </Button>
          <Button component={Link} to="/servicios" className="navButton">
            Servicios
          </Button>
          <Button component={Link} to="/turnos" className="navButton">
            Turnos
          </Button>
        </div>
        <div className="menuButtonContainer">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              Inicio
            </MenuItem>
            <MenuItem
              component={Link}
              to="/servicios"
              onClick={handleMenuClose}
            >
              Servicios
            </MenuItem>
            <MenuItem component={Link} to="/turnos" onClick={handleMenuClose}>
              Turnos
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
