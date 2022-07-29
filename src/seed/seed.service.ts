import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { PRODUCTS_SEED } from './data/products.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async executeSeed() {
    await this.productModel.deleteMany({});

    await this.productModel.insertMany(PRODUCTS_SEED);

    return { products: PRODUCTS_SEED.length };
  }
}
