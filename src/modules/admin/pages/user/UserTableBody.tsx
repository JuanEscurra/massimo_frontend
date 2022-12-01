import { Chip, IconButton, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom'

import { User } from 'shared/models/User'
import { DeleteAlert, Toast } from 'shared/utilities/Alerts';
import { deleteUser } from 'modules/admin/services/UserService';


interface Props {
  users: Array<User>,
  pageNumber: number,
  rowsPerPage: number,
  getData: Function
}

const UserTableBody = ({users, pageNumber, rowsPerPage, getData}: Props) => {

  const deleteById = (id: number): void => {
    DeleteAlert.fire({
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed) {
        deleteUser(id)
          .then(isDeleted => {
            getData();
            Toast.fire({
              icon: 'success',
              title: 'Se ha eliminado correctamente'
            })
          }).catch(() => Toast.fire({icon: 'error', title: 'Ha ocurrido un error al eliminar el usuario'}))
      }
    })
  }

  return (
    <TableBody>
      {
        users &&
        users.map((user, index) => (
          <TableRow key={user?.id + "-" + user?.name}>
            <TableCell>{index + 1 + (pageNumber * rowsPerPage)}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.surname}</TableCell>
            <TableCell>{user.dni}</TableCell>
            <TableCell style={{maxWidth: '200px'}}>{user.email}</TableCell>
            <TableCell align='center'>
              <Chip label={user.enabled ? 'ACTIVO' : 'INACTIVO'}
                color={user.enabled ? 'success' : 'error'}
                sx={{marginX: '10px'}}
                size='medium'/>
            </TableCell>
            <TableCell align='center'>
              <Tooltip title="editar">
                <IconButton aria-label="delete" size="large" component={Link} to={`${user.id}`}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="eliminar" onClick={() => user.id && deleteById(user.id)}>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  )
}

export default UserTableBody