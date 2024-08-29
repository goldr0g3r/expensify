import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class ListCategoryOfUser {
  @ApiProperty({
    title: 'User ID',
    description: 'Unique identifier of the user',
    example: '2ba82e1d-bb59-4ccb-a2e6-018d3a583e24',
  })
  userId: UUID;
}
