import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ username, password }: IRequest) {

        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if(!userAlreadyExists){
            throw new Error("User or password incorrect!");
        };

        // Verificar se a senha está correta
        const passwordMatch = compare(password, userAlreadyExists.password);

        if(!passwordMatch){
            throw new Error("User or password incorrect!");
        };

        // Gerar token
       const generateTokenProvider = new GenerateTokenProvider();
       const token = await generateTokenProvider.execute(userAlreadyExists.id);

       await client.refreshToken.deleteMany({
           where:{
               userId: userAlreadyExists.id
           }
       });

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

        return { token, refreshToken };

    };
    
};

export { AuthenticateUserUseCase };