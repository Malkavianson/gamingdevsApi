import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class Logger implements NestMiddleware {
	use(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		const data = {
			method: req.method,
			baseURL: req.baseUrl,
			header: req.headers.authorization,
			body: req.body,
			status: res.statusCode,
		};
		console.log(data);
		next();
	}
}
