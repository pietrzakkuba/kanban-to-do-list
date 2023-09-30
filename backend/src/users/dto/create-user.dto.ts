import {Length} from 'class-validator';

export class CreateUserDto {

  @Length(8, 64)
  login: string;

  @Length(8, 64)
  password: string;
}