import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Wallet } from './wallet.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

    @Prop()
    fullName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    dni: string;

    @Prop()
    address: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }] })
    wallets: Wallet[];

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);