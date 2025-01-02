import { executeConnection, SaveAllConnection } from "./Types";

const saveAllConnection: SaveAllConnection = new Map();
let countId = 0;
export default class {
	private RBXScriptSignal: RBXScriptSignal;
	private id: number;

	constructor(rbxScriptSignal: RBXScriptSignal) {
		countId++;

		this.id = countId;
		this.RBXScriptSignal = rbxScriptSignal;

		const get = saveAllConnection.get(rbxScriptSignal);
		if (get !== undefined) {
			return;
		}

		saveAllConnection.set(rbxScriptSignal, {
			saveConnections: [],
			MetaConnection: undefined,
			isConnected: false,
		});
	}

	private _connect(execute: executeConnection, typeWork: "Once" | undefined): void {
		const get = saveAllConnection.get(this.RBXScriptSignal);

		if (get === undefined) {
			// print(this.RBXScriptSignal, "no exist");
			return;
		}

		if (get.isConnected === true) {
			get.saveConnections[this.id] = [typeWork, execute, this];
			saveAllConnection.set(this.RBXScriptSignal, get);
			return;
		}

		get.isConnected = true;
		saveAllConnection.set(this.RBXScriptSignal, get);

		get.MetaConnection = this.RBXScriptSignal.Connect((...args: unknown[]) => {
			get.saveConnections.forEach((v) => {
				const [work, callback, sharedConnection] = v;
				callback(...args);

				if (work === "Once") {
					sharedConnection.Disconnect();
				}
			});
		});
	}
	public Connect(execute: executeConnection): void {
		this._connect(execute, undefined);
		// this.RBXScriptSignal.Connect(this.executed);
	}
	public Once(execute: executeConnection): void {
		this._connect(execute, "Once");
	}

	public Disconnect(): void {
		const _get = saveAllConnection.get(this.RBXScriptSignal);
		if (_get === undefined) {
			return;
		}
		_get.saveConnections.remove(this.id);
		saveAllConnection.set(this.RBXScriptSignal, _get);

		//remove all connections
		if (_get.saveConnections.size() === 0) {
			_get.isConnected = false;

			if (_get.MetaConnection) {
				_get.MetaConnection?.Disconnect();
				_get.MetaConnection = undefined;
			}
			saveAllConnection.delete(this.RBXScriptSignal);
		}
	}
}
