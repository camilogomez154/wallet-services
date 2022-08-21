import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Wallet, WalletDocument } from '@app/mongo';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>
  ) { }

  async create(createWalletDto: CreateWalletDto) {
    const WalletSaved = new this.walletModel(createWalletDto)
    return await WalletSaved.save()
  }

  async findAll() {
    return await this.walletModel.find().exec()
  }

  async findOne(_id: number) {
    return await this.walletModel.findById({ _id }).exec()
  }

  async update(_id: number, updateWalletDto: UpdateWalletDto) {
    return await this.walletModel.updateOne({ _id }, updateWalletDto, { upsert: true }).exec()
  }

  async remove(_id: number) {
    return await this.walletModel.remove({ _id }).exec()
  }
}
