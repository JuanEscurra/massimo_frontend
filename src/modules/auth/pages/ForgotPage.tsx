import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPage = () => {
  return (
    <Box
      height="100%"
      display="flex"
      rowGap="20px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center" className='animate__animated animate__fadeIn'>

      <h2>RECUPERAR CONTRASEÑA</h2>
      <p>Si se olvido la contraseña, ingrese su correo electronico y dale click en recuperar contraseña.</p>
      <TextField
        fullWidth
        label='Correo electronico'
        variant='outlined'
        type="email"></TextField>
      <Button variant='contained' fullWidth size='large'>Recuperar contraseña</Button>
      <Button variant='text' fullWidth size='large' component={Link} to="/auth/login">
        Regresar
      </Button>
    </Box>
  )
}

export default ForgotPage;