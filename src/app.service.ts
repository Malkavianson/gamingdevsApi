import { Injectable } from "@nestjs/common";
import Loop from "./utils/loop";

@Injectable()
export class AppService {
	getAppStatus(): string {
		return `🤡Running ${Loop.convertTime()} - /docs for short documentation`;
	}
}
