import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private news: NewsService,private router: ActivatedRoute) { }

  noticias:any=[];
  ngOnInit() {
    //this.getNews();
   const params = this.router.snapshot.params;
   //console.log(params.search);
   if(params.search!){
     this.searchNews(params.search);
   }
  }

  async getNews(){
    await this.news.getNews().subscribe(res=>{
      this.noticias = res;
      for(let i =0; i< this.noticias.articles.length; i++){
        let fechaNueva = new Date(this.noticias.articles[i].publishedAt)
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fechaNueva);
        let mes = new Intl.DateTimeFormat('en', { month: 'short' }).format(fechaNueva);
        let dia = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fechaNueva);
        
        this.noticias.articles[i].publishedAt = `${dia} ${mes} ${year}`;
          
      }
      
    })
  }

  searchNews(newsSearch:string){
    this.news.searchNews(newsSearch).subscribe(res=>{
      this.noticias = res;
      for(let i =0; i< this.noticias.articles.length; i++){
        let fechaNueva = new Date(this.noticias.articles[i].publishedAt)
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fechaNueva);
        let mes = new Intl.DateTimeFormat('en', { month: 'short' }).format(fechaNueva);
        let dia = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fechaNueva);
        
        this.noticias.articles[i].publishedAt = `${dia} ${mes} ${year}`;
          
      }
    },err=>console.error(err))

  }
 
}
