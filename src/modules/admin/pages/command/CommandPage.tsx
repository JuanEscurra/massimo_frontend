import { Fragment, useEffect, useRef, useState } from "react"

import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteCommand, getAllCommands, saveCommand } from "modules/admin/services/CommandService";
import { Command, CommandStatus } from "shared/models/Command";
import Page from "shared/models/page";
import { DeleteAlert, Toast } from "shared/utilities/Alerts";



export const CommandPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<Page<Command>>();
  const input = useRef<HTMLInputElement>();


  const createCommand = () => {
    const tableNumber = input.current?.valueAsNumber;
    if (tableNumber) {
      console.log(tableNumber);
      saveCommand({ tableNumber, status: CommandStatus.POR_ATENDER })
        .then((response) => {
          console.log(response);
          setOpen(false);
          navigate(`/admin/commands/${response.id}`);
        });
    }
  }

  const getData = () => {
    getAllCommands()
      .then(data => setPage(data))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    getData();
  }, [])

  const deleteById = (id: number): void => {
    DeleteAlert.fire({
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommand(id)
          .then(() => {
            getData();
            Toast.fire({
              icon: 'success',
              title: 'Se ha eliminado correctamente'
            })
          }).catch(({ details }) => Toast.fire({ icon: 'error', title: details }))
      }
    })
  }

  return (
    <Fragment>
      <Typography variant="h3" align="center">
        Gestionar comandas
      </Typography>
      <Box margin="30px 0">
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)} >
          Agregar comanda
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Agregar una nueva comanda</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿En qué número de mesa está el cliente?
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
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={createCommand}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <TableContainer style={{ margin: "50px auto", width: 'min(450px,100%)' }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell align='center'>Numero de mesa</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              page?.content.map((command, index) => (
                <TableRow key={`command-${index}-${command.id}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align='center'>{command.tableNumber}</TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton aria-label="Eliminar" size="large" component={Link} to={`${command.id}`}>
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Eliminar">
                      <IconButton aria-label="Eliminar" size="large" onClick={() => command.id && deleteById(command.id)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </TableContainer>


    </Fragment>
  )
}
