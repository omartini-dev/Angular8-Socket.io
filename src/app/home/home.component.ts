import { Component, OnInit, Input } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Death } from '../Death';

import { map } from 'rxjs/operators';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { ApiService } from './../api.service';
import { GetdataService } from './../getdata.service';
import { DataService } from '../data.service';
import {FilterComponent} from "../filter/filter.component"
import {MatDialog,MatDialogConfig} from "@angular/material";
declare var $: any;
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public baseUrl = 'https://atrest.ie/api/gettodays/';
	
	public deathInfo : any=[];
	public recentdeath : any=[];
	public cemdeath : any=[];
	public chudeath : any=[];
	public neighbourdeath : any=[];
	public deathdetail : any=[];
	public geolocflag = 0;
	public currentpage;
	public lastpage;
	public searchData={
		firstname: '',
		lastname: '',
		nee:'',
		county:null,
		town:null,
		from:'',
		to:'',
		church:null,
		cemetery:null
	};
	public geoloc = {latitude : 0, longitude : 0, flag : 0};
	public showAlertFlag = 0;
	public loading = 1;
	constructor(private http:HttpClient,
				private route: ActivatedRoute,
				private router: Router,
				private api: ApiService,
				private getdata: GetdataService,
				private dataservice: DataService,
				private dialog:MatDialog,
				) {
	}

	ngOnInit() {
		this.geoloc.latitude = this.dataservice.latitude;
		this.geoloc.longitude = this.dataservice.longitude;
		this.dataservice.getCountytown();
		this.getdata.messages.subscribe(res => {
			if(res.room=='recent'){
				this.loading = 0;
				var parseData = JSON.parse(res.data.msg);
				for(var i=0; i < parseData[0].length; i++){
					this.recentdeath.unshift(parseData[0][i]);
					if(this.recentdeath.length > 9)
						this.recentdeath.pop();
				}
			}
			if(res.room=='init-recent'){
				var parseData = JSON.parse(res.data.msg);
				this.recentdeath = parseData[0];
				this.loading = 0;
			}
		});
		this.geoloc.flag = this.dataservice.geoFlag;
		this.http.post(this.baseUrl, this.geoloc).subscribe((res : any[])=>{
			this.loading = 0;
			this.recentdeath = res[0];
			if(this.recentdeath.length > 0)
				this.getdata.sendRecent({'last_id':this.recentdeath[0]['id']});
		});
		this.dataservice.geodisableevent.subscribe(res => {
			this.geoloc.flag = 0;
			this.http.post(this.baseUrl, this.geoloc).subscribe((res : any[])=>{
				this.recentdeath = res[0];
				if(this.recentdeath.length > 0)
					this.getdata.sendRecent({'last_id':this.recentdeath[0]['id']});
			});
	    });
	}
	GetSearchVal(SearchVal: any){
		this.searchData = SearchVal;
		this.router.navigate(['/deathnotices'], {state: {searchData: this.searchData}});
	}
    openfilter() {
		this.dataservice.setTarget('today');
		this.dialog.open(FilterComponent);
	}
	goGeoLoc() {
		if(this.dataservice.latitude==0 && this.dataservice.longitude==0){
			this.showAlertFlag = 1;
			return true;
		}
		this.dataservice.setGeoFlag(1);
		var data = {'geoflag':1};
		this.getdata.sendCemetery(data);
		this.getdata.sendChurch(data);
		this.dataservice.sendHeader();
		this.geoloc.flag = 1;
		this.http.post(this.baseUrl, this.geoloc).subscribe((res : any[])=>{
			this.recentdeath = res[0];
			if(this.recentdeath.length > 0)
				this.getdata.sendRecent({'last_id':this.recentdeath[0]['id']});
		});
		//this.router.navigate(['/home'], {state: {geo: this.geoloc}});
	}
	goWeek () {
		this.router.navigate(['/deathnotices'], {state: {period: 'week'}});
	}
	goMonth () {
		this.router.navigate(['/deathnotices'], {state: {period: 'month'}});
	}
	scrolltop () {
		$(window).scrollTop(0);
	}
	toggleflag() {
		this.showAlertFlag = 0;
	}
}
