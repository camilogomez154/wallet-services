import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Wallet } from './wallet.schema';

export type CustomerDocument = Customer & Document;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
})
export class Customer {

    @Prop({
        checkRequired: true,
    })
    fullName: string;

    @Prop({
        checkRequired: true,
    })
    email: string;

    @Prop({
        checkRequired: true,
    })
    password: string;

    @Prop({
        checkRequired: true,
    })
    dni: string;

    @Prop()
    address: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }] })
    wallets: Wallet[] | string[];

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);