import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { LoggedUser } from "src/auth/loggeduser.decorator";
import { Users } from "src/users/entities/users.entities";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Game } from "./entities/game.entities";
import { GameService } from "./games.service";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Games")
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller("games")
export class GamesController {
	constructor(
		private readonly gameService: GameService,
	) {}

	@Get()
	@ApiOperation({
		summary: "Find all games",
	})
	findAll(): Promise<Game[]> {
		return this.gameService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one game by ID",
	})
	findbyId(@Param("id") id: string): Promise<Game> {
		return this.gameService.findById(id);
	}

	@Post()
	@ApiOperation({
		summary: "Register a new game",
	})
	create(
		@LoggedUser() user: Users,
		@Body() dto: CreateGameDto,
	): Promise<Game> {
		return this.gameService.create(dto, user);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Update one game by ID",
	})
	update(
		@LoggedUser() user: Users,
		@Param("id") id: string,
		@Body() dto: UpdateGameDto,
	): Promise<Game> {
		return this.gameService.update(id, dto, user);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete one game by ID",
	})
	delete(
		@LoggedUser() user: Users,
		@Param("id") id: string,
	) {
		this.gameService.delete(id, user);
	}
}
