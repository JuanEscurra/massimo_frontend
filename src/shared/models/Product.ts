
interface Product {
  id?: number;
  name: string;
  price: number;
  category?: Category;
  stock?: number;
  url?: string;
}

export interface Category {
  id?: number;
  name?: string;
  description?: string;
}

export default Product;

