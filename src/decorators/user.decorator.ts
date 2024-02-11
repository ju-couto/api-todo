import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import { authorizationToLoginPayload } from 'src/utils/base-64-converter';
import { verify } from 'jsonwebtoken';

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const { authorization } = context.switchToHttp().getRequest().headers;

  try {
    if (!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    verify(authorization, process.env.JWT_SECRET);

    const loginPayload = authorizationToLoginPayload(authorization);
    return loginPayload?.id;
  } catch (error) {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
});
