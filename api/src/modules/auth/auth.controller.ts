import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { apiResponse, clearCookie, setCookie } from "../../lib/http";
import { COOKIE_EXPIRES, COOKIE_NAME, MESSAGES } from "../../constants";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    await this.authService.register(req.body);
    return apiResponse(res, {
      statusCode: 201,
      message: MESSAGES.USER_CREATION_SUCCESS,
    });
  };

  login = async (req: Request, res: Response) => {
    const accessToken = await this.authService.login(req.body);
    setCookie(COOKIE_NAME.ACCESS_TOKEN, accessToken, res, {
      maxAge: COOKIE_EXPIRES.ACCESS_TOKEN,
    });
    return apiResponse(res, {
      statusCode: 200,
      message: MESSAGES.USER_LOGIN_SUCCESS,
    });
  };

  logout = (req: Request, res: Response) => {
    clearCookie(COOKIE_NAME.ACCESS_TOKEN, res);
    return apiResponse(res, {
      statusCode: 200,
      message: MESSAGES.USER_LOGOUT_SUCCESS,
    });
  };
}
