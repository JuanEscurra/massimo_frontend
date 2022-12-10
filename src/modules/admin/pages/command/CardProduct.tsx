import { Fragment, useRef, useState } from "react"

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"

import Product from "shared/models/Product"

interface Props {
  product: Product,
  addItem: Function
}

export const CardProduct = ({product, addItem}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>();

  const addCommandDetail = () => {
    const quantityProduct = input.current?.valueAsNumber;
    if(quantityProduct) {
      addItem(product, quantityProduct);
      setOpen(false);
    }
  }

  return (
    <Fragment>
      <Card sx={{ width: 'max(25%, 350px)', boxShadow: '2px 2px 10px -5px' }}>
        <CardMedia component='img' height='180' image={product.url} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>{product.name}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary' onClick={() => setOpen(true)}>
              Agregar
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cantidad de productos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Cuantos productos de "{product.name}" deseas agregar a la comanda?
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
          <Button onClick={addCommandDetail}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}