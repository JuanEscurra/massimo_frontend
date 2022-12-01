import { Dispatch } from 'react';
import { Toast } from 'shared/utilities/Alerts';
import { AuthAction, AuthActionType } from '../reducers/authReducer';
import { login } from '../services/AuthService';

import { UIAction, UIActionType } from 'shared/reducers/uiReducer';

export const startLogin = (email: string, password: string): Function => {
  return (dispatch: Dispatch<AuthAction | UIAction>): void => {
    dispatch({ type: UIActionType.startLoading });
    login(email, password)
      .then(profile => {
        if(!profile) {
          Toast.fire({ title: 'Las credenciales ingresadas no son validas.', icon: 'error'});
          throw new Error('Login incorrecto');
        }
        Toast.fire({ title: 'Se ha iniciado sesión correctamente.', icon: 'success'});
        dispatch({
          type: AuthActionType.LOGIN,
          payload: { ...profile, isLogged: true }
        });
      })
      .catch(({title}) => {
        Toast.fire({
          title: 'Las credenciales son invalidas o el usuarios está deshabilitado',
          icon: 'error'
        })
      })
      .finally(() => dispatch({ type: UIActionType.finishLoading}));
  }
}

export const startLogout = (): Function => {
  return (dispatch: Dispatch<AuthAction | UIAction>): void => {
    dispatch({ type: AuthActionType.LOGOUT });
  }
}
