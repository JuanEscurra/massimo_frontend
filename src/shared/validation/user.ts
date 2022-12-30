import { RegisterOptions } from "react-hook-form";
import { User } from "shared/models/User";


export const defaultValues: User = {
  email: '',
  password: '',
  name: '',
  surname: '',
  dni: '',
  roles: [],
  enabled: false
}

export interface RegisterValidation {
  email: RegisterOptions,
  password: RegisterOptions,
  name: RegisterOptions,
  surname: RegisterOptions,
  dni: RegisterOptions
}


export const registerRules: RegisterValidation = {
  email: {
    required: 'El email es requerido'
  },
  password: {
    required: 'La contraseña es requerido',
    minLength: {
      value: 6,
      message: 'La contraseña debe tener como minimo 6 letras'
    },
  },
  name: {
    required: 'El nombre es requerido',
    minLength: {
      value: 3,
      message: 'El nombre debe tener como minimo 3 letras'
    }
  },
  surname: {
    required: 'El apellido es requerido',
    minLength: {
      value: 3,
      message: 'El nombre debe tener como minimo 3 letras'
    }
  },
  dni: {
    required: 'El dni es requerido',
    pattern: {
      value: /^[0-9]{8}$/,
      message: 'El dni debe tener 8 digitos'
    },
  }
}