import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders	} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
	selector: 'app-deathlist',
	templateUrl: './deathlist.component.html',
	styleUrls: ['./deathlist.component.css']
})
export class DeathlistComponent implements OnInit {
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
		activeLetter:'ALL',
		longitude:null,
		latitude:null,
		geoflag:0
	};
	public badge;
	public loading=1;
	public activeLetter = 'ALL';
	public searchLetter = ['ALL', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 // deathInfo$: Observable<Death[]>;
	constructor(private http:HttpClient,
						private route: ActivatedRoute,
						private dataservice:DataService) {}

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
				this.badge = 'week';
			} else {
				var date = newdate.getDate();
				newdate.setDate(newdate.getDate()-date+1);
				this.badge = 'month';
			}
			this.searchData.from = this.formatDate(newdate);
			this.searchData.to = this.formatDate(new Date());
		}

		this.searchData.activeLetter = 'ALL';
		this.renderTable(this.lastpage);
		this.dataservice.geodisableevent.subscribe(res => {
			this.searchData.geoflag = 0;
			this.renderTable(this.lastpage);
		});
	}
	renderTable(id) {
		if (id == null)
			id = 1;

		this.baseUrl = "https://atrest.ie/api/DeathNotices/";
		this.searchData.activeLetter = this.activeLetter;
		this.searchData.geoflag = this.dataservice.geoFlag;
		this.searchData.latitude = this.dataservice.latitude;
		this.searchData.longitude = this.dataservice.longitude;
		console.log(this.searchData);
		this.http.post(this.baseUrl, this.searchData).subscribe((res : any[])=>{
			this.deathInfo = res[0];
			this.loading = 0;
		});
	}
	GetSearchVal(SearchVal: any){
		this.searchData = SearchVal;
		this.lastpage = 1;
		this.renderTable(this.lastpage);
		this.badge = '';
	}
	loadmore(){
		this.lastpage += 20;
		this.baseUrl = "https://atrest.ie/api/DeathNotices/" + (this.lastpage - 1) +"/";
		this.searchData.activeLetter = this.activeLetter;
		this.http.post(this.baseUrl, this.searchData).subscribe((res : any[])=>{
			this.deathInfo = this.deathInfo.concat(res[0]);
		});
	}
	updateLetter(letter){
		this.activeLetter = letter;
		this.lastpage = 1
		this.renderTable(this.lastpage);
	}
	getRandomSrc() {
		var randomNo = Math.round(Math.random() * 15);
		if (randomNo ==0 )
			randomNo = 1;
		return "assets/image/death/"+ randomNo.toString()+".jpg";
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
