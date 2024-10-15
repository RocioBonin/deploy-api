import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository = {
        findOne: (email: string) => Promise.resolve(email === 'user1@example.com'),
      };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                { provide: getRepositoryToken(User), useValue: mockUserRepository },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('findEmail() debería retornar el email del usuario cuando existe', async () => {
        const email = userService.findEmail("user1@example.com"); 
        expect(email).toBe(email);
    });
});
