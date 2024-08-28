import { ApiProperty } from '@nestjs/swagger';
import { ILoginRequest } from 'src/common/interfaces';

export class LoginAccountRequest implements ILoginRequest {
  @ApiProperty({
    title: 'Username',
    description: 'username of the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    title: 'Password',
    description: 'password of the user',
    example: 'password',
  })
  password: string;
}
