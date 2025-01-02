export type executeConnection = (...args: unknown[]) => unknown;

export class SharedConnection {
	constructor(connection: SharedConnection);
	Connect(this: SharedConnection, execute: executeConnection): void;
	Once(this: SharedConnection, execute: executeConnection): void;
	Disconnect(this: SharedConnection): void;
}

type FunctionType = ["Once", executeConnection, SharedConnection] | [undefined, executeConnection, SharedConnection];

export type SaveAllConnection = Map<
	RBXScriptSignal,
	{
		saveConnections: FunctionType[];
		MetaConnection: RBXScriptConnection | undefined;
		isConnected: boolean;
	}
>;
