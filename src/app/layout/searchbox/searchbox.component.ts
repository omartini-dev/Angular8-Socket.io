import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
	@Output() outputToParent = new EventEmitter<string>();
	public hoverFlag = 0;
	public counties;
	public towns;
	public churches;
	public cemeteries;
	public currentCounty = -1;
	public currentTown: any=[];
	public today = new Date();
	public previousmonth;
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
	constructor(private dataservice:DataService) {
	}

	ngOnInit() {
		//this.previousmonth = new Date(this.today);
		//this.previousmonth.setMonth(this.today.getMonth()-1);
		this.searchData.from = '';
		this.searchData.to = '';
		this.dataservice.change.subscribe(res => {
			[this.counties, this.towns, this.churches, this.cemeteries] = res;
		});
		[this.counties, this.towns] = this.dataservice.getCountytown();
		if(history.state.searchData){
			this.searchData = history.state.searchData;
			this.today = new Date(this.searchData.to);
			this.previousmonth = new Date(this.searchData.from);
		}
		if(history.state.period){
			var period = history.state.period;
			var newdate = new Date();
			if(period=='week'){
				var week = newdate.getDay();
				if(week==0) week=7;
				newdate.setDate(newdate.getDate()-week+1);
				this.previousmonth = newdate;
			} else {
				var date = newdate.getDate();
				newdate.setDate(newdate.getDate()-date+1);
				this.previousmonth = newdate;
			}
			this.today = new Date();
			this.searchData.from = this.formatDate(this.previousmonth);
			this.searchData.to = this.formatDate(this.today);
		}
	}
	selectChangeHandler() {
		this.searchData.town = null;
		this.currentTown=[];
		for (let index = 0; index < this.towns.length; index++) {
			if(this.towns[index].county_id == this.searchData.county){
				this.currentTown.push(this.towns[index]);
			}
		}

	}
	selectTownChangeHandler(event: any) {
		this.searchData.town = event.target.value;
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
	NotificationToParent(searchdata: any) {
		this.outputToParent.emit(searchdata);
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
}
