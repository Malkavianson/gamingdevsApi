import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GendersService } from "./genders.service";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { Gender } from "./entities/gender.entity";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UpdateGenderDto } from "./dto/update-gender.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Genders")
@Controller("genders")
export class GendersController {
	constructor(private readonly genderService: GendersService) {}

	@Get()
	@ApiOperation({
		summary: "List all game genders",
	})
	async findAll(): Promise<Gender[]> {
		return await this.genderService.findAll();
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Find one gender by ID",
	})
	async findOne(@Param("id") id: string): Promise<Gender> {
		return await this.genderService.findOne(id);
	}

	@Post()
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Register a new Gender",
	})
	async create(@Body() dto: CreateGenderDto): Promise<Gender> {
		return await this.genderService.create(dto);
	}

	@Patch(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@ApiOperation({
		summary: "Patch a gender by ID",
	})
	async update(@Param("id") id: string, @Body() dto: UpdateGenderDto): Promise<Gender> {
		return await this.genderService.update(id, dto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: "Delete a gender by ID",
	})
	async delete(@Param("id") id: string) {
		return await this.genderService.delete(id);
	}
}
