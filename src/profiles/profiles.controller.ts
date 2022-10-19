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
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfilesService } from "./profiles.service";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "src/auth/loggeduser.decorator";
import { Users } from "src/users/entities/users.entities";

@UseGuards(AuthGuard())
@ApiTags("Profiles")
@ApiBearerAuth()
@Controller("profiles")
export class ProfilesController {
	constructor(
		private readonly profilesService: ProfilesService,
	) {}

	@Post()
	@ApiOperation({
		summary: "Fill a new profile state",
	})
	async create(
		@Body() dto: CreateProfileDto,
		@LoggedUser() user: Users,
	) {
		return await this.profilesService.create(dto, user);
	}

	@Get()
	@ApiOperation({
		summary: "List all Profiles",
	})
	async findAll() {
		return await this.profilesService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one Profile by ID",
	})
	async findOne(@Param("id") id: string) {
		return await this.profilesService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch Profile state information",
	})
	async update(
		@Param("id") id: string,
		@Body() dto: UpdateProfileDto,
		@LoggedUser() user: Users,
	) {
		return await this.profilesService.update(
			id,
			dto,
			user,
		);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Release one Profile state by ID",
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(
		@Param("id") id: string,
		@LoggedUser() user: Users,
	) {
		return await this.profilesService.remove(id, user);
	}
}
