import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './schemas/user.schema';
import {Model} from 'mongoose';
import {CreateUserDto} from './dto/create-user.dto';
import {DeleteUserDto} from './dto/delete-user.dto';
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt';
import {jwtConstants} from './constants';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly _jwtService: JwtService) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt());
    return this.userModel.create(createUserDto);
  }

  delete(deleteUserDto: DeleteUserDto): Promise<any> {
    return this.userModel.deleteOne(deleteUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const password: string = loginUserDto.password;
    delete loginUserDto.password;
    const user: User = await this.userModel.findOne(loginUserDto);
    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this._jwtService.signAsync({login: user.login}, {secret: jwtConstants.secret})
    }
  }

}
