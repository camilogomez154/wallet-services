import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
})
export class Wallet {

    @Prop({
        checkRequired: true,
    })
    currency: string;

    @Prop({
        default: 0
    })
    balance: number;

}

export const WalletSchema = SchemaFactory.createForClass(Wallet);