import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-emailalert',
  templateUrl: './emailalert.component.html',
  styleUrls: ['./emailalert.component.css']
})
export class EmailalertComponent implements OnInit {

	public setUrl = 'https://atrest.ie/api/setAlert/';
	public counties=null;
	public towns=null;
	public churches:any = [];
	public cemeteries:any = [];
	public currentTown:any = [];
	public currentTown2:any = [];
	public curchurches:any = [];
	public today = new Date();
	public form1 = {
		'email':'',
		'surname':'',
		'county':null,
		'town':null,
		'type':1
	};
	public form2 = {
		'email':'',
		'county':null,
		'town':null,
		'church':null,
		'type':2
	};

	constructor(private dataservice:DataService,
				private http:HttpClient) { }

	ngOnInit() {
		[this.counties, this.towns] = this.dataservice.getCountytown();
		[this.churches, this.cemeteries] = this.dataservice.getCCdata();
		if(this.counties==null){
			this.dataservice.change.subscribe(res => {
				[this.counties, this.towns, this.churches, this.cemeteries] = res;
			});
		}
	}
	createAlert($event) {
		this.http.post(this.setUrl, $event).subscribe((res : any[])=>{
			$(".toast").toast('show');
			this.form1 = {
				'email':'',
				'surname':'',
				'county':null,
				'town':null,
				'type':1
			};
			this.form2 = {
				'email':'',
				'county':null,
				'town':null,
				'church':null,
				'type':2
			};
		});
	}
	selectChangeHandler(flag) {
		this.currentTown=[];
		this.currentTown2=[];
		for (let index = 0; index < this.towns.length; index++) {
			if(flag==1){
				if(this.towns[index].county_id == this.form1.county){
					this.currentTown.push(this.towns[index]);
				}
			} else {
				if(this.towns[index].county_id == this.form2.county){
					this.currentTown2.push(this.towns[index]);
				}
			}
		}
	}
	townChangeHandler() {
		if(this.form2.town!=null){
			this.curchurches = [];
			for (let index = 0; index < this.churches.length; index++) {
				if(this.churches[index].town_id == this.form2.town){
					this.curchurches.push(this.churches[index]);
				}
			}
		}
	}
}
