
import { registerSchema } from './../_helpers/validators/index';
import { Request, Response } from "express";

class AuthController {
  public async login(request: Request, respone: Response) {
    return respone.json({message: 'login'})
  }
  public async register(request: Request, respone: Response) {
    try {
      const { name, email, password } = request.body;

      registerSchema.parse({ name, email, password });
    }
    catch(error) {
      return respone.status(400).json({ status: false, error });
    }
  }
  public async logout(request: Request, respone: Response) {

  }
}

export default new AuthController();
