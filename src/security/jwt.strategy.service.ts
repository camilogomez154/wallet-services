import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Document } from 'mongoose';

import { Customer } from '@app/mongo';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret_word",
      ignoreExpiration: false,
    });
  }

  async validate({ customer }: { customer: Customer & Document }) {
    console.log(customer)
    return customer;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, _info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
