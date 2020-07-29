import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
	contactlUrl = 'https://atrest.ie/api/contact/';
	public emailForm = {
		firstname:'',
		lastname:'',
		email:'',
		message:'',
		subject:''
	};
	constructor(private http: HttpClient) { }

	ngOnInit() {
	}
	sendMessage(): void {
		this.http.post(this.contactlUrl, this.emailForm).subscribe((res : any[])=>{
			if(res[0]=='success'){
				alert("Successfully sent!")
			}
		});
	}
}
