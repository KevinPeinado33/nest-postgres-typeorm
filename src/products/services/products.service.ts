import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {

  constructor( 
    @InjectRepository( Product ) private productRepo: Repository< Product >,
    private brandService: BrandsService
  ) { }

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne( id );
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
      const brand = await this.brandService.findOne( data.brandId );
      product.brand = brand;
    }

    return this.productRepo.save( product );

  }

  async update(id: number, changes: UpdateProductDto) {

    const product = await this.productRepo.findOne( id );

    if ( changes.brandId ) {
      const brand = await this.brandService.findOne( changes.brandId );
      product.brand = brand;
    }

    this.productRepo.merge( product, changes );

    return this.productRepo.save( product );

  }

  remove(id: number) {

    return this.productRepo.delete( id );

  }
}
