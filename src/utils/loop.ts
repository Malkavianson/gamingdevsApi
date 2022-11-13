import { api } from "src/helpers/api";
class Loop {
	static function1(): void {
		setTimeout(() => this.function2(), 600000);
		api.get("/status")
			.then(() => {
				console.log("ok");
			})
			.catch(() => {
				console.log("Server paralyzed");
				process.kill(0, "SIGINT");
			});
		return console.log("tested");
	}

	static function2(): void {
		setTimeout(() => this.function1(), 600000);
		api.get("/status")
			.then(() => {
				console.log("ok");
			})
			.catch(() => {
				console.log("Server paralyzed");
				process.kill(0, "SIGINT");
			});
		return console.log("tested");
	}
}

export default Loop;
