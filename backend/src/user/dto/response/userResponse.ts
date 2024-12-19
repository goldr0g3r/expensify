import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';
import { IUser } from 'src/common/interface';

export class UserResponse implements IUser {
  @ApiProperty({
    title: 'ID',
    description: 'ID of the user',
    example: '123e4567-e2b8-12d1-a456-426614174000',
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'Username',
    description: 'Username of the user',
    example: 'john_doe',
  })
  @Expose()
  username: string;

  @ApiProperty({
    title: 'Name',
    description: 'Name of the user',
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Created At',
    description: 'Date and time of the user creation',
    example: '2021-08-31T08:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    title: 'Updated At',
    description: 'Date and time of the user update',
    example: '2021-08-31T08:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}
