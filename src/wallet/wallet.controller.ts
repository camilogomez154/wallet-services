import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
  
}
