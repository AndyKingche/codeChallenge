import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //me permite realizar peticiones tipo http
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) { }

  getNews(){
   return this.http.get(`https://gnews.io/api/v4/top-headlines?lang=en&token=a714ee7b2031d78403c0386fc1169f7c`);
  }

  searchNews(busqueda:string){
   return this.http.get(`https://gnews.io/api/v4/search?q=${busqueda}&token=a714ee7b2031d78403c0386fc1169f7c`);

  }
}
