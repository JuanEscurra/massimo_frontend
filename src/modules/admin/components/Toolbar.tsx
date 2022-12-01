import { useState } from "react";

import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar as ToolbarMUI, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import avatar from "assets/img/avatar_min.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "modules/auth/actions/auth";


type Props = {
  setIsOpen: Function
}

export const Toolbar = ({setIsOpen}: Props) => {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <ToolbarMUI variant="dense" sx={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setIsOpen((isOpen: any) => !isOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Restaurante Baratie
        </Typography>
      </Box>
      <Box>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar alt="Remy Sharp" src={avatar} />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose} component={Link} to="/admin/profile">
            Mi perfil
          </MenuItem> */}
          <MenuItem onClick={() => {
              handleClose();
              dispatch(startLogout())
          }} >
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Box>
    </ToolbarMUI>
  );
}