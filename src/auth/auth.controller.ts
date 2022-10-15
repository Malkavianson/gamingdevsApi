import { ResponseLoginDto } from "./dto/responseLogin.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@ApiOperation({
		summary: "login",
	})
	async login(@Body() dto: LoginDto): Promise<ResponseLoginDto> {
		return await this.authService.login(dto);
	}
}
