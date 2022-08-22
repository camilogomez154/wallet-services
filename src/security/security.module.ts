import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthorizationStrategyService } from './authtorization.strategy.service';
import { AuthenticationStrategyService } from './authentication.strategy.service';
import { CustomerModule } from '../customer/customer.module';
import { JwtStrategyService } from './jwt.strategy.service';

@Module({
  providers: [AuthenticationStrategyService, AuthorizationStrategyService, JwtStrategyService],
  exports: [AuthenticationStrategyService, AuthorizationStrategyService, JwtStrategyService],
  imports: [
    JwtModule.register({
      secret: "secret_word",
    }),
    forwardRef(() => CustomerModule),
    PassportModule,
  ],
})
export class SecurityModule { }
