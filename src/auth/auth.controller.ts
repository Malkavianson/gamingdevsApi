import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ResponseLoginDto } from "./dto/responseLogin.dto";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "./loggeduser.decorator";
import { Users } from "src/users/entities/users.entities";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: "Login => returns a auth bearer token",
	})
	async login(
		@Body() loginDto: LoginDto,
	): Promise<ResponseLoginDto> {
		return await this.authService.login(loginDto);
	}

	@Get()
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Returns current user",
	})
	@ApiBearerAuth()
	profile(@LoggedUser() user: Users) {
		return user;
	}
}
