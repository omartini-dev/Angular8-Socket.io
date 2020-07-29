import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.css']
})
export class LandComponent implements OnInit {

  constructor(private route: ActivatedRoute,
			  private router: Router) { }

  ngOnInit() {
  	//this.router.navigate(['/home']);
  }

}
