import { Product } from '../interfaces/product.interface';

export const PRODUCTS_SEED: Product[] = [
  {
    name: 'Product 1',
    description: 'This is product 1',
    image:
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 5000,
    slug: 'product-1',
    stock: 10,
  },
  {
    name: 'Product 2',
    description: 'This is product 2',
    image:
      'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1000,
    slug: 'product-2',
    stock: 7,
  },
  {
    name: 'Product 3',
    image:
      'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 2000,
    slug: 'product-3',
    stock: 2,
  },
];
