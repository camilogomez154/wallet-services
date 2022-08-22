import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthenticationStrategyService extends PassportStrategy(Strategy) {

    constructor(private readonly customerService: CustomerService) {
        super({ usernameField: "email" });
    }

    async validate(username: string, password: string) {
        return await this.customerService.authenticate(username, password)
    }

}
