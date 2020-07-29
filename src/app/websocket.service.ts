import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
	private socket;
	public latitude = 0;
	public longitude = 0;
	constructor() { }
	connect(): Rx.Subject<MessageEvent> {
		this.setCurrentLocation();
		this.socket = io(environment.ws_url, {
			secure:true,
			rejectUnauthorized: false,
			path: '/socket/socket.io'
		});
		this.socket.emit("login", {
			name: "user" + new Date().getTime(),
			latitude: this.latitude,
			longitude: this.longitude
		});
		let observable = new Observable(observer => {
			this.socket.on('chat', (data) => {
				observer.next({'room':'chat', 'data':data});
			})
			this.socket.on('recent', (data) => {
				observer.next({'room':'recent', 'data':data});
			})
			this.socket.on('church', (data) => {
				observer.next({'room':'church', 'data':data});
			})
			this.socket.on('cemetery', (data) => {
				observer.next({'room':'cemetery', 'data':data});
			})
			this.socket.on('init-recent', (data) => {
				observer.next({'room':'init-recent', 'data':data});
			})
			return () => {
				this.socket.disconnect();
			}
		});

		let observer = {
			next: (data: Object) => {
				if(! data.hasOwnProperty('room'))
					data['room']='recent';

				data['latitude']=this.latitude;
				data['longitude']=this.longitude;
				this.socket.emit(data['room'], JSON.stringify(data));
			}
		};

		return Rx.Subject.create(observer, observable);
	}

	private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      }
    }
}
