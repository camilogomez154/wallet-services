import { ApiProperty } from "@nestjs/swagger"

export class CreateWalletDto {

    @ApiProperty({
        description: "currency is money type (USD/COP/OTHERS)"
    })
    currency: string

}
