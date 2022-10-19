import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/entities/users.entities";

export class ResponseLoginDto {
	@ApiProperty({
		description: "Login Token",
		example:
			"asiudjklasnafjlskcsmn80wrioklqaq3uoa.auisdjnklxc82839qiwdoascmkshureqwdjpasmkglçmefwjioahvunjsadlskmrlçwmefapjd.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	})
	token: string;

	@ApiProperty({
		description: "User Data",
	})
	user: Users;
}
