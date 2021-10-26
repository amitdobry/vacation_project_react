import { io, Socket } from "socket.io-client";
import globals from "./globals";

class SocketService {
  public socket: Socket;
  public connect(): void {
    this.socket = io(globals.justUrl);
  }
  public disconnect(): void {
    this.socket.disconnect();
  }
}

export default SocketService;
