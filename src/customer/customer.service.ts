import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Customer, CustomerDocument } from '@app/mongo';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const customerSaved = new this.customerModel(createCustomerDto)
    return await customerSaved.save()
  }

  async findAll() {
    return await this.customerModel.find().exec()
  }

  async findOne(_id: number) {
    return await this.customerModel.findById({ _id }).populate('wallet').exec()
  }

  async update(_id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.updateOne({ _id }, updateCustomerDto, { upsert: true }).exec()
  }

  async remove(_id: number) {
    return await this.customerModel.remove({ _id }).exec()
  }
}
