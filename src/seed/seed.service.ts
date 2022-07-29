import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

import { USERS_SEED, PRODUCTS_SEED } from './data';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async executeSeed() {
    await this.productModel.deleteMany({});
    await this.userModel.deleteMany({});

    await this.productModel.insertMany(PRODUCTS_SEED);
    await this.userModel.insertMany(USERS_SEED);

    return { products: PRODUCTS_SEED.length, users: USERS_SEED.length };
  }
}
