import { RegisterOptions } from "react-hook-form";
import Product from "shared/models/Product";


export const defaultValues: Product = {
  name: '',
  price: 0,
  stock: 0,
  url: '',
  category: {
    id: 0
  }
}

export interface RegisterValidation {
  name: RegisterOptions,
  price: RegisterOptions,
  stock: RegisterOptions,
  url: RegisterOptions,
}


export const registerRules = {
}