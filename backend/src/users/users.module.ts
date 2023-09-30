import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {jwtConstants} from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService]
})
export class UsersModule {}
