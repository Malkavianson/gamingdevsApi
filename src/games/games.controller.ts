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
	async findAll(): Promise<Game[]> {
		return await this.gameService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one game by ID",
	})
	async findbyId(@Param("id") id: string): Promise<Game> {
		return await this.gameService.findById(id);
	}

	@Get("search/:order/:sort/:length/:page")
	@ApiOperation({
		summary: "Advanced search",
		description: `
**order**: setup orderby  *ex.: (title/year/score/favorites/etc)*\n
**sort**: setup sortedby *ex.: (asc or desc)*\n
**length**: games per page *ex.: ( 10 )*\n
**page**: page of games *ex.: ( 1 )*\n

**ORDER** and **SORT** can receive "" insted blank

		`,
	})
	async advancedSearch(
		@Param("order") order: string,
		@Param("sort") sort: string,
		@Param("length") length: string,
		@Param("page") page: string,
	): Promise<Game[]> {
		return await this.gameService.advancedSearch(
			order,
			sort,
			+length,
			+page,
		);
	}

	@Post()
	@ApiOperation({
		summary: "Register a new game",
	})
	async create(
		@LoggedUser() user: Users,
		@Body() dto: CreateGameDto,
	): Promise<Game> {
		return await this.gameService.create(dto, user);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Update one game by ID",
	})
	async update(
		@LoggedUser() user: Users,
		@Param("id") id: string,
		@Body() dto: UpdateGameDto,
	): Promise<Game> {
		return await this.gameService.update(id, dto, user);
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete one game by ID",
	})
	delete(
		@LoggedUser() user: Users,
		@Param("id") id: string,
	): void {
		this.gameService.delete(id, user);
	}

	@Get("entity/info")
	@ApiOperation({
		summary: "returns number of games",
	})
	async dbinfo(): Promise<number> {
		return await this.gameService.dbinfo();
	}
}
