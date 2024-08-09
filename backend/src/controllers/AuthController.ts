
import { loginSchema, registerSchema } from './../_helpers/validators/index';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { UserModel } from '../db/user';
import { IUser } from '../models/common.model';
import { generateToken } from '../middleware/authenticate';

class AuthController {
  public async login(request: Request, respone: Response) {
    try {
      const { email, password} = request.body;

      loginSchema.parse({ email, password });

      const user = await UserModel.findOne({
        email,
      });

      if(user) {
        const data: IUser = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          token: ''
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch) {
          const token = generateToken(data);
          user.token = token;
          await user.save();
          data.token = token;

          return respone
            .status(201)
            .json({ message: 'User logged in successfully', data: user})
        }
      }
      return respone
        .status(400)
        .json({ status: false, message: 'Invalid credentials' })
    }
    catch(error){
      return respone.status(400).json({ status: false, error})
    }
  }
  public async register(request: Request, respone: Response) {
    try {
      const { name, email, password } = request.body;

      registerSchema.parse({ name, email, password });

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new UserModel({
        name,
        email,
        password: hashPassword,
      });
      await user.save();

      return respone
        .status(201)
        .json({ message: 'User created successfully' })
    }
    catch(error) {
      return respone.status(400).json({ status: false, error });
    }
  }
  public async logout(request: Request, respone: Response) {

  }
}

export default new AuthController();
