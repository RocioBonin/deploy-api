import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../Auth/authGuard/auth.guard";
import { UserResponseDto } from "./dto/response-user.dto";
import { RolesGuard } from "../guards/role.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "./enum/role.enum";
import { AdminUserResponseDto } from "./dto/response-admin-user.dto";
import { ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@ApiBearerAuth()
@ApiTags('Users')
@ApiExtraModels(User)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('page')
    findWithPagination (
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
    ) {
        return this.userService.pagination(page, limit)
    }
 
    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getAllUsers() {
        const users = await this.userService.getAllUsers();  
        return users.map(user => new AdminUserResponseDto(user))       
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        const user = await this.userService.getUserById(id);
        
        return new UserResponseDto({
            ...user,
            orders: user.orders.map((order) => ({
                id: order.id,
                date: order.date,
            }))
        })
    }

    @Patch(':id/admin')
    async assignAdmin(@Param('id') id: string) {
        return this.userService.assignAdmin(id)
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {
        await this.userService.updateUser(id, user);
        return { id };
    }

    @Delete(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        await this.userService.deleteUser(id);
        return { id };
    }
}