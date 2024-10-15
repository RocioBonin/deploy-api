import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "./enum/role.enum";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async pagination(page: number, limit: number) {
        const offset = (page - 1) * limit;

        return await this.userRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find({
            relations: ['orders']
        });

        return users;
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['orders'],
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return user;
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const existingUser = await this.findEmail(user.email);
        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está en uso')
        }
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async assignAdmin(userId: string): Promise<User> {
        const user = await this.getUserById(userId)

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

         user.administrator = Role.Admin;

        return this.userRepository.save(user)

    }

    async updateUser(id: string, updateUser: UpdateUserDto): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
        }

        const updatedUser = this.userRepository.merge(user, updateUser)

        await this.userRepository.save(updatedUser);

        return updatedUser.id;
    }

    async deleteUser(id: string): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
        }

        await this.userRepository.remove(user);
        return id;
    }

    async findEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }
}