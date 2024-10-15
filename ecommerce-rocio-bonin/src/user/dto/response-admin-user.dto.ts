import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "./response-user.dto";
import { Role } from "../enum/role.enum";

export class AdminUserResponseDto extends UserResponseDto {
    @ApiProperty({
        type: 'enum',
        description: "Indica si el usuario tiene el rol de Administradr"
    })
    administrator: Role;

    constructor(partial: Partial<AdminUserResponseDto>) {
        super(partial);
        this.administrator = partial.administrator;
    }
}