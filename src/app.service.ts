import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getAppStatus(): string {
		return "🤡Running - /docs for short documentation";
	}
}
