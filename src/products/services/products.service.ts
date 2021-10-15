import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {

  constructor( 
    @InjectRepository( Product ) private productRepo: Repository< Product >,
    @InjectRepository( Category ) private categoryRepo: Repository< Category >,
    @InjectRepository( Brand ) private brandRepo: Repository< Brand >,
  ) { }

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne( id, {
      relations: ['brand', 'categories']
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {;
    
    /* const product       = new Product();

    product.name        = data.name;
    product.description = data.description;
    product.price       = data.price;
    product.stock       = data.stock;
    product.image       = data.image; */

    const product = this.productRepo.create( data );

    if ( data.brandId ) {
      const brand = await this.brandRepo.findOne( data.brandId );
      product.brand = brand;
    }

    if ( data.categoriesIds ) {
      const categories = await this.categoryRepo.findByIds( data.categoriesIds );
      product.categories = categories;
    }

    return this.productRepo.save( product );

  }

  async removeCategoryByProd(productId: number, categoryId: number) {

    const product = await this.productRepo.findOne( productId, { 
      relations: ['categories']
    } );

    product.categories = product.categories.filter( ( category ) => category.id !== categoryId );

    return this.productRepo.save( product );
  }

  async addCategoryByProd(productId: number, categoryId: number) {

    const product = await this.productRepo.findOne( productId, { 
      relations: ['categories']
    } );

    const category = await this.categoryRepo.findOne( categoryId );

    product.categories.push( category );

    return this.productRepo.save( product );

  }

  async update(id: number, changes: UpdateProductDto) {

    const product = await this.productRepo.findOne( id );

    if ( changes.brandId ) {
      const brand = await this.brandRepo.findOne( changes.brandId );
      product.brand = brand;
    }

    if ( changes.categoriesIds ) {
      const categories = await this.categoryRepo.findByIds( changes.categoriesIds );
      product.categories = categories;
    }

    this.productRepo.merge( product, changes );

    return this.productRepo.save( product );

  }

  remove(id: number) {

    return this.productRepo.delete( id );

  }
}
