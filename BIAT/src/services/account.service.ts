import { Injectable } from '@angular/core';
import {User} from "../model/model.user";
import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }

  createAccount(user:User){
    return this.http.post('http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/account/register',user)
      .pipe(map(resp=>resp));
  }
}
