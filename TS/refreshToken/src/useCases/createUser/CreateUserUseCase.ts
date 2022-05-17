import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
    name: string;
    password: string;
    username: string;
}

class CreateUserUseCase{

    async execute({ name, password, username }: IUserRequest){

        // Verificar se usuário existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if(userAlreadyExists){
            throw new Error("User already exists!");
        }

        // Cripitografando password... 
        const passwordHash = await hash(password, 8);

        // Cadastra usuário 
        const user = await client.user.create({
            data: {
                name,
                username,
                password: passwordHash
            }
        });

        return user;
    }
}

export { CreateUserUseCase };