import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { MatDialog,MatDialogConfig } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FilterComponent } from "../filter/filter.component"
@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit {
	baseUrl = 'https://atrest.ie/api/DeathNotices';
	public deathInfo : any=[];
	public deathdetail : any=[];
	public currentpage;
	public lastpage = 1;
	public searchData={
		firstname: '',
		lastname: '',
		nee:'',
		county:null,
		town:null,
		from:'',
		to:'',
		church:null,
		cemetery:null,
		longitude:null,
		latitude:null,
		geoflag:0
	};
	public filterList = [
		{'id':1, 'label':'Geolocation'},
		{'id':2, 'label':'Today\'s Notices'},
		{'id':3, 'label':'This Weeks Notices'},
		{'id':4, 'label':'This Months Notices'},
		{'id':5, 'label':'By Church'},
		{'id':6, 'label':'By Cemetery'},
	];
	public curSearch;
	public showAlertFlag = 0;
	public loading = 1;
	constructor(private http:HttpClient,
						private route: ActivatedRoute,
						private dataservice:DataService,
						private dialog:MatDialog) {}
	ngOnInit() {
		if(history.state.searchData){
			this.searchData = history.state.searchData;
		}
		this.searchData.latitude = this.dataservice.latitude;
		this.searchData.longitude = this.dataservice.longitude;
		if(history.state.period){
			var period = history.state.period;
			var newdate = new Date();
			if(period=='week'){
				var week = newdate.getDay();
				if(week==0) week=7;
				newdate.setDate(newdate.getDate()-week+1);
			} else {
				var date = newdate.getDate();
				newdate.setDate(newdate.getDate()-date+1);
			}
			this.searchData.from = this.formatDate(newdate);
			this.searchData.to = this.formatDate(new Date());
		}

		this.renderTable();
		this.dataservice.geodisableevent.subscribe(res => {
			this.searchData.geoflag = 0;
			this.renderTable();
		});
		this.dataservice.searchEvent.subscribe(res => {
			this.searchData.church = res.church;
			this.searchData.cemetery = res.cemetery;
			this.searchData.county = res.county;
			this.searchData.town = res.town;
			this.searchData.from = res.from;
			this.searchData.to = res.to;
			this.renderTable();
		});
	}
	renderTable() {
		this.baseUrl = "https://atrest.ie/api/DeathNotices/";
		this.http.post(this.baseUrl, this.searchData).subscribe((res : any[])=>{
			this.deathInfo = res[0];
			this.loading = 0;
		});
	}
	renderByFilter() {
		this.searchData.geoflag = 0;
		switch (this.curSearch) {
			case 1:
				if(this.dataservice.latitude==0 && this.dataservice.longitude==0){
					this.showAlertFlag = 1;
					return true;
				}
				this.searchData.geoflag = 1;
				this.searchData.latitude = this.dataservice.latitude;
				this.searchData.longitude = this.dataservice.longitude;
				this.renderTable();
				break;
			case 2:
				var yesterday = new Date();
				yesterday.setDate(yesterday.getDate()-1);
				this.searchData.from = this.formatDate(yesterday);
				this.searchData.to = this.formatDate(new Date());
				this.renderTable();
				break;
			case 3:
				var newdate = new Date();
				var week = newdate.getDay();
				if(week==0) week=7;
				newdate.setDate(newdate.getDate()-week);
				this.searchData.from = this.formatDate(newdate);
				this.searchData.to = this.formatDate(new Date());
				this.renderTable();
				break;
			case 4:
				var newdate = new Date();
				var date = newdate.getDate();
				newdate.setDate(newdate.getDate()-date+1);
				this.searchData.from = this.formatDate(newdate);
				this.searchData.to = this.formatDate(new Date());
				this.renderTable();
				break;
			case 5:
				this.dataservice.setTarget('church');
				this.dataservice.setPageFlag('search');
				this.dialog.open(FilterComponent);
				break;
			case 6:
				this.dataservice.setTarget('cemetery');
				this.dataservice.setPageFlag('search');
				this.dialog.open(FilterComponent);
				break;
			default:
				this.searchData.from = '';
				this.searchData.to = '';
				this.searchData.town = null;
				this.searchData.county = null;
				this.searchData.church = null;
				this.searchData.cemetery = null;
				this.renderTable();
		}
	}
	formatDate(date) {
		var month = '' + (date.getMonth() + 1),
				day = '' + date.getDate(),
				year = date.getFullYear();

		if (month.length < 2) 
				month = '0' + month;
		if (day.length < 2) 
				day = '0' + day;

		return [year, month, day].join('-');
	}
	toggleflag() {
		this.showAlertFlag = 0;
	}
}
