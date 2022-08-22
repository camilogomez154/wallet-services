import { Controller, Get, Param, Delete, UseGuards, Patch, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../security/jwt.strategy.service';
import { WalletService } from './wallet.service';

import { UpdateWalletDto } from './dto/update-wallet.dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Patch(':id/transaction')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async transaction(@Param('id') id: string, @Body() { value }: UpdateWalletDto) {
    const wallet = await this.walletService.findOne(id);
    wallet.balance += value

    return await wallet.save()
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }

}
