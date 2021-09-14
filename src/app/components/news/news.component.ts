import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute,Router } from '@angular/router';
import { News } from '../../models/News';
import { NotificacionService } from "../../services/notificacion.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private news: NewsService,private router: ActivatedRoute,
    private navigate: Router,private notificacion: NotificacionService) { }

  noticias:any=[];
 
  noticias_local:{
    articles:
      [
        {
          title:'',
          description: '',
          content: '',
          url: '',
          image: '',
          publishedAt: '',
          source: {
              name: '',
              url: ''
          }
        }
        ]
  }
  localstorage_news:any=[];
  ngOnInit() {
    this.getNews();
    //this.getNewsLocal();
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
      console.log(this.noticias)
      this.getNewsLocal(this.noticias.articles.length);
      
    });
  
  }

  getNewsLocal(sizeNews:number){
    console.log(sizeNews)
      this.localstorage_news = localStorage.getItem('noticias');
    if(this.localstorage_news != null){
    let sizeLocalNews = JSON.parse(this.localstorage_news);
    this.noticias_local = JSON.parse(this.localstorage_news);
    console.log(sizeLocalNews.length)
    for(let j = 0; j<sizeLocalNews.length;j++){
      
      this.noticias.articles[sizeNews+j]={
        id:this.noticias_local[j].id,
        title:this.noticias_local[j].title,
        description:this.noticias_local[j].description,
        content:this.noticias_local[j].content,
        url:this.noticias_local[j].url,
        image:this.noticias_local[j].image,
        publishedAt:this.noticias_local[j].publishedAt,
        source:{
          name:this.noticias_local[j].source.name,
          url:this.noticias_local[j].source.url,
      }
      } 
    }
    
    
   
  }
  }
  // getNewsLocal(){
  //   this.localstorage_news = localStorage.getItem('noticias');
  //   if(this.localstorage_news != null){
  //   console.log(JSON.parse(this.localstorage_news));
  //   this.noticias_local = JSON.parse(this.localstorage_news);
    
  //   this.noticias.articles = this.noticias_local;
    
  //   console.log(this.noticias.articles.length)
    
  //   }
  // }
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
  eliminar(id:number){
    console.log(id)
    this.noticias = this.noticias.articles.filter((noticia)=>{
      return noticia.id != id;
    });
    
    let noticiasLocal = JSON.parse(localStorage.getItem('noticias'));
    
    noticiasLocal = noticiasLocal.filter((noticias)=>{
      return noticias.id != id;
    })

    localStorage.setItem('noticias',JSON.stringify(noticiasLocal))
    console.log(noticiasLocal)
    setTimeout(()=>{
      this.notificacion.showSuccess('La noticia se ha eliminado correctamente','***Noticia Eliminada');
      
    },200);
    
    this.getNews();
  }

  
 
}
