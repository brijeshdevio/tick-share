export const PRISMA_ERROR_CODES = {
  CONFLICT: 'P2002',
  NOT_FOUND: 'P2025',
};

export const DUMMY_HASH =
  '$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM';

export const COOKIE_NAME = {
  ACCESS_TOKEN: 'access_token',
};

export const COOKIE_EXPIRES = {
  ACCESS_TOKEN: 3 * 24 * 60 * 60 * 1000,
};

export const MESSAGES = {
  USER_CREATION_SUCCESS: 'User created successfully.',
  USER_LOGIN_SUCCESS: 'User logged in successfully.',
  USER_LOGOUT_SUCCESS: 'User logged out successfully.',
};
