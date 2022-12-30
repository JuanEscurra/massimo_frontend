import {Fragment, useEffect, useRef, useState} from "react"

import {Link, useNavigate} from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import {deleteCommand, getAllCommands, saveCommand} from "modules/admin/services/CommandService";
import {Command, CommandStatus} from "shared/models/Command";
import Page from "shared/models/page";
import {DeleteAlert, Toast} from "shared/utilities/Alerts";


export const CommandPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<Page<Command>>();
  const input = useRef<HTMLInputElement>();
  const commandStatusRef = useRef<HTMLInputElement>();

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
    // Number(commandStatusRef.current?.value) as CommandStatus,
    const params: Command = {
      status: Number(commandStatusRef.current?.value) as CommandStatus,
    };
    getAllCommands(params)
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
      <Box margin="30px 0" style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px 0"}}>
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
        <Box style={{display: 'flex', gap: '15px', justifyContent: 'right', width: 'min(300px,100%)'}}>
          <FormControl style={{width: 'min(300px,100%)'}}>
            <InputLabel id="demo-simple-select-label">Estado de comanda</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={CommandStatus.POR_ATENDER}
              label="Estado de comanda"
              inputRef={commandStatusRef}
              size="small"
            >
              <MenuItem value={CommandStatus.POR_ATENDER}>Por atender</MenuItem>
              <MenuItem value={CommandStatus.ATENDIDO}>Atendido</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Buscar">
            <IconButton aria-label="Eliminar" size="medium" onClick={() => getData()}>
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
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
