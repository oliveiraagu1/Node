import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized!"
        });
    };

    const [, token] = authToken.split(" ");
    try {
        verify(token, "ddc72265-b7a5-4b46-b9d5-663e5e4bf334");
        return next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Token invalid!"
        });
    };
};