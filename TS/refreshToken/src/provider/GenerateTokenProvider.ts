import { sign } from "jsonwebtoken";

class GenerateTokenProvider {

    async execute(userId: string) {

        const token = sign({}, "ddc72265-b7a5-4b46-b9d5-663e5e4bf334", {
            subject: userId,
            expiresIn: "20s",
        });

        return token;
    }
}

export { GenerateTokenProvider };