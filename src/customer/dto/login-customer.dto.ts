import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginCustomerDto {

    @ApiProperty({
        description: "Email to sign in"
    })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "Password to sign in"
    })
    @IsString()
    password: string

}