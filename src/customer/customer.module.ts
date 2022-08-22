import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MongoModule } from '@app/mongo';

import { SecurityModule } from '../security/security.module';
import { WalletModule } from '../wallet/wallet.module';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '5h' },
      secret: "secret_word",
    }),
    forwardRef(() => SecurityModule),
    WalletModule,
    MongoModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule { }
