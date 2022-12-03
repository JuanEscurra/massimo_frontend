import { Fragment } from 'react';

import { Box, Button, TableCellProps, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { ProductList } from './ProductList';

interface Props {
}

const ProductPage = ({} : Props) => {
  return (
    <Fragment>
      <Typography variant="h3" align="center">
				Productos registrados
			</Typography>
      <Box margin="30px 0">
        <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="./add"  >
          Agregar producto
        </Button>
      </Box>
        <ProductList />
    </Fragment>
  )
}


export default ProductPage;