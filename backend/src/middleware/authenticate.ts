import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../models/common.model';

const SECRETE_KEY = 'adg54asdf56321ag564asd5g';

export const generateToken = (data: IUser) => {
  const token = sign(data, SECRETE_KEY, {
    expiresIn: '1 day'
  });
  return token;
}
