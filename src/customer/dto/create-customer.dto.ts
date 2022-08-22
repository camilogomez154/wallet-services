import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreateCustomerDto {

    @ApiProperty({
        description: "full name to customer",
        required: true,
    })
    @IsString()
    fullName: string;

    @ApiProperty({
        description: "secret encryption word to sign in",
        required: true,
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: "email of customer",
        required: true,
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "document identification of customer",
        required: true,
    })
    @IsNumberString()
    @IsString()
    dni: string;

    @ApiProperty({
        description: "address location",
    })
    @IsOptional()
    @IsString()
    address: string;
}
