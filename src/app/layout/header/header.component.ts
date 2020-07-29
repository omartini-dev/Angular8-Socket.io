import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { GetdataService } from '../../getdata.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public geoFlag=0;
	constructor(private dataservice: DataService,
				private getdata: GetdataService,) { }

	ngOnInit() {
		this.dataservice.geoevent.subscribe(res => {
			[this.geoFlag] = res;
		});
	}
	disableGeo(){
		this.geoFlag = 0;
		this.dataservice.setGeoFlag(0);
		this.dataservice.modifyDNList();
		var data = {'geoflag':0};
		this.getdata.sendCemetery(data);
		this.getdata.sendChurch(data);
	}
}
