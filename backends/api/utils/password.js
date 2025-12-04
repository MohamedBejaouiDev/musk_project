import bcrypt from 'bcryptjs';

const ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');

export const hashPassword = async (password) => await bcrypt.hash(password, ROUNDS);
export const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);
