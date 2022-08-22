import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { Document, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { Customer, CustomerDocument } from '@app/mongo';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async generateJWTToken(customer: Customer & Document) {
    const payload = { customer, sub: customer._id }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

  async generatePassword(password: string) {
    const rounds = 12;
    const salt = await genSalt(rounds);
    return await hash(password, salt);
  }

  async authenticate(email: string, password: string) {
    const customerSearch = await this.customerModel.findOne({ email });
    if (!customerSearch) throw new NotFoundException(`the customer with email ${email} not exist.`);

    const matchPassword = await compare(password, customerSearch.password);
    if (!matchPassword) throw new ConflictException(`the customer with email ${email} not match password.`);

    delete customerSearch.password;

    return customerSearch;
  }

  async create(createCustomerDto: CreateCustomerDto) {

    const { dni, email } = createCustomerDto

    const customerSearch = await this.customerModel.find({ $or: [{ email }, { dni }] })
    if (customerSearch.length) throw new ConflictException(`the customer with email ${email} or dni ${dni} already exist.`)

    createCustomerDto.password = await this.generatePassword(createCustomerDto.password)

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
