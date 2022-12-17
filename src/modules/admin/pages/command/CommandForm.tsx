import { Fragment, useEffect, useState } from "react"

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { getProductsByName } from "modules/admin/services/ProductService";
import Page from "shared/models/page";
import Product from "shared/models/Product";
import { CardProduct } from "./CardProduct";
import { Toast } from "shared/utilities/Alerts";
import { Link, useParams } from "react-router-dom";
import { deleteCommandDetail, getCommandById, saveCommandDetail } from "modules/admin/services/CommandService";
import { Command, CommandStatus } from "shared/models/Command";
import { ItemRow } from "./ItemRow";


const initCommand = {
  details: [],
  status: CommandStatus.POR_ATENDER
}

export const CommandForm = () => {

  const [ command, setCommand ] = useState<Command>(initCommand);
  const { idCommand } = useParams();
  const [page, setPage] = useState<Page<Product>>();

  useEffect(() => {
    getProductsByName(0, 20, '')
      .then(data => setPage(data))
      .catch((error) => console.log(error));

    if(!isNaN(Number(idCommand))) {
      getCommandById(Number(idCommand))
        .then(data => {
          setCommand(data);
        })
        .catch(e => console.log(e));
    }
  }, []);


  const addItem = (product: Product, quantity: number) => {
    const currentItems = command.details ?  [...command.details] : [];
    console.log({product, quantity, command});
    if(!currentItems.some(item => item.product && item.product.id === product.id)) {
      saveCommandDetail({product, quantity, command})
        .then(newCommandDetail => {
          currentItems.push({product, quantity, id: newCommandDetail.id});
          const newCommand = {
              ...command,
              details: currentItems
          };
          setCommand(newCommand);
        }).catch(e => console.log(e));
    } else {
      Toast.fire({ title: 'El elemento ya se seleccione anteriormente', icon: 'warning'})
    }
  }

  const deleteItem = (id: number | undefined) => {
    if(id) {
      deleteCommandDetail(id)
        .then(() => {
          let currentItems = command.details ?  [...command.details] : [];
          currentItems = currentItems.filter(item => item.id && item.id != id);
          const newCommand = {
            ...command,

            details: currentItems
          };
          setCommand(newCommand);
        }).catch(e => console.log(e));
    }
  }

  const registerCommand = () => {
    console.log('registrar comanda');
  }

  return (
    <Fragment>
      <Typography align='center' variant='h3'>Formulario de comanda</Typography>
      <Box style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button variant="outlined" component={Link} to='../'>
          Regresar
        </Button>
        <Button variant='contained' startIcon={<NavigateNextIcon />} onClick={registerCommand}>
          Finalizar pedido  
        </Button>
      </Box>
      {
        command &&
        <TableContainer style={{width: 'min(450px, 100%)', margin: '30px auto'}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align='center'>Cantidad</TableCell>
              <TableCell width='90px'>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              command.details && command?.details.map(item => (
                <ItemRow detail={item} deleteItem={deleteItem} key={'commandDetail-' + item.id} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      }

      <Box style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap'}}>
        {
          page?.content &&
          
          page.content.map(product => (
            <CardProduct key={product.id} product={product} addItem={addItem} />
          ))
        }
      </Box>
    </Fragment>
  )
}