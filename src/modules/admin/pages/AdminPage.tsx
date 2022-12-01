import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Box, Fab, Paper } from '@mui/material';

import { Drawer } from '../components/Drawer';
import { Toolbar } from '../components/Toolbar';
import { AppBar } from '../components/AppBar';
import { Main } from '../components/Main';
import ScrollTop from 'shared/components/scrollTop/ScrollTop';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AdminPage = () => {
  
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Box sx={{ flexGrow: 1, minHeight: "92vh", padding: "20px" }} bgcolor="#E2E2E2">
      <AppBar position="fixed" open={isOpen}>
				<Toolbar setIsOpen={setIsOpen}/>
			</AppBar>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Main open={!isOpen} id="main-admin">
    		<Paper elevation={2} style={{padding: "30px"}}>
          <Outlet />
        </Paper>
        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Main>
    </Box>
  )
}

export default AdminPage;