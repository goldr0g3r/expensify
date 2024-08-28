import { ApiProperty } from '@nestjs/swagger';
import { IRegisterRequest } from 'src/common/interfaces';

export class RegisterAccountRequest implements IRegisterRequest {
  @ApiProperty({
    title: 'Username',
    description: 'username of the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    title: 'Email',
    description: 'email of the user',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    title: 'Name',
    description: 'name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    title: 'Password',
    description: 'password of the user',
    example: 'password',
  })
  password: string;
}
