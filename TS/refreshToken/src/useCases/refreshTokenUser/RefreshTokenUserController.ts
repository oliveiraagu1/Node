import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "../refreshTokenUser/RefreshTokenUserUseCase";

class RefreshTokenUserController{

    async handle(req: Request, res: Response) {

        const { refresh_token } = req.body;
        const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
        const token = await refreshTokenUserUseCase.execute(refresh_token);
        return token;
    }
};

export { RefreshTokenUserController };