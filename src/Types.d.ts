import { ConnectionMeta } from "./lib/ConnectionMeta";

export type connections = "Connect" | "Wait" | "Once" | "Parrallel";
export type executeConnection = (...args: unknown[]) => unknown;

declare namespace SharedConnection {
	export class SharedConnection {
		constructor(connection: SharedConnection);
		Connect(this: SharedConnection, execute: executeConnection): void;
		Once(this: SharedConnection, execute: executeConnection): void;
		Disconnect(this: SharedConnection): void;
	}
	type FunctionType =
		| ["Once", executeConnection, SharedConnection]
		| [undefined, executeConnection, SharedConnection];

	export type SaveAllConnection = Map<
		RBXScriptSignal,
		{
			saveConnections: FunctionType[];
			MetaConnection: ConnectionMeta.MetaConnection<RBXScriptConnection>;
			isConnected: boolean;
		}
	>;
}
