import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const comparePassword = async (dbPass: string, loginPass: string): Promise<boolean> => {
  const verifyPass = await bcrypt.compare(loginPass, dbPass);
  return verifyPass;
}