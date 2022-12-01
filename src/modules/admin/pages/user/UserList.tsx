import { useEffect, useState } from "react";

import {
  Button,
  Table,
	TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { getUsers, getUsersByName } from "modules/admin/services/UserService";
import useTable from "shared/hooks/useTable";
import UserTableBody from "./UserTableBody";
import Page from "shared/models/page";
import { User } from "shared/models/User";
import { Toast } from "shared/utilities/Alerts";
import { useForm } from "react-hook-form";

interface Props {
  content: Array<User>
}

const theadCells: TableCellProps[] = [
  {
    children: '#'
  },
  {
    children: 'Nombres'
  },
  {
    children: 'Apellidos'
  },
  {
    children: 'DNI'
  },
  {
    children: 'Email'
  },
  {
    align: "center",
    children: "Estado"
  },
  {
    align: "center",
    children: "Acciones",
  }
];

const UserList = () => {

  const [page, setPage] = useState<Page<User> | undefined>(undefined);
  const {
    pageNumber,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  } = useTable({numberPageInit: 0, rowsPerPageInit: 20});

  const {register, handleSubmit} = useForm();

  useEffect(() => {
    getData();
  }, [pageNumber, rowsPerPage]);


  const getData = () => {
    getUsers(pageNumber, rowsPerPage)
      .then(page => setPage(page))
      .catch(() => Toast.fire({icon: 'error', title: 'Ha ocurrido un error al solicitar los usuarios'}))
  }

  const searchByName = (data: any) => {
    getUsersByName(pageNumber, rowsPerPage, data.name)
      .then(pageUsers => setPage(pageUsers));
  }

  if(!page) return <Typography mt={2} variant="subtitle1">No se ha encontrado datos</Typography>


  return (
    <>
      <form onSubmit={handleSubmit(searchByName)}
        style={{display: 'flex', gap: '15px', justifyContent: 'end'}} >
        <TextField label='nombre' size="small" {...register("name")} style={{width: '15rem'}} />
        <Button type="submit" variant="contained">Buscar</Button>
      </form>
      <TablePagination
        component="div"
        rowsPerPageOptions={[20, 30, 50]}
        count={page.totalElements}
        page={pageNumber}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        <TableContainer>
          <Table aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {theadCells.map((props, index) => (
                  <TableCell {...props} key={index} style={{maxWidth: '200px'}} align='center' />
                ))}
              </TableRow>
            </TableHead>
            <UserTableBody
              getData={getData}
              users={page.content}
              pageNumber={pageNumber}
              rowsPerPage={rowsPerPage} />
          </Table>
        </TableContainer>
      }
      <TablePagination
        component="div"
        rowsPerPageOptions={[20, 30, 50]}
        count={page.totalElements}
        page={pageNumber}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default UserList;