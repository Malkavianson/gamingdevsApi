import { Controller, Get, Res } from "@nestjs/common";
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

	@Get("stop")
	@ApiOperation({
		summary: "Paralyzes the server",
	})
	getAppStop(): void {
		console.log("Server paralyzed");
		process.kill(0, "SIGINT");
	}
}
