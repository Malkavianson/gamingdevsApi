import { api } from "src/helpers/api";
class Loop {
	static countTime = -10;

	static function1(): void {
		setTimeout(() => this.function2(), 600000);
		this.countTime += 10;
		api.get("/status")
			.then(res => {
				console.log("ok", res.data);
			})
			.catch(err => {
				console.log("error", err);
			});
		return console.log("tested");
	}

	static function2(): void {
		setTimeout(() => this.function1(), 600000);
		this.countTime += 10;
		api.get("/status")
			.then(res => {
				console.log("ok", res.data);
			})
			.catch(err => {
				console.log("error", err);
			});
		return console.log("tested");
	}

	static convertTime(): string {
		return `for ${(this.countTime / 60 / 24).toFixed(
			0,
		)} days ${((this.countTime / 60) % 24).toFixed(
			0,
		)} hours and ${
			(this.countTime % 60) % 60
		} minutes.`;
	}
}

export default Loop;
