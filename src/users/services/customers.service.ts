import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  
  constructor( 
    @InjectRepository( Customer ) private customerRepo: Repository< Customer >
  ){}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne( id );
    
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    
    return customer;
  }

  create(data: CreateCustomerDto) {
    const customer = this.customerRepo.create( data );

    return this.customerRepo.save( customer );
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne( id );
    
    this.customerRepo.merge( customer, changes );

    return this.customerRepo.save( customer );
  }

  remove(id: number) {
    return this.customerRepo.delete( id );
  }
  
}
