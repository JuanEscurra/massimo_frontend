import { Profile } from "../../../shared/models/User";

export enum AuthActionType {
  LOGIN = '@auth/login',
  LOGOUT = '@auth/logout'
} 

export interface AuthAction {
  type: AuthActionType,
  payload?: Profile
}

const profileString = localStorage.getItem('auth');
let defaultvalues: Profile = profileString ? JSON.parse(profileString) : {isLogged: false};


export const authReducer = (state: Profile = defaultvalues, action: AuthAction): Profile => {

  switch (action.type) {
    case AuthActionType.LOGIN:
      return {...action.payload};
    case AuthActionType.LOGOUT:
      return {};
    default:
      return state;
  }
}