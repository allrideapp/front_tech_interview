import { Component } from '@angular/core';
import { WebSocketService } from 'src/services/web-socket-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private webSocketService: WebSocketService){
    
  }

  async ngOnInit(){
    this.webSocketService.connect();

    this.handleSocketConnections();

    /* Socket messages on connection and error handling */
    this.webSocketService.on('connect', (error, callback) => {
			console.log('\x1b[36m%s\x1b[0m', "=========== Connected succesfully to socket ============");
      console.log("On room:", this.webSocketService.ioSocket.query.room);
		});

    this.webSocketService.on('reconnect', (error, callback) => {
      console.log('\x1b[36m%s\x1b[0m', "=========== Connection was lost. Reconnected succesfully ============");
      console.log(this);
			this.webSocketService.connect();
		});

		this.webSocketService.on('connect_error', (error, callback) => {
      console.log('\x1b[36m%s\x1b[0m', "=========== Error with socket ============");
      console.log(error);
		});
  }

  getCurrentClients(){
    this.webSocketService.emit('getClients');
  }

  /* == Socket methods == */
  handleSocketConnections() {
    /* Subscribes to a socket event, in order to print them on console. You can edit this if necessary. */
    this.getClients().subscribe(data => {
			console.log('\x1b[36m%s\x1b[0m', "============= Current Clients ==========");
      console.log(data);
		});
  }

  getClients() {
		return this.webSocketService.fromEvent<any>('getClients');
	}
}
