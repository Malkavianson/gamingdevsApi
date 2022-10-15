import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "User CPF document",
		example: "83113205603",
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
