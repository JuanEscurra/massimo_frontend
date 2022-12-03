import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';

import { getCategories, getProductById, saveProduct } from 'modules/admin/services/ProductService';
import imageDefault from 'assets/img/image-default.jpg';
import Product, { Category } from 'shared/models/Product';
import { Toast } from 'shared/utilities/Alerts';
import { defaultValues } from 'shared/validation/product';


const ProductForm = () => {

  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { idProduct } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<Product>({ defaultValues });
  

  useEffect(() => {
    getCategories()
      .then(data => {
        console.log(data)
        setCategories(data);
      });
    
    if(!isNaN(Number(idProduct))) {
      console.log('idProduct: ', idProduct);
      getProductById(Number(idProduct))
        .then(product => {
          reset(product);
          setPreview(product.url);
        })
    }
    
  }, []);

  useEffect(() => {
    if(image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      }
      reader.readAsDataURL(image);
    }
  }, [image]);

  const onSubmit = (data: Product) => {
    console.log('image', image);
    setLoading(true);
    saveProduct(data, image)
      .then((newProduct) => {
        Toast.fire({'icon': 'success', 'title': `Se ha guardado el producto ${newProduct?.name}`});
        navigate("/admin/products");
      }).finally(() => {
        setLoading(false);
      });

  }

  const onSubmitFile = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return;

    const file = event.target.files[0];
    if(file) {
      setImage(file);
    } else {
      setImage(null);
    }
  }


  return (
    <Fragment>
      <Typography align='center' variant='h3'>Formulario de producto</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{display: 'flex', flexWrap: 'wrap', gap: '40px', margin: '0 auto'}}
        autoComplete='off'>
        <Paper variant='outlined' style={{width: 'min(100%, 550px)', height: '300px', display: 'flex', alignItems: 'end', justifyContent: 'center', margin: 'auto'}} >
          <img src={preview || imageDefault} alt='producto para subir' style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <Button variant='contained' component='label' style={{position: 'absolute', margin: '30px'}}>
            Subir imagen
            <input hidden accept="image/*" multiple type="file" id='fileInput' onChange={onSubmitFile}/>
          </Button>
        </Paper>
        <Box style={{display: 'flex', flexDirection: 'column',  gap: '20px', margin: '0 auto', width: 'min(100%, 550px)'}}>
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
          <LoadingButton loading={isLoading} variant='contained' fullWidth size='medium' type='submit'>
            {!isNaN(Number(idProduct)) ? 'Editar producto' : 'Guardar producto'}
          </LoadingButton>
          <LoadingButton loading variant="text" fullWidth component={Link} to='../'>
            regresar
          </LoadingButton>
        </Box>
      </form>
    </Fragment>
  )
}

export default ProductForm