import { createHash, randomBytes } from 'node:crypto';
import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

export async function comparePassword(
  hashedPassword: string,
  password: string,
): Promise<boolean> {
  return await argon2.verify(hashedPassword, password);
}

export function randomString(size: number = 64): string {
  return randomBytes(size).toString('hex');
}

export function stringHash(str: string): string {
  return createHash('sha256').update(str).digest('hex');
}
