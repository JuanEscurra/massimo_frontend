import { instance } from "./AdminInterceptors";
import Page from "shared/models/page";
import Product, { Category } from "shared/models/Product";

export const getProducts = async(page: number = 0, size: number = 20) => {
  try {
    const response = await instance.get('/products', { params: { page, size }});
    if(response?.status === 200) {
      const page: Page<Product> = response.data;
      return page;
    }
    throw new Error('Error en al solicitar datos de los productos');
  } catch(e) {
    throw e;
  }
}

export const getProductsByName = async(page: number = 0, size: number = 20, name: string) => {
  try {
    const response = await instance.get('/products/search', {
      params: {page, size, name}
    });
    if(response?.status !== 200) throw new Error('Error en al solicitar datos de los productos');
    const pageProducts: Page<Product> = response.data;
    return pageProducts;
  } catch(e) {
    throw e;
  }
}

export const deleteProduct = async(id: number): Promise<boolean> => {
  try {
    const response = await instance.delete(`/products/${id}`);

    if(response?.status != 204) {
        throw response.data;
    }
    return (response?.status === 204);
  } catch(e) {
    throw e;
  }
}

export const saveProduct = async(product: Product, image: File): Promise<Product> => {
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    product.stock && formData.append('stock', product.stock.toString());
    formData.append('file', image);
    product?.category?.id && formData.append('category', product?.category?.id.toString());
    
    const response = await instance.post(`/products`, formData);

    if(response?.status != 201) {
        throw response.data;
    }
    return response.data;
  } catch(e) {
    throw e;
  }
}

export const getCategories = async(): Promise<Category[]>  => {
  try {
    const response = await instance.get('/products/categories');
    if(response?.status === 200) {
      const categories: Category[] = response.data;
      return categories;
    }
    throw new Error('Error en al solicitar datos de los productos');
  } catch(e) {
    throw e;
  }
}