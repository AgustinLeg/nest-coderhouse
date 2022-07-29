import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';

import { hashSync, compareSync } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, email, ...userData } = createUserDto;

      const user = await this.userModel.create({
        ...userData,
        email: email.toLowerCase(),
        password: hashSync(password, 10),
      });

      return {
        ...user.toJSON(),
        token: this.getJwtToken({ email: user.email }),
      };
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) throw new UnauthorizedException(`Credentials are not valid`);

    if (!compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid`);

    return {
      ...user.toJSON(),
      token: this.getJwtToken({ email: user.email }),
    };
  }

  async findOne(term: string) {
    let user: User;

    if (
      String(term)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      user = await this.userModel.findOne({ email: term });
    }

    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findById(term);
    }

    if (!user)
      throw new NotFoundException(`user with id or email "${term}" not found`);

    return user;
  }

  async checkAuthStatus(user) {
    return {
      ...user.toJSON(),
      token: this.getJwtToken({ email: user.email }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExeptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't create User - Checker server logs`,
    );
  }
}
