import { Fragment, useEffect, useState } from 'react';

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { defaultValues, registerRules } from 'shared/validation/user';
import { User, Role } from 'shared/models/User';
import { getUserById, updateUser } from 'modules/admin/services/UserService';
import { Toast } from 'shared/utilities/Alerts';


const UserForm = () => {

  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<User>({ defaultValues });
  const [urlImage, setUrlImage] = useState<string | undefined>(undefined);
  const {idUser} = useParams();


  useEffect(() => {
    getUserById(Number(idUser))
      .then(data => {
        reset(data);
      })
      .catch(e => {
        Toast.fire({
          title: 'No existe el usuario requerido',
          icon: 'error'
        })
        navigate('../');
      });
  }, []);

  const onSubmit = (user: User) => {

    const userConfig = {
      roles: user.roles,
      enabled: user.enabled
    }

    if(user.id !== undefined &&
      user.enabled !== undefined &&
      user.roles !== undefined) {
        updateUser(user.id, userConfig)
          .then(user => {
            Toast.fire({'icon': 'success', 'title': `Se ha modificado el usuario ${user?.email}`});
            navigate('../');
          })
          .catch(e => console.log(e));
    }
    
  }


  /* const fileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if(event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrlImage(reader.result as string);
      }
      reader.readAsDataURL(file);
    }

  } */


  return (
    <Fragment>
      <Typography align='center' variant='h3'>Formulario de edición de usuario</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{display: 'flex', flexWrap: 'wrap', gap: '40px', margin: '0 auto'}}
        autoComplete='off'>
        
        {/* <Box style={{position: 'relative', width: 'max(35%,350px)', border: '2px dashed grey'}} >
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" type="file" onChange={fileInputChange}/>
          </Button>
          <img src={urlImage} alt="product" style={{width: '100%', height: '300px', objectFit: 'cover'}} />
        </Box> */}
        <Box style={{display: 'flex', flexDirection: 'column',  gap: '20px', margin: '0 auto', width: 'max(60%, 350px)'}}>
          <Controller
            name="email"
            control={control}
            rules={registerRules.email}
            render={
              ({ field }) => <TextField
              size='small'
              label='Correo electronico'
              variant='outlined'
              type="email"
              disabled
              {...errors?.email ? {error: true, helperText: errors?.email?.message} : null}
              {...field}
              />
            }
          />
          <Controller
            name='name'
            control={control}
            rules={registerRules.name}
            render={
              ({field}) => <TextField
                size='small'
                label='Nombres'
                variant='outlined'
                type="text"
                disabled
                {...errors?.name ? {error: true, helperText: errors?.name?.message} : null}
                {...field}
              />
            }
          />
          <Controller
            name='surname'
            control={control}
            rules={registerRules.surname}
            render={
              ({field}) => <TextField
                disabled
                size='small'
                label='Apellidos'
                variant='outlined'
                type="text"
                {...errors?.surname ? {error: true, helperText: errors?.surname?.message} : null}
                {...field}
              />
            }
          />
          <Controller
            name='dni'
            control={control}
            rules={registerRules.dni}
            render={
              ({field}) => <TextField
                disabled
                size='small'
                label='DNI'
                variant='outlined'
                type="text"
                {...errors?.dni ? {error: true, helperText: errors?.dni?.message} : null}
                {...field}
              />
            }
          />
          <Controller
            name="roles"
            control={control}
            render={
              ({field}) =>
              <FormControl>
                <InputLabel id="roles">Roles</InputLabel>
                <Select
                  {...field}
                  labelId="roles"
                  label="roles"
                  id="qweasd"
                  multiple
                >
                  <MenuItem value={Role.ADMINISTRADOR}>ADMINISTRADOR</MenuItem>
                  <MenuItem selected value={Role.RECEPCIONISTA}>RECEPCIONISTA</MenuItem>
                  <MenuItem value={Role.CAJERO}>CAJERO</MenuItem>
                  <MenuItem value={Role.INVITADO}>INVITADO</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <Controller
            name='enabled'
            control={control}
            render={
              ({field}) => 
              <TextField
                select
                size='small'
                label='Activo'
                variant='outlined'
                {...field}
              >
                <MenuItem value='true'>ACTIVO</MenuItem>
                <MenuItem value='false'>INACTIVO</MenuItem>
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

export default UserForm;