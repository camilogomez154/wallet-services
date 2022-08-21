import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { Customer, CustomerDocument, WalletSchema } from '@app/mongo';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {

    const { dni, email } = createCustomerDto

    const customerSearch = await this.customerModel.find({ $or: [{ email }, { dni }] })
    if (customerSearch.length) throw new ConflictException(`the customer with email ${email} or dni ${dni} already exist.`)

    const customerSaved = new this.customerModel(createCustomerDto)
    return await customerSaved.save()
  }

  async findOne(_id: string) {
    const customer = await this.customerModel.findById({ _id }).populate('wallets').exec();
    if (!customer) throw new NotFoundException(`The customer with id ${_id} not exist.`)

    return customer;
  }

  async update(_id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(_id);
    return await this.customerModel.updateOne({ _id }, updateCustomerDto, { upsert: true }).exec()
  }

  async remove(_id: string) {
    await this.findOne(_id);
    return await this.customerModel.deleteOne({ _id }).exec()
  }
}
