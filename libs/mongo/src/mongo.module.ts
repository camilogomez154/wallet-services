import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import {
  Customer, CustomerSchema,
  Wallet, WalletSchema,
} from './schemas';

const MONGO_URL = "mongodb+srv://WalletServices:BCDIFmQTCahRQRwS@walletservices.zzuuuvw.mongodb.net/?retryWrites=true&w=majority";

const MongooseForFeature = MongooseModule.forFeature([
  { name: Customer.name, schema: CustomerSchema },
  { name: Wallet.name, schema: WalletSchema },
])

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, { dbName: "wallet-services-development" }),
    MongooseForFeature,
  ],
  exports: [
    MongooseForFeature
  ]
})
export class MongoModule { }
