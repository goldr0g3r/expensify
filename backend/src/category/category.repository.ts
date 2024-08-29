import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'src/common/helpers';
import { CategorySchema } from './schema/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { ICategoryCreateRequest } from 'src/common/interfaces/category';
import { plainToClass } from 'class-transformer';
import { CategoryResponse } from 'src/common/models/entity/category';
import { UUID } from 'crypto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoryRepository extends MongoRepository {
  constructor(
    @InjectModel(CategorySchema.name, DB_CONNECTION.category)
    private readonly categoryModel: Model<CategorySchema>,
  ) {
    super();
  }

  async create(data: ICategoryCreateRequest): Promise<CategoryResponse> {
    const category = await this.categoryModel.create(data);
    return this.toCategoryModel(category);
  }

  async findAll(userId: UUID): Promise<CategoryResponse[] | null> {
    // filter by userId
    const allCategories = await this.categoryModel.find();
    let categories = [];
    allCategories.forEach((category) => {
      console.log(category.userId === userId);
      if (category.userId === userId) {
        categories.push(category);
      }
    });
    console.log(categories);
    if (!categories) {
      return null;
    }
    return Promise.all(
      categories.map((category) => {
        console.log(category);
        return this.toCategoryModel(category);
      }),
    );
  }

  async findOne(id: UUID, userId: UUID): Promise<CategoryResponse | null> {
    const category = await this.categoryModel.findOne({
      id: id,
      userId: userId,
    });
    return category ? this.toCategoryModel(category) : null;
  }

  async update(userId: UUID, categoryId: UUID) {
    const category = await this.categoryModel.findOneAndUpdate({
      id: categoryId,
      userId: userId,
    });
    if (!category) {
      return null;
    }
    return this.toCategoryModel(category);
  }

  async delete(userId: UUID, categoryId: UUID) {
    const category = await this.categoryModel.findOneAndDelete({
      id: categoryId,
      userId: userId,
    });
    if (!category) {
      return null;
    }
    return this.toCategoryModel(category);
  }
  async listall(): Promise<CategoryResponse[] | null> {
    const categories = await this.categoryModel.find();
    if (!categories) {
      return null;
    }
    return Promise.all(
      categories.map((category) => this.toCategoryModel(category)),
    );
  }

  private async toCategoryModel(data: CategorySchema) {
    const response = plainToClass(CategoryResponse, data, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
