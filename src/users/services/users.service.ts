import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from './customers.service';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository( User ) private userRepo: Repository< User >,
    private productsService: ProductsService,
    private configService: ConfigService,
    private customersService: CustomersService
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);

    return this.userRepo.find({
      relations: ['customer']
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne( id );

    if ( !user ) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const user = this.userRepo.create( data );

    if ( data.customerId ) {
      const customer = await this.customersService.findOne( data.customerId );
      user.customer = customer;
    }

    return this.userRepo.save( user );
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne( id );

    this.userRepo.merge( user, changes );

    return this.userRepo.save( user );
  }

  remove(id: number) {
    return this.userRepo.delete( id );
  }

  async getOrderByUser(id: number) {
    const user = this.findOne( id );
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
