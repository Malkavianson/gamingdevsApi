// class Loop {
// 	static function1(): void {
// 		setTimeout(() => this.function2(), 840000);
// 		return console.log("");
// 	}

import { api } from "src/helpers/api";

// 	static function2(): void {
// 		setTimeout(() => this.function1(), 840000);
// 		return console.log("");
// 	}
// }

class Loop {
	static function1(): void {
		setTimeout(() => this.function2(), 10000);
		api.get("/status").then(res => {
			console.log("res1");
			console.log(res);
		});
		return console.log("");
	}

	static function2(): void {
		setTimeout(() => this.function1(), 1000);
		api.get("/status").then(res => {
			console.log("res2");
			console.log(res);
		});
		return console.log("");
	}
}

export default Loop;
