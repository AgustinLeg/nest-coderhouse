import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { isValidObjectId, Model } from 'mongoose';

import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createProductDto: CreateProductDto) {
    try {
      createProductDto.name = createProductDto.name.toLowerCase();
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return await this.productModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: 1 });
  }

  async findOne(term: string) {
    let product: Product;

    if (term.includes('-')) {
      product = await this.productModel.findOne({ slug: term });
    }

    if (!product && isValidObjectId(term)) {
      product = await this.productModel.findById(term);
    }

    if (!product) {
      product = await this.productModel.findOne({ name: term.toLowerCase() });
    }

    if (!product)
      throw new NotFoundException(
        `Product with id, name or slug "${term}" not found`,
      );

    return product;
  }

  async update(term: string, updateProductDto: UpdateProductDto) {
    const product: Product = await this.findOne(term);

    if (updateProductDto.name) {
      updateProductDto.name = updateProductDto.name.toLowerCase();
    }
    try {
      await product.updateOne(updateProductDto);
      return { ...product.toJSON(), ...updateProductDto };
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });

    if (!deletedCount) {
      throw new BadRequestException(`Product with id "${id}" not found`);
    }

    return { deletedCount, product: id };
  }

  private handleExeptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't create Product - Checker server logs`,
    );
  }
}
