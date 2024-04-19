import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { hashPassword } from '../utils/hashPassword';
import { sign } from 'jsonwebtoken';  

export class UserController {
    private userService: UserService = new UserService();

    public register = async (req: Request, res: Response): Promise<Response> => {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = await this.userService.createUser({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json(newUser);
    };

    public authenticate = async (req: Request, res: Response): Promise<Response> => {
        const { username, password } = req.body;
        try {
            const user = await this.userService.validateUser(username, password);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
            return res.json({ user, token });
        } catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({ error: e.message });
            } else {
                return res
                    .status(500)
                    .json({ error: "An unknown error occurred" });
            }
        }
    };
}
