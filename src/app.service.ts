import { Injectable } from "@nestjs/common";
import Loop from "./utils/loop";

@Injectable()
export class AppService {
	getAppStatus(): string {
		return `🤡Running ${
			Loop.countTime > 0
				? Loop.countTime > 59
					? `for ${Loop.countTime / 60} hours `
					: `for ${Loop.countTime} minutes `
				: ""
		} - /docs for short documentation`;
	}
}
