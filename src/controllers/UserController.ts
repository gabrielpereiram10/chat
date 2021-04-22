import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async create(request: Request, resonse: Response) {
        const { email } = request.body
        const userService = new UserService()
        const user = await userService.create(email)
        return resonse.json(user)
    }
}

export { UserController }