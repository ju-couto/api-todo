import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION },
      }),
    }), UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
