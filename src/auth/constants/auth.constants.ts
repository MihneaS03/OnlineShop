import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const JWT_EXPIRATION = '60s';

export const JWT_EXPIRATION_REFRESH = '7d';
