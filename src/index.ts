import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SocketEvents } from "./enum";

export class Pichu {
  private client: W3CWebSocket;
  private connected: boolean = false;
  private lastPing: Date = new Date();
  public constructor(url: string, token: string) {
    this.client = new W3CWebSocket(url + `?token=${token}`);
    this.openConnection();
  }
  private openConnection(): void {
    this.client.onopen = () => {
      this.connected = true;
      console.log("Connected to socket server");
      this.pingServer();
      this.lastPing = new Date();
      setInterval(() => {
        this.monitorConnection();
      }, 1000 * 10);
    };
  }

  private monitorConnection(): void {
    //check if the last ping was more than 10 seconds ago
    if (new Date().getTime() - this.lastPing.getTime() > 1000 * 10) {
      //if so, reconnect
      this.client.close();
      this.openConnection();
    }
    // if (this.lastPing )
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
    this.client.onmessage = (msg: any) => {
      let str = msg.data.toString();
      if (str.length > 0 && str !== SocketEvents.PONG) {
        callback(JSON.parse(str));
      } else if (str == SocketEvents.PONG) {
        this.lastPing = new Date();
      }
    };
  }
  public GetStringMessage(callback: (data: any) => void): void {
    this.client.onmessage = (msg: any) => {
      let str = msg.data.toString();
      if (str.length > 0 && str !== SocketEvents.PONG) {
        callback(str);
      }
    };
  }
}
