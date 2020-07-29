
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Death} from './Death';

@Injectable()
export class DeathService {
    url = 'http://192.168.1.108/';
    constructor(private http: HttpClient) { }

    getAllDeathInfo(): Observable<any[]> {
        return this.http.get<any[]>(this.url);
        //console.log(testcontent);
        //return testcontent;
    }

}