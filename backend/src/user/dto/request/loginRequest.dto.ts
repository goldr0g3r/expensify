import { ApiProperty } from '@nestjs/swagger';
import { ILoginRequest, ILoginWithEmailRequest } from 'src/common/interface';

export class UserLoginRequest implements ILoginRequest {
  @ApiProperty({
    title: 'username',
    description: 'Username of the user',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    title: 'Password',
    description: 'Password of the user',
    example: 'password',
  })
  password: string;
}

export class UserLoginWithEmailRequest implements ILoginWithEmailRequest {
  @ApiProperty({
    title: 'Email',
    description: 'Email of the user',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    title: 'Password',
    description: 'Password of the user',
    example: 'password',
  })
  password: string;
}
