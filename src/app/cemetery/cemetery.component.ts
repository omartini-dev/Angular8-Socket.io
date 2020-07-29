import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from "@angular/material";
import {FilterComponent} from "../filter/filter.component"
import { DataService } from '../data.service';
import { GetdataService } from './../getdata.service';
@Component({
  selector: 'app-cemetery',
  templateUrl: './cemetery.component.html',
  styleUrls: ['./cemetery.component.css']
})
export class CemeteryComponent implements OnInit {
	
	public cemdeath : any=[];
	public loading = 1;
	constructor(private dialog:MatDialog,
				private dataservice:DataService,
				private getdata: GetdataService) { }

	ngOnInit() {
		this.cemdeath = this.dataservice.cemdeath;
		this.dataservice.getcc.subscribe(res => {
			this.cemdeath = res[0];
			this.loading = 0;
		});
		this.getdata.sendCemetery({});
		this.getdata.messages.subscribe(res => {
			if(res.room=='cemetery'){
				var parseData = JSON.parse(res.data.msg);
				this.cemdeath = parseData[0];
				this.dataservice.cemdeath = parseData[0];
				this.loading = 0;
			}
		});
		if(this.cemdeath.length > 0) this.loading=0;
	}
	openfilter() {
		this.dataservice.setTarget('cemetery');
		this.dialog.open(FilterComponent);
	}
}
