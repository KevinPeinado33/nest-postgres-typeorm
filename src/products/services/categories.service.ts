import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository( Category ) private categoryRepo: Repository < Category >
  ) { }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const categories = await this.categoryRepo.findOne( id, {
      relations: ['products']
    } );

    if (!categories) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return categories;
  }

  create(data: CreateCategoryDto) {
    const category = this.categoryRepo.create( data );

    return this.categoryRepo.save( category );
  }

  async update( id: number, changes: UpdateCategoryDto ): Promise<Category> {
    const category = await this.categoryRepo.findOne( id );

    this.categoryRepo.merge( category, changes );

    return this.categoryRepo.save( category );
  }

  remove(id: number) {
    return this.categoryRepo.delete( id );
  }
}
