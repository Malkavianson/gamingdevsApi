import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getAppStatus(): string {
		return "🤡Running - http://localhost:3333/docs for documentation";
	}
}
