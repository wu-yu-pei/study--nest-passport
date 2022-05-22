import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [UserModule, PassportModule],
  controllers: [],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
