import {Body, Controller, Delete, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './schemas/user.schema';
import {DeleteUserDto} from './dto/delete-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {AuthGuard} from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {
  }
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._usersService.create(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete()
  delete(@Body() deleteUserDto: DeleteUserDto): Promise<any> {
    return this._usersService.delete(deleteUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return this._usersService.login(loginUserDto);
  }

}
