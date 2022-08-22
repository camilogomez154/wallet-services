import { Module } from '@nestjs/common';

import { SecurityModule } from './security/security.module';
import { CustomerModule } from './customer/customer.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    SecurityModule,
    CustomerModule,
    WalletModule,
  ],
})
export class AppModule { }
