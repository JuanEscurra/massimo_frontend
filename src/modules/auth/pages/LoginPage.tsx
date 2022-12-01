import { FC, ReactElement, useEffect } from 'react';

import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'config/store';
import { Toast } from 'shared/utilities/Alerts';
import { Credentials } from '../../../shared/models/User';
import { registerRules } from 'shared/validation/user';
import { startLogin } from '../actions/auth';

const defaultCredentials: Credentials = {
  email: '',
  password: ''
}

const LoginPage = (): ReactElement => {

  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm<Credentials>({ defaultValues: defaultCredentials });
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  const onSubmit = ({email, password}: Credentials) => {
    if(email && password) {
      dispatch(startLogin(email, password));
    }
  }

  useEffect(() => {
    Object.keys(errors).length > 0 && Toast.fire({title: 'Porfavor, complete los campos requeridos', icon: 'error'});
  }, [errors])

  return (
    <Box
      height="100%"
      display="flex"
      rowGap="20px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center" className='animate__animated animate__fadeIn'>

      <h2>INICIE SESIÓN</h2>
      <p>Si eres personal autorizado del restaurante Baratie, ingrese sus credenciales para ingresar al sistema de administración.</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '100%'}}>
        <Controller
          name="email"
          control={control}
          rules={registerRules.email}
          render={
            ({ field }) => <TextField
            size='medium'
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
            size='medium'
            fullWidth
            label='Contraseña'
            variant='outlined'
            type="password"
            {...errors?.password ? {error: true, helperText: errors?.password?.message} : null}
            {...field}
            />
          }
        />
        <Button
          variant='contained'
          fullWidth
          size='large'
          type='submit'
          disabled={isLoading}>
          { isLoading ?  <CircularProgress color='info' size='30px' /> : 'Ingresar'}
        </Button>
        <Button variant='outlined' fullWidth size='large' component={Link} to="/auth/register">
          Registrarse
        </Button>
      </form>
      <p>¿Olvidaste la contraseña? <Link to="/auth/forgot">Ingrese aqui</Link></p>   
    </Box>
  )
}

export default LoginPage;