import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { ICategoryCreateRequest } from 'src/common/interfaces/category';

export class CreateCategoryRequest implements ICategoryCreateRequest {
  @ApiProperty({
    title: 'Name',
    description: 'name of the category',
    example: 'Food',
  })
  name: string;

  @ApiProperty({
    title: 'Icon',
    description: 'icon of the category',
    example: 'food',
  })
  icon: string;

  @ApiProperty({
    title: 'User ID',
    description: 'Unique identifier of the user',
    example: randomUUID(),
  })
  userId: string;
}
