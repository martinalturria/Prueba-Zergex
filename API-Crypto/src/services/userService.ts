import { Repository } from 'typeorm';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { appDataSource } from '../appDataSource';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
      }

    public async createUser(userData: { username: string; email: string; password: string }): Promise<User> {
        const newUser = this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}