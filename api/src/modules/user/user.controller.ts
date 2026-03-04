import { Request, Response } from "express";
import { UserService } from "./user.service";
import { apiResponse } from "../../lib/http";

export class UserController {
  constructor(private readonly userService: UserService) {}

  findById = async (req: Request, res: Response) => {
    const user = await this.userService.findById(req.user.sub);
    return apiResponse(res, { data: user });
  };
}
