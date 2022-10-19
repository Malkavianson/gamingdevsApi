import { Controller, Get, Res } from "@nestjs/common";
import {
	ApiExcludeEndpoint,
	ApiTags,
} from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Status")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiExcludeEndpoint()
	@Get()
	getAppHome(@Res() res) {
		res.redirect("docs");
	}
	@Get("status")
	getAppStatus(): string {
		return this.appService.getAppStatus();
	}
}
