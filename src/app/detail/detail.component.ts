import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Death } from '../Death';
import { Observable } from 'rxjs/Observable';
declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  basedetailUrl = 'https://atrest.ie/api/details/';
  sendEmailUrl = 'https://atrest.ie/api/email/';
  public deathdetail : any=[];
  public emailForm = {
    username:'',
    email:'',
    recipient:'',
    message:''
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    $(window).scrollTop(0);
    this.getDeath();
  }

  getDeath(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(this.basedetailUrl + id).subscribe((data : any[])=>{
      this.deathdetail = data[0];
      this.emailForm.message = 'I am sorry to tell you that ' + this.deathdetail.firstname + " " + this.deathdetail.lastname + 'has passed away. If you would like to view the Death Notice, visit http://atrest.ie/deathnotices/'+ (this.deathdetail.firstname+'-'+this.deathdetail.lastname+'-'+this.deathdetail.county_name + (this.deathdetail.town_name.trim()!=''?('-'+this.deathdetail.town_name):'')) +"/" + this.deathdetail.id;
    });
  }
  sendMessage(): void {
    this.http.post(this.sendEmailUrl, this.emailForm).subscribe((res : any[])=>{
      console.log("success");
    });
  }
}
