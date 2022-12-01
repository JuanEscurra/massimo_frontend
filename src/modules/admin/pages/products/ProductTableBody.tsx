import React from 'react';

import { Link } from 'react-router-dom';
import { Avatar, Chip, IconButton, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Product from 'shared/models/Product';
import { DeleteAlert, Toast } from 'shared/utilities/Alerts';
import { deleteProduct } from 'modules/admin/services/ProductService';

interface Props {
  products: Array<Product>,
  pageNumber: number,
  rowsPerPage: number,
  getData: Function
}

const ProductTableBody = ({products, pageNumber, rowsPerPage, getData}: Props) => {

  const deleteById = (id: number): void => {
    DeleteAlert.fire({
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed) {
        deleteProduct(id)
          .then(isDeleted => {
            getData();
            Toast.fire({
              icon: 'success',
              title: 'Se ha eliminado correctamente'
            })
          }).catch(({details}) => Toast.fire({icon: 'error', title: details}))
      }
    })
  }

  return (
    <TableBody>
      {
        products.map((product, index) => (
          <TableRow key={product.id + product.name}>
            <TableCell>{index + 1 + (pageNumber * rowsPerPage)}</TableCell>
            <TableCell>
              <Avatar variant="square">
                <img src={product.url} alt={product.name} loading="lazy" style={{objectFit: 'cover', maxWidth: '100%', }} />
              </Avatar>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell align='right'>{product.stock}</TableCell>
            <TableCell align='right'>{product.price.toFixed(2)}</TableCell>
            <TableCell align='center'>
              <Chip
                  label={product.category?.name || "NO CATEGORIZADO"}
                  variant="outlined"
                  color="info"
                  sx={{ width: "130px" }}
                />
            </TableCell>
            <TableCell align='center'>
              <Tooltip title="editar">
                <IconButton aria-label="editar" size="large" component={Link} to={`${product.id}`}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="eliminar" onClick={() => product.id && deleteById(product.id)}>
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

export default ProductTableBody;