import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //me permite realizar peticiones tipo http
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) { }

  getNews(){
   return this.http.get(`https://gnews.io/api/v4/top-headlines?lang=en&token=4aab8c97377ea0c5ab312211ea401cee`);
  }

  searchNews(busqueda:string){
   return this.http.get(`https://gnews.io/api/v4/search?q=${busqueda}&token=4aab8c97377ea0c5ab312211ea401cee`);

  }
}
