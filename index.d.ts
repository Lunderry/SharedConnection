import { executeConnection } from "./src/Types";

export default class {
	constructor(rbxScriptSignal: RBXScriptSignal);
	Connect(this: this, execute: executeConnection): void;
	Once(this: this, execute: executeConnection): void;
	Disconnect(this: this): void;
}
