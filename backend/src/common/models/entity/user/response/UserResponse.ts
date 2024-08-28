import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { randomUUID, UUID } from 'crypto';

export class UserResponse {
  @ApiProperty({
    title: 'User ID',
    description: 'unique identifier of the user',
    example: '083cab9d-8373-45da-b76a-5fd4f0c3db2f',
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'Username',
    description: 'username of the user',
    example: 'johndoe',
  })
  @Expose()
  username: string;

  @ApiProperty({
    title: 'Email',
    description: 'email of the user',
    example: 'johndoe@gmail.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    title: 'Name',
    description: 'name of the user',
    example: 'John Doe',
  })
  @Expose()
  name: string;
}
