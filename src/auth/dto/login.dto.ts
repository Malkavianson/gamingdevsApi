import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
	@IsString()
	@ApiProperty({
		description: "User CPF document",
		example: "831.132.056-03",
	})
	cpf: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "User password",
		example: "1234@Abcd",
	})
	password: string;
}
