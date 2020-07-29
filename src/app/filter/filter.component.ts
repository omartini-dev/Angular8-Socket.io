import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from  '@angular/material';
import { DataService } from '../data.service';
import { GetdataService } from './../getdata.service';
@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
	public counties;
	public towns;
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
	public target='';
	public churches:any = [];
	public cemeteries:any = [];
	public curchurches:any = [];
	public curcemeteries:any = [];
	public currentTown: any=[];
	public today = new Date();
	public previousmonth;
	public page='home';
	constructor(
		private dialogRef:MatDialogRef<FilterComponent>,
		private getdata: GetdataService,
		private dataservice:DataService) { }

	ngOnInit() {
		this.target = this.dataservice.ptarget;
		this.page = this.dataservice.page;
		this.previousmonth = new Date(this.today);
		this.previousmonth.setMonth(this.today.getMonth()-1);
		var getdata;
		switch(this.target) {
			case 'church':
				getdata = this.dataservice.getChurchFilter();
				this.searchData.church = getdata.church;
				this.searchData.county = getdata.county;
				this.searchData.town = getdata.town;
				this.searchData.from = getdata.from;
				this.searchData.to = getdata.to;

				break;
			case 'cemetery':
				getdata = this.dataservice.getCemFilter();
				this.searchData.cemetery = getdata.cemetery;
				this.searchData.county = getdata.county;
				this.searchData.town = getdata.town;
				this.searchData.from = getdata.from;
				this.searchData.to = getdata.to;
				break;
			case 'today':
				getdata = this.dataservice.getRecentFilter();
				this.searchData.firstname = getdata.firstname;
				this.searchData.lastname = getdata.lastname;
				this.searchData.county = getdata.county;
				this.searchData.town = getdata.town;
				break;
		}
		[this.counties, this.towns] = this.dataservice.getCountytown();
		[this.churches, this.cemeteries] = this.dataservice.getCCdata();
		this.currentTown=[];
		for (let index = 0; index < this.towns.length; index++) {
			if(this.towns[index].county_id == this.searchData.county){
				this.currentTown.push(this.towns[index]);
			}
		}
		this.curchurches = this.churches;
		this.curcemeteries = this.cemeteries;
	}
	setData() {
		if(this.page=='search'){
			this.setSearchData();
			return true;
		}
		var data;
		switch(this.target) {
			case 'church':
				data = {
					'church':this.searchData.church,
					'county':this.searchData.county,
					'town':this.searchData.town,
					'from':this.searchData.from,
					'to':this.searchData.to
				};
				this.dataservice.setChurchFilter(data);
				data['geoflag'] = this.dataservice.geoFlag;
				this.getdata.sendChurch(data);
				break;
			case 'cemetery':
				data = {
					'cemetery':this.searchData.cemetery,
					'county':this.searchData.county,
					'town':this.searchData.town,
					'from':this.searchData.from,
					'to':this.searchData.to
				};
				this.dataservice.setCemFilter(data);
				data['geoflag'] = this.dataservice.geoFlag;
				this.getdata.sendCemetery(data);
				break;
			case 'today':
				data = {
					'firstname':this.searchData.firstname,
					'lastname':this.searchData.lastname,
					'county':this.searchData.county,
					'town':this.searchData.town,
					'from':this.searchData.from,
					'to':this.searchData.to
				};
				this.dataservice.setRecentFilter(data);
				data['geoflag'] = this.dataservice.geoFlag;
				this.getdata.sendRecent(data);
				this.getdata.sendInitRecent(data);
				break;
		}
		
		this.dialogRef.close();
	}
	setSearchData() {
		var data;
		switch(this.target) {
			case 'church':
				data = {
					'church':this.searchData.church,
					'county':this.searchData.county,
					'town':this.searchData.town,
					'from':this.searchData.from,
					'to':this.searchData.to,
					'cemetery':null
				};
				this.dataservice.searchByChurchFilter(data);
				break;
			case 'cemetery':
				data = {
					'cemetery':this.searchData.cemetery,
					'county':this.searchData.county,
					'town':this.searchData.town,
					'from':this.searchData.from,
					'to':this.searchData.to,
					'church':null
				};
				this.dataservice.searchByCemFilter(data);
				break;
		}
		this.dialogRef.close();
	}
	selectChangeHandler() {
		this.searchData.town = null;
		this.currentTown=[];
		for (let index = 0; index < this.towns.length; index++) {
			if(this.towns[index].county_id == this.searchData.county){
				this.currentTown.push(this.towns[index]);
			}
		}
		if(this.searchData.county!=null){
			this.curchurches = [];
			for (let index = 0; index < this.churches.length; index++) {
				if(this.churches[index].county_id == this.searchData.county){
					this.curchurches.push(this.churches[index]);
				}
			}
			this.curcemeteries = [];
			for (let index = 0; index < this.cemeteries.length; index++) {
				if(this.cemeteries[index].county_id == this.searchData.county){
					this.curcemeteries.push(this.cemeteries[index]);
				}
			}
		} else {
			this.curchurches = this.churches;
			this.curcemeteries = this.cemeteries;
		}
	}
	townChangeHandler() {
		if(this.searchData.town!=null){
			this.curchurches = [];
			for (let index = 0; index < this.churches.length; index++) {
				if(this.churches[index].town_id == this.searchData.town){
					this.curchurches.push(this.churches[index]);
				}
			}
			this.curcemeteries = [];
			for (let index = 0; index < this.cemeteries.length; index++) {
				if(this.cemeteries[index].town_id == this.searchData.town){
					this.curcemeteries.push(this.cemeteries[index]);
				}
			}
		}
	}
	selectFromDateHandler(event: any) {
		if(typeof(event.year)!='undefined')
			this.searchData.from = event.year + '-' + (event.month.toString().length==1?'0':'') +event.month+'-' + (event.day.toString().length==1?'0':'')+event.day;
		else
			this.searchData.from = event.target.value;
	}
	selectToDateHandler(event: any) {
		if(typeof(event.year)!='undefined')
			this.searchData.to = event.year + '-' + (event.month.toString().length==1?'0':'') +event.month+'-' + (event.day.toString().length==1?'0':'')+event.day;
		else
			this.searchData.to = event.target.value;
	}
}
