import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryRequest } from 'src/common/models/entity/category';
import { CategoryParentRoute, CategoryRoutes } from './category.routes';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UUID } from 'crypto';
import { ListCategoryOfUser } from './dto/listCategory';

@ApiTags('category')
@Controller(CategoryParentRoute)
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @Post(CategoryRoutes.Create)
  create(@Body() request: CreateCategoryRequest) {
    return this.categoryService.create(request);
  }

  @ApiOperation({ summary: 'Find all categories OF the logged in user' })
  @Post(CategoryRoutes.FindAll)
  findAll(@Body() request: ListCategoryOfUser) {
    return this.categoryService.findAll(request.userId);
  }

  @Get(CategoryRoutes.ListAll)
  @ApiOperation({ summary: '(for admin) List all categories' })
  listall() {
    return this.categoryService.listall();
  }

  @ApiOperation({ summary: 'Find a category by id' })
  @Get(CategoryRoutes.FindById)
  findOne(@Body() id: UUID, userId: UUID) {
    return this.categoryService.findOne(id, userId);
  }

  @ApiOperation({ summary: 'Update a category' })
  @Patch(CategoryRoutes.Update)
  update(@Param('id') id: UUID, userId: UUID) {
    return this.categoryService.update(userId, id);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @Delete(CategoryRoutes.Delete)
  delete(@Param('id') id: UUID, userId: UUID) {
    return this.categoryService.delete(userId, id);
  }
}
