import { Request, Response } from "express";
import { apiResponse, clearCookie, setCookie } from "../../lib";
import { COOKIE_NAME } from "../../constants";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const data = await this.authService.register(req.body);
    return apiResponse(res, { data });
  };

  login = async (req: Request, res: Response) => {
    const accessToken = await this.authService.login(req.body);
    setCookie(COOKIE_NAME.ACCESS_TOKEN, accessToken, res, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return apiResponse(res, {});
  };

  getUser = async (req: Request, res: Response) => {
    const data = await this.authService.getUser(req.user?.sub);
    return apiResponse(res, { data });
  };

  logout = (req: Request, res: Response) => {
    clearCookie(COOKIE_NAME.ACCESS_TOKEN, res);
    return apiResponse(res, {});
  };
}
