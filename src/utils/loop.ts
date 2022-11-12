class Loop {
	static function1(): void {
		setTimeout(() => this.function2(), 840000);
		return console.log("");
	}

	static function2(): void {
		setTimeout(() => this.function1(), 840000);
		return console.log("");
	}
}

export default Loop;
