import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "src/auth/loggeduser.decorator";
import { Users } from "./entities/users.entities";

@ApiTags("Users")
@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@Post()
	@ApiOperation({
		summary: "Create a new User",
	})
	async create(@Body() dto: CreateUserDto) {
		return await this.usersService.create(dto);
	}

	@Get()
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns all users",
	})
	async findAll() {
		return await this.usersService.findAll();
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns one User by ID",
	})
	async findOne(@Param("id") id: string) {
		return await this.usersService.findOne(id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Patch one User by ID",
	})
	async update(
		@LoggedUser() user: Users,
		@Param("id") id: string,
		@Body() dto: UpdateUserDto,
	) {
		return await this.usersService.update(
			id,
			dto,
			user,
		);
	}

	@Delete(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete one User by ID",
	})
	async remove(
		@LoggedUser() user: Users,
		@Param("id") id: string,
	) {
		return await this.usersService.remove(id, user);
	}
}
