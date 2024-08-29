import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { randomUUID } from 'crypto';
import { ICategoryResponse } from 'src/common/interfaces/category';

export class CategoryResponse implements ICategoryResponse {
  @ApiProperty({
    title: 'ID',
    description: 'Unique identifier of the category',
    example: randomUUID(),
  })
  @Expose()
  id: string;

  @ApiProperty({
    title: 'Name',
    description: 'name of the category',
    example: 'Food',
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Icon',
    description: 'icon of the category',
    example: 'food',
  })
  @Expose()
  icon: string;

  @ApiProperty({
    title: 'User ID',
    description: 'Unique identifier of the user',
    example: randomUUID(),
  })
  userId: string;

  @ApiProperty({
    title: 'Created At',
    description: 'Date when the category was created',
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    title: 'Updated At',
    description: 'Date when the category was updated',
    example: new Date(),
  })
  @Expose()
  updatedAt: Date;
}
