import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	public ccUrl = 'https://atrest.ie/api/getCCdata/';
	public misUrl = 'https://atrest.ie/api/getmisdata/';
	public counties;
	public towns;
	public churches;
	public cemeteries;
	public ptarget;
	public churchFilter = {
		'church':null,
		'county':null,
		'town':null,
		'from':'',
		'to':'',
	};
	public cemFilter = {
		'cemetery':null,
		'county':null,
		'town':null,
		'from':'',
		'to':'',
	};
	public recentFilter = {
		'firstname':'',
		'lastname':'',
		'county':null,
		'town':null
	};
	public cemdeath : any=[];
	public chudeath : any=[];
	public cemLastId;
	public chuLastId;
	public geoFlag = 0;
	public latitude = 0;
	public longitude = 0;
	public page = 'home';
	@Output() change: EventEmitter<any> = new EventEmitter();
	@Output() getcc: EventEmitter<any> = new EventEmitter();
	@Output() geoevent: EventEmitter<any> = new EventEmitter();
	@Output() geodisableevent: EventEmitter<any> = new EventEmitter();
	@Output() searchEvent: EventEmitter<any> = new EventEmitter();
	constructor(private http:HttpClient) {
		this.http.get(this.misUrl).subscribe((res : any[])=>{
			this.counties = res[0];
			this.towns = res[1];
			this.churches = res[2];
			this.cemeteries = res[3];
			this.change.emit([this.counties, this.towns, this.churches, this.cemeteries]);
		});
		this.http.get(this.ccUrl).subscribe((res : any[])=>{
			this.cemdeath = res[0];
			this.chudeath = res[1];
			this.cemLastId = res[0][0]['id'];
			this.chuLastId = res[1][0]['id'];
			this.getcc.emit([this.cemdeath, this.chudeath]);
		});
		this.setCurrentLocation();
	}
	sendHeader(){
		this.geoevent.emit([1]);
	}
	modifyDNList(){
		this.geoFlag = 0;
		this.geodisableevent.emit([0]);
	}
	getCountytown(){
		return [this.counties, this.towns];
	}
	getCCdata(){
		return [this.churches, this.cemeteries];
	}
	setTarget($event) {
		this.ptarget = $event;
	}
	setPageFlag($event) {
		this.page = $event;
	}
	setChurchFilter($event) {
		this.churchFilter = $event;
	}
	searchByChurchFilter($event) {
		this.setChurchFilter($event);
		this.searchEvent.emit($event);
	}
	setCemFilter($event) {
		this.cemFilter = $event;
	}
	searchByCemFilter($event) {
		this.setCemFilter($event);
		this.searchEvent.emit($event);
	}
	setRecentFilter($event) {
		this.recentFilter = $event;
	}

	getChurchFilter() {
		return this.churchFilter;
	}
	getCemFilter() {
		return this.cemFilter;
	}
	getRecentFilter() {
		return this.recentFilter;
	}
	setGeoFlag (val) {
		this.geoFlag = val;
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
