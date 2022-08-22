import { Controller, Post, Body, Patch, Param, Delete, Request, UseGuards, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Document } from 'mongoose';

import { Customer } from '@app/mongo';

import { CreateWalletDto } from '../wallet/dto/create-wallet.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

import { JwtAuthGuard } from '../security/jwt.strategy.service';
import { WalletService } from '../wallet/wallet.service';
import { CustomerService } from './customer.service';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly walletService: WalletService,
  ) { }

  @ApiBody({ type: LoginCustomerDto })
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: Express.Request) {
    const session = await this.customerService.generateJWTToken(req.user as Customer & Document)
    return session;
  }


  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async findOne(@Request() { user }: Express.Request) {
    const customer = user as Customer & Document
    const customerModel = await this.customerService.findOne(customer._id)
    return customerModel
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post("add/wallet")
  async addWallet(@Body() createWalletDto: CreateWalletDto, @Req() { user }: Express.Request) {
    const wallet = await this.walletService.create(createWalletDto)
    const customer = user as Customer & Document
    const customerModel = await this.customerService.findOne(customer._id)
    customerModel.wallets.push(wallet._id)
    return await customerModel.save()
  }

}
