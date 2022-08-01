import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SocketEvents } from "./enum";

export class Pichu {
	private client: W3CWebSocket;
	private connected: boolean = false;
	public constructor(url: string, token: string) {
		this.client = new W3CWebSocket(url + `?token=${token}`);
		this.openConnection();
	}
	private openConnection(): void {
		this.client.onopen = () => {
			this.connected = true;
			console.log("Connected to socket server");
			this.pingServer();
		};
	}
	private pingServer(): void {
		setInterval(() => {
			this.client.send(SocketEvents.PING);
		}, 1000 * 5);
	}
	public sendJSON(object: any): void {
		if (this.connected) {
			this.client.send(JSON.stringify(object));
		}
	}
	public GetJSONMessage(callback: (data: any) => void): void {
		this.client.onmessage = (msg) => {
			let str = msg.data.toString();
			if (str.length > 0 && str !== SocketEvents.PONG) {
				callback(JSON.parse(str));
			}
		};
	}
	public GetStringMessage(callback: (data: any) => void): void {
		this.client.onmessage = (msg) => {
			let str = msg.data.toString();
			if (str.length > 0 && str !== SocketEvents.PONG) {
				callback(str);
			}
		};
	}
}
