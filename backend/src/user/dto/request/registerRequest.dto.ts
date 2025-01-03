import { ApiProperty } from '@nestjs/swagger';
import { IUserRegisterRequest } from 'src/common/interface';

export class UserRegisterRequest implements IUserRegisterRequest {
  @ApiProperty({
    title: 'username',
    description: 'Username of the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email of the user',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    title: 'Name',
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    title: 'Password',
    description: 'Password of the user',
    example: 'password',
  })
  password: string;
}
