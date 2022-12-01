
export interface Credentials {
  email?: string,
  password?: string
}

export interface User extends Credentials {
  id?: number,
  name?: string,
  surname?: string,
  dni?: string
  roles?: Array<Role>,
  enabled?: boolean
}

export enum Role {
  ADMINISTRADOR = 1,
  RECEPCIONISTA = 2,
  CAJERO = 3,
  INVITADO = 4,
  PROPIETARIO = 5,
}

export interface Profile {
  sub?: string,
  iat?: number,
  role?: string,
  exp?: number
  token?: string,
  isLogged?: boolean
}