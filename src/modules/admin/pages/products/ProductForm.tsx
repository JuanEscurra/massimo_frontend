import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { getCategories, saveProduct } from 'modules/admin/services/ProductService';
import React, { Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Product, { Category } from 'shared/models/Product';
import { Toast } from 'shared/utilities/Alerts';
import { defaultValues } from 'shared/validation/product';


const ProductForm = () => {

  const [image, setImage] = useState<File>();
  const [categories, setCategories] = useState<Category[]>([]);

  const { idProduct } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<Product>({ defaultValues });
  

  useEffect(() => {
    getCategories()
      .then(data => {
        console.log(data)
        setCategories(data);
      })
  }, []);


  const onSubmit = (data: Product) => {
    console.log('image', image)
    if(image) {
      saveProduct(data, image)
        .then((newProduct) => {
          Toast.fire({'icon': 'success', 'title': `Se ha guardado el producto ${newProduct?.name}`});
          navigate("/admin/products");
        })

    }
  }


  const onSubmitFile = async () => {
    const inputFile = document.getElementById("fileInput") as HTMLInputElement;
    
    setImage(inputFile.files?.item(0) as File)

  };


  return (
    <Fragment>
      <Typography align='center' variant='h3'>Formulario de producto</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{display: 'flex', flexWrap: 'wrap', gap: '40px', margin: '0 auto'}}
        autoComplete='off'>
        <Box style={{display: 'flex', flexDirection: 'column',  gap: '20px', margin: '0 auto', width: 'max(60%, 350px)'}}>
          <Controller
            name='name'
            control={control}
            render={
              ({ field }) => <TextField
              size='small'
              label='Nombre'
              variant='outlined'
              type="text"
              {...field}
              />
            }
          />
          <Controller
            name='price'
            control={control}
            render={
              ({field}) => <TextField
                size='small'
                label='Precio'
                variant='outlined'
                type="number"
                {...field}
              />
            }
          />
          <Controller
            name='stock'
            control={control}
            render={
              ({field}) => <TextField
                size='small'
                label='Stock'
                variant='outlined'
                type="number"
                {...field}
              />
            }
          />
          <TextField
            size='small'
            label='Imagen'
            variant='outlined'
            type='file'
            id='fileInput'
            onChange={onSubmitFile}
          />

          <Controller
            name='category.id'
            control={control}
            render={
              ({field}) => 
              <TextField
                select
                size='small'
                label='Categoría'
                variant='outlined'
                {...field}
              >
                <MenuItem value='0'>-- Seleccionar --</MenuItem>
                {
                  categories.map(category => (
                    <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>
                  ))
                }
              </TextField>
            } 
          />
          <Button variant='contained' fullWidth size='medium' type='submit'>Editar usuario</Button>
          <Button variant="text" fullWidth component={Link} to='../'>regresar</Button>
        </Box>
      </form>
    </Fragment>
  )
}

export default ProductForm