import { api } from "src/helpers/api";
class Loop {
	static countTime = -10;

	static function1(): void {
		setTimeout(() => this.function2(), 600000);
		api.get("/status")
			.then(res => {
				this.countTime += 10;
				console.log("ok", res.data);
			})
			.catch(err => {
				console.log("error", err);
			});
		return console.log("tested");
	}

	static function2(): void {
		setTimeout(() => this.function1(), 600000);
		api.get("/status")
			.then(res => {
				this.countTime += 10;
				console.log("ok", res.data);
			})
			.catch(err => {
				console.log("error", err);
			});
		return console.log("tested");
	}
}

export default Loop;
