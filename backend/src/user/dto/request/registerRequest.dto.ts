import { ApiProperty } from '@nestjs/swagger';
import { IUserRegisterRequest } from 'src/common/interface';

export class RegisterUserRequest implements IUserRegisterRequest {
  @ApiProperty({
    title: 'Username',
    description: 'Username of the user',
    example: 'john_doe',
  })
  username: string;

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
