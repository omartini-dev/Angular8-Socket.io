import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from "@angular/material";
import {FilterComponent} from "../filter/filter.component"
import { DataService } from '../data.service';
import { GetdataService } from './../getdata.service';
@Component({
  selector: 'app-church',
  templateUrl: './church.component.html',
  styleUrls: ['./church.component.css']
})
export class ChurchComponent implements OnInit {
	public chudeath : any=[];
	public loading = 1;
	constructor(private dialog:MatDialog,
				private dataservice:DataService,
				private getdata: GetdataService) { }

	ngOnInit() {
		this.chudeath = this.dataservice.chudeath;
		this.dataservice.getcc.subscribe(res => {
			this.chudeath = res[1];
			this.loading = 0;
		});
		this.getdata.sendChurch({});
		this.getdata.messages.subscribe(res => {
			if(res.room=='church'){
				var parseData = JSON.parse(res.data.msg);
				this.chudeath = parseData[0];
				this.dataservice.chudeath = parseData[0];
				this.loading = 0;
			}
		});
		if(this.chudeath.length > 0) this.loading=0;
	}

	openfilter() {
		this.dataservice.setTarget('church');
		this.dialog.open(FilterComponent);
	}
}
