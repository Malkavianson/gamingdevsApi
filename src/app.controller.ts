import {
	Controller,
	Get,
	NotImplementedException,
	Param,
	Res,
} from "@nestjs/common";
import {
	ApiExcludeEndpoint,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Status")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiExcludeEndpoint()
	@Get()
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	getAppHome(@Res() res): void {
		res.redirect("docs");
	}
	@Get("status")
	getAppStatus(): string {
		return this.appService.getAppStatus();
	}

	@Get("stop/:token")
	@ApiOperation({
		summary: "Paralyzes the server",
	})
	getAppStop(@Param("token") token: string): void {
		if (token === process.env.INTERRUPTER_TOKEN) {
			console.log("Server paralyzed");
			process.kill(0, "SIGINT");
		} else {
			console.log("wrong token");
		}
		throw new NotImplementedException();
	}
}
