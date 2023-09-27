import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './schemas/user.schema';
import {Model} from 'mongoose'
import {CreateUserDto} from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  // async create(createUserDto: CreateUserDto)

  // delete()

  // changePassword()

}
