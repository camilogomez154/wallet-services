import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongoModule } from '../../libs/mongo/src/mongo.module';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
  imports: [MongoModule],
})
export class WalletModule { }
