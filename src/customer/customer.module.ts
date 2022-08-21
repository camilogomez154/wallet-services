import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongoModule } from '../../libs/mongo/src/mongo.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [MongoModule],
})
export class CustomerModule { }
