import { hashSync, genSaltSync } from 'bcrypt';

export const SALT_ROUNDS = 10;

const hashString = (str: string): string => {
  return hashSync(str, genSaltSync(SALT_ROUNDS));
};

export default hashString;
