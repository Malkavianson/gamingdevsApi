import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	ImATeapotException,
	Param,
	Patch,
	Post,
	UnauthorizedException,
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
import { Profiles } from "src/profiles/entities/profiles.entities";
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
	async create(@Body() dto: CreateUserDto): Promise<{
		id: string;
		name: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
	}> {
		return await this.usersService.create(dto);
	}

	@Get()
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns all users",
	})
	async findAll(): Promise<
		{
			id: string;
			name: string;
			email: string;
			updatedAt: Date;
			createdAt: Date;
		}[]
	> {
		return await this.usersService.findAll();
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Returns one User by ID",
	})
	async findOne(@Param("id") id: string): Promise<{
		id: string;
		isAdmin: boolean;
		cpf: string;
		profile: Profiles[];
		name: string;
		email: string;
		updatedAt: Date;
		createdAt: Date;
	}> {
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
	): Promise<
		| ImATeapotException
		| {
				id: string;
				name: string;
				email: string;
				createdAt: Date;
				updatedAt: Date;
		  }
	> {
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
	): Promise<
		| {
				id: string;
				name: string;
				email: string;
				updatedAt: Date;
				createdAt: Date;
		  }
		| UnauthorizedException
	> {
		return await this.usersService.remove(id, user);
	}

	@Get("/recover/:email")
	@ApiOperation({
		summary:
			"Returns email with link for change password",
	})
	async recoverPassword(
		@Param("email") email: string,
	): Promise<{ message: string }> {
		return await this.usersService.findUserForEmail(
			email,
		);
	}
}
