import { Fragment, useRef, useState } from "react"

import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { saveCommand } from "modules/admin/services/CommandService";
import { CommandStatus } from "shared/models/Command";


export const CommandPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>();

  const createCommand = () => {
    const tableNumber = input.current?.valueAsNumber;
    if(tableNumber) {
      console.log(tableNumber);
      saveCommand({tableNumber, status: CommandStatus.POR_ATENDER})
        .then((response) =>  {
          console.log(response);
          setOpen(false);
          navigate(`/admin/commands/${response.id}`);
        });
    }
  }

  return (
    <Fragment>
      <Typography variant="h3" align="center">
				Gestionar comandas
			</Typography>
      {
        /*
        <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </TableContainer>
        */
      }
      <Box margin="30px 0">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)} >
          Agregar comanda
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              inputRef={input}
              autoFocus
              margin="dense"
              id="tableNumber"
              label="Numero de mesa"
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={createCommand}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </Box>

    </Fragment>
  )
}
