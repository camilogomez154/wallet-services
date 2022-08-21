import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {

    @ApiProperty({
        description: "full name to customer",
        required: true,
    })
    fullName: string;

    @ApiProperty({
        description: "secret encryption word to sign in",
        required: true,
    })
    password: string;

    @ApiProperty({
        description: "address location",
    })
    address: string;

    @ApiProperty({
        description: "email of customer",
        required: true,
    })
    email: string;

    @ApiProperty({
        description: "document identification of customer",
        required: true,
    })
    dni: string;
}
