import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-condolence',
  templateUrl: './condolence.component.html',
  styleUrls: ['./condolence.component.css']
})
export class CondolenceComponent implements OnInit {
	setUrl = "https://atrest.ie/api/setCondolence/";
	getUrl = "https://atrest.ie/api/getCondolence/";
	public condol={
		username: '',
		message: '',
		notice_id:null
	};
	public condolData:any = [];
	constructor(private http:HttpClient,
				private route: ActivatedRoute,
				private router: Router) { }
	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		this.condol.notice_id = id;
		this.http.post(this.getUrl, this.condol).subscribe((res : any[])=>{
			this.condolData = res;
		});
	}
	sendMsg() {
		this.http.post(this.setUrl, this.condol).subscribe((res : any[])=>{
			this.condol.username = '';
			this.condol.message ='';
		});
	}
}
