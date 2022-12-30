import {useState} from 'react';

import {Outlet} from 'react-router-dom';
import {Box, Fab, Paper} from '@mui/material';

import {Drawer} from '../components/Drawer';
import {Toolbar} from '../components/Toolbar';
import ScrollTop from 'shared/components/scrollTop/ScrollTop';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiAppBar from "@mui/material/AppBar";

const AdminPage = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box sx={{flexGrow: 1, minHeight: "92vh", padding: "20px"}} bgcolor="#E2E2E2">
      <MuiAppBar position="fixed" sx={{width: {
        sm: 'calc(100% - 250px)',
          xs: '100%'
        }}} >
        <Toolbar setIsOpen={setIsOpen}/>
      </MuiAppBar>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Box component="main" id="main-admin" sx={{ flexGrow: 1, width: { sm: `calc(100% - 250px)` }, margin: '70px 0 0 auto' }}>
        <Paper elevation={2} style={{padding: "30px"}}>
          <Outlet/>
        </Paper>
        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon/>
          </Fab>
        </ScrollTop>
      </Box>
    </Box>
  )
}

export default AdminPage;