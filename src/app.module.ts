import { Module } from '@nestjs/common';

import { CustomerModule } from './customer/customer.module';
import { WalletModule } from './wallet/wallet.module';
@Module({
  imports: [CustomerModule, WalletModule],
})
export class AppModule { }
