import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { CategorySchema, CategorySchemaObject } from './schema/category.schema';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: CategorySchema.name,
          collection: 'categories',
          schema: CategorySchemaObject,
        },
      ],
      DB_CONNECTION.category,
    ),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
