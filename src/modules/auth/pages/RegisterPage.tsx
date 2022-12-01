import { Box, Button, Snackbar, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/AuthService';
import { Controller, useForm } from "react-hook-form";
import { defaultValues, registerRules } from 'shared/validation/user';
import { User } from '../../../shared/models/User';
import { useEffect } from 'react';
import { Toast } from 'shared/utilities/Alerts';

const RegisterPage = () => {

  const navigate = useNavigate();
  
  const { handleSubmit, control, formState: { errors }, setError } = useForm<User>({ defaultValues });

  const onSubmit = (user: User) => {


    register(user)
      .then((newUser) => {
        Toast.fire({ title: 'Se ha registrado correctamente', icon: 'success'});
        navigate('/auth/login');
      }).catch(({title, details}) => {
        details.email && setError('email', {message: details.email});
        details.dni && setError('dni', {message: details.dni});
        Toast.fire({
          title: title,
          icon: 'error'
        })
      });
  }

  useEffect(() => {
    (Object.keys(errors).length > 0) && Toast.fire({ title: 'Porfavor, complete el formulario.', icon: 'error'});
  }, [errors]);

  
  return (
    <Box
      height="100%"
      display="flex"
      rowGap="5px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center" className='animate__animated animate__fadeIn'>

      <h2>REGISTRESE</h2>
      <p style={{ margin: '0 0 10px 0'}}>Ingrese sus datos personales para registrase en el sistema.</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{display: 'flex', flexDirection: 'column', gap: '5px', width: '100%'}}
        autoComplete='off'>
        <Controller
          name="email"
          control={control}
          rules={registerRules.email}
          render={
            ({ field }) => <TextField
            size='small'
            fullWidth
            label='Correo electronico'
            variant='outlined'
            type="email"
            {...errors?.email ? {error: true, helperText: errors?.email?.message} : null}
            {...field}
            />
          }
        />
        <Controller 
          name="password"
          control={control}
          rules={registerRules.password}
          render={
            ({field}) => <TextField
            size='small'
            fullWidth
            label='Contraseña'
            variant='outlined'
            type="password"
            {...errors?.password ? {error: true, helperText: errors?.password?.message} : null}
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
              fullWidth
              label='Nombres'
              variant='outlined'
              type="text"
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
              size='small'
              fullWidth
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
              size='small'
              fullWidth
              label='DNI'
              variant='outlined'
              type="text"
              {...errors?.dni ? {error: true, helperText: errors?.dni?.message} : null}
              {...field}
            />
          }
        />
        <Button variant='contained' fullWidth size='medium' type='submit'>Registrarse</Button>
        <Button variant="text" fullWidth component={Link} to='/auth/login'>regresar</Button>
      </form>

    </Box>
  )
}

export default RegisterPage;