import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const localUrl = 'https://atrest.ie/api/getrecent/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
	public geoloc = {latitude : 0, longitude : 0};
	constructor(private http: HttpClient) { }
	getDeathNotices() {
		this.setCurrentLocation();
		return this.http.post(localUrl, this.geoloc);
	}
	private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.geoloc.latitude = position.coords.latitude;
          this.geoloc.longitude = position.coords.longitude;
        });
      }
    }
}
