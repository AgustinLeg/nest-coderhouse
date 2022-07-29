import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OrdersService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }
  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderModel.create(createOrderDto);
      return order;
    } catch (error) {
      console.log(error);
      this.handleExeptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return await this.orderModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: 1 });
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new NotFoundException(`Order with id "${id}" not found`);

    const order = await this.orderModel.findById(id).lean();

    if (!order) throw new NotFoundException(`Order with id "${id}" not found`);

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
      return { ...order.toJSON(), ...updateOrderDto };
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.orderModel.deleteOne({ _id: id });

    if (!deletedCount) {
      throw new BadRequestException(`Order with id "${id}" not found`);
    }

    return { deletedCount, order: id };
  }
  private handleExeptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(
        `Order exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't get Order - Checker server logs`,
    );
  }
}
