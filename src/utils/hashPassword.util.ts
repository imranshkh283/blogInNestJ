import * as bcrypt from 'bcrypt';

type Salt = {
  salt: number;
};

const saltRounds: Salt = {
  salt: Number(process.env.SALT),
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds.salt);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
