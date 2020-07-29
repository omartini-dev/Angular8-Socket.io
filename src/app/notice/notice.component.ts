import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GetdataService } from './../getdata.service';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
	public formdata={
		'username':'',
		'email':'',
		'address':'',
		'phone':'',
		'notice_fname':'',
		'notice_lname':'',
		'notice_nee':'',
		'notice_desc':'',
		'notice_address':'',
		'notice_d_date':'',
		'notice_county':null,
		'notice_town':null,
		'notice_church':null,
		'notice_cemetery':null,
		'notice_phrase1':'',
		'notice_arrangement':'',
		'notice_phrase2':''
	};
	public churches:any = [];
	public cemeteries:any = [];
	public curchurches:any = [];
	public curcemeteries:any = [];
	public currentTown: any=[];
	public counties;
	public towns;
	public alertflag=0;
	public errorshow = 0;
	setUrl = "https://atrest.ie/api/setNotice/";
	constructor(private http:HttpClient,
				private getdata: GetdataService,
				private dataservice:DataService) { }

	ngOnInit() {
		[this.counties, this.towns] = this.dataservice.getCountytown();
		[this.churches, this.cemeteries] = this.dataservice.getCCdata();
		this.curchurches = this.churches;
		this.curcemeteries = this.cemeteries;
	}
	selectChangeHandler() {
		this.formdata.notice_town = null;
		this.currentTown=[];
		for (let index = 0; index < this.towns.length; index++) {
			if(this.towns[index].county_id == this.formdata.notice_county){
				this.currentTown.push(this.towns[index]);
			}
		}
		if(this.formdata.notice_county!=null){
			this.curchurches = [];
			for (let index = 0; index < this.churches.length; index++) {
				if(this.churches[index].county_id == this.formdata.notice_county){
					this.curchurches.push(this.churches[index]);
				}
			}
			this.curcemeteries = [];
			for (let index = 0; index < this.cemeteries.length; index++) {
				if(this.cemeteries[index].county_id == this.formdata.notice_county){
					this.curcemeteries.push(this.cemeteries[index]);
				}
			}
		} else {
			this.curchurches = this.churches;
			this.curcemeteries = this.cemeteries;
		}
	}
	townChangeHandler() {
		if(this.formdata.notice_town!=null){
			this.curchurches = [];
			for (let index = 0; index < this.churches.length; index++) {
				if(this.churches[index].town_id == this.formdata.notice_town){
					this.curchurches.push(this.churches[index]);
				}
			}
			this.curcemeteries = [];
			for (let index = 0; index < this.cemeteries.length; index++) {
				if(this.cemeteries[index].town_id == this.formdata.notice_town){
					this.curcemeteries.push(this.cemeteries[index]);
				}
			}
		}
	}
	addNotice() {
		this.errorshow = 1;
		
		if(this.formdata.username=='') return false;
		if(this.formdata.email=='') return false;
		if(this.formdata.phone=='') return false;
		if(this.formdata.address=='') return false;
		if(this.formdata.notice_fname=='') return false;
		if(this.formdata.notice_lname=='') return false;
		if(this.formdata.notice_nee=='') return false;
		if(this.formdata.notice_address=='') return false;
		if(this.formdata.notice_desc=='') return false;
		if(this.formdata.notice_d_date=='') return false;
		if(this.formdata.notice_county=='') return false;
		if(this.formdata.notice_town=='') return false;
		this.http.post(this.setUrl, this.formdata).subscribe((res : any[])=>{
			this.formdata={
				'username':'',
				'email':'',
				'address':'',
				'phone':'',
				'notice_fname':'',
				'notice_lname':'',
				'notice_nee':'',
				'notice_address':'',
				'notice_desc':'',
				'notice_d_date':'',
				'notice_county':null,
				'notice_town':null,
				'notice_church':null,
				'notice_cemetery':null,
				'notice_phrase1':'',
				'notice_arrangement':'',
				'notice_phrase2':''
			};
			this.alertflag = 1;
			this.errorshow = 0;
			$(window).scrollTop(0);
		});
		
	}
	toggleflag () {
		this.alertflag = 0;
	}
	selectDateHandler(event: any) {
		if(typeof(event.year)!='undefined')
			this.formdata.notice_d_date = event.year + '-' + (event.month.toString().length==1?'0':'') +event.month+'-' + (event.day.toString().length==1?'0':'')+event.day;
		else
			this.formdata.notice_d_date = event.target.value;
	}
}
