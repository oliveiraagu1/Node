import { Router } from "express";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";
const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/session", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/courses", ensureAuthenticated, (req, res) => {

    return res.json([
        { id: 1, name: "NodeJS" },
        { id: 2, name: "ReactJS" },
        { id: 3, name: "React Native" },
        { id: 4, name: "Java" },
        { id: 5, name: "Spring Boot" },
    ]);
})
export { router };