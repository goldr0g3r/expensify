import { Injectable } from '@nestjs/common';
import { ICategoryCreateRequest } from 'src/common/interfaces/category';
import { CategoryRepository } from './category.repository';
import { UUID } from 'crypto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  create(request: ICategoryCreateRequest) {
    return this.categoryRepository.create(request);
  }

  findAll(userId: UUID) {
    return this.categoryRepository.findAll(userId);
  }

  findOne(id: UUID, userId: UUID) {
    return this.categoryRepository.findOne(id, userId);
  }

  update(userId: UUID, categoryId: UUID) {
    return this.categoryRepository.update(userId, categoryId);
  }

  delete(userId: UUID, categoryId: UUID) {
    return this.categoryRepository.delete(userId, categoryId);
  }

  listall() {
    return this.categoryRepository.listall();
  }
}
