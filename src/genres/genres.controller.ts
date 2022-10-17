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
import { GenresService } from "./genres.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { Genre } from "./entities/genre.entity";
import {
	ApiTags,
	ApiOperation,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { AuthGuard } from "@nestjs/passport";
import { Users } from "src/users/entities/users.entities";
import { LoggedUser } from "src/auth/loggeduser.decorator";

@ApiTags("Genres")
@Controller("genres")
export class GenresController {
	constructor(
		private readonly genreservice: GenresService,
	) {}

	@Get()
	@ApiOperation({
		summary: "List all game genres",
	})
	async findAll(): Promise<Genre[]> {
		return await this.genreservice.findAll();
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Find one genre by ID",
	})
	async findOne(@Param("id") id: string): Promise<Genre> {
		return await this.genreservice.findOne(id);
	}

	@Post()
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Register a new Genre",
	})
	async create(
		@LoggedUser() user: Users,
		@Body() dto: CreateGenreDto,
	): Promise<Genre> {
		return await this.genreservice.create(dto, user);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Patch a genre by ID",
	})
	async update(
		@LoggedUser() user: Users,
		@Param("id") id: string,
		@Body() dto: UpdateGenreDto,
	): Promise<Genre> {
		return await this.genreservice.update(
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
		summary: "Delete a genre by ID",
	})
	async delete(
		@LoggedUser() user: Users,
		@Param("id") id: string,
	) {
		return await this.genreservice.delete(id, user);
	}
}
