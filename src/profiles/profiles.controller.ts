import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
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
	async create(@Body() dto: CreateProfileDto) {
		return await this.profilesService.create(dto);
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
	) {
		return await this.profilesService.update(id, dto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Release one Profile state by ID",
	})
	async remove(@Param("id") id: string) {
		return await this.profilesService.remove(id);
	}
}
