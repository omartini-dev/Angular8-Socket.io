import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
	messages: Subject<any>;

	// Our constructor calls our wsService connect method
	constructor(private wsService: WebsocketService) {

		this.messages = <Subject<any>>wsService
			.connect()
			.map((response: any): any => {
				return response;
			})
	}

	// Our simplified interface for sending
	// messages back to our socket.io server
	sendMsg(msg) {
		this.messages.next(msg);
	}
	sendChurch(msg) {
		msg['room'] = 'church';
		this.messages.next(msg);
	}
	sendCemetery(msg) {
		msg['room'] = 'cemetery';
		this.messages.next(msg);
	}
	sendRecent(msg) {
		msg['room'] = 'recent';
		this.messages.next(msg);
	}
	sendInitRecent(msg) {
		msg['room'] = 'init-recent';
		this.messages.next(msg);
	}
}
