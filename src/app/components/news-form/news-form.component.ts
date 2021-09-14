import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../models/News';
import { NotificacionService } from "../../services/notificacion.service";

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  noticias:News={
    articles:
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
  
  }

  noticiasIngreso:any[];
  noticiasObtenidoLocal:any=[];
  
  imagenObtenidaMostrar: any;
  imagenObtenidaIngresar: any;
  creacion:string="Crear";
  edit:boolean=false;
  idNoticia:any;
  constructor(private router: Router,
    private activedrouter: ActivatedRoute,private sanitizer: DomSanitizer,
    private notificacion:NotificacionService) { }

  ngOnInit() {
    this.creacion = "Crear";
    this.noticiasIngreso = [];
    let obtenerNoticia = [];
    const params = this.activedrouter.snapshot.params;
    //this.idNoticia = params.id;
    console.log(params)
    if (params.id) {
      this.edit = true;
      this.creacion = "Actualizar";
      obtenerNoticia = JSON.parse(localStorage.getItem('noticias'));
      console.log(obtenerNoticia);
      let encontrarNoticia = obtenerNoticia.find((noticia)=>{
        return noticia.id === params.id;
      })
      this.idNoticia = encontrarNoticia.id.indexOf(params.id);
console.log("El elemento buscado está en el índice ", this.idNoticia);

      console.log(encontrarNoticia);
      this.noticias.articles = encontrarNoticia;
      this.imagenObtenidaMostrar = encontrarNoticia.image;
    }
  }

  UploadImage(file: any) {
    this.blobFile(file.target.files[0]).then((res: any) => {
      this.imagenObtenidaMostrar = res.base;
    })

    
    
  }
  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const Img = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(Img);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  }
  );

 
  saveNoticias(){
   console.log(this.imagenObtenidaMostrar);
   let fecha = new Date();
   console.log(fecha.toDateString());
   this.noticias.articles.publishedAt = fecha.toDateString();
    this.noticias.articles.image = this.imagenObtenidaMostrar;
    if(!this.edit){
      this.noticiasObtenidoLocal = JSON.parse(localStorage.getItem('noticias'))
      
      if(this.noticiasObtenidoLocal!=null){
       if(this.testIngreso()){
        this.noticiasIngreso = this.noticiasObtenidoLocal;
        this.noticiasIngreso[this.noticiasIngreso.length]={
          id:this.noticiasIngreso.length+1+this.uuidv4_generate(),
          title:this.noticias.articles.title,
          description:this.noticias.articles.description,
          content:this.noticias.articles.content,
          url:this.noticias.articles.url,
          image:this.noticias.articles.image,
          publishedAt:this.noticias.articles.publishedAt,
          source:{
            name:this.noticias.articles.source.name,
            url:this.noticias.articles.source.url
          }
        }
        
         
        localStorage.setItem('noticias',JSON.stringify(this.noticiasIngreso));
        console.log(this.noticiasIngreso)
        setTimeout(()=>{
          this.notificacion.showSuccess('La noticia se ha agregago correctamente','***Noticia Agregada');
          
        },200);
        this.router.navigate(['/news'])
      }else{
        this.notificacion.showError('Llena Todos los campos','***Noticia No Agregada');

      }
      }else{
        if(this.testIngreso()){
        this.noticiasIngreso[0]={
          id:1+this.uuidv4_generate(),
        title : this.noticias.articles.title,
        description : this.noticias.articles.description,
        content : this.noticias.articles.content,
        url : this.noticias.articles.url,
        image : this.noticias.articles.image,
        publishedAt : this.noticias.articles.publishedAt,
        source: {
          name : this.noticias.articles.source.name,
          url : this.noticias.articles.source.url}
    }

        localStorage.setItem('noticias',JSON.stringify(this.noticiasIngreso));
        setTimeout(()=>{
          this.notificacion.showSuccess('La noticia se ha agregago correctamente','***Noticia Agregada');
          
        },200);
        this.router.navigate(['/news'])

      }else{
        this.notificacion.showError('Llena Todos los campos','***Noticia No Agregada');

      }

      }      
    }
  }
  updateNoticias(){
    let fecha = new Date();
   console.log(fecha.toDateString());
   this.noticias.articles.publishedAt = fecha.toDateString();
    this.noticias.articles.image = this.imagenObtenidaMostrar;
    this.noticiasIngreso[this.idNoticia]={
      id:this.noticiasIngreso.length+1+this.uuidv4_generate(),
      title:this.noticias.articles.title,
      description:this.noticias.articles.description,
      content:this.noticias.articles.content,
      url:this.noticias.articles.url,
      image:this.noticias.articles.image,
      publishedAt:this.noticias.articles.publishedAt,
      source:{
        name:this.noticias.articles.source.name,
        url:this.noticias.articles.source.url
      }
    }
    localStorage.setItem('noticias',JSON.stringify(this.noticiasIngreso));
    setTimeout(()=>{
      this.notificacion.showSuccess('La noticia se ha actualizado correctamente','***Noticia Actualizada');
      
    },200);
    this.router.navigate(['/news'])
  }

  uuidv4_generate() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  testIngreso(){
    if(this.noticias.articles.content.length > 0 &&
      this.noticias.articles.description.length > 0 &&
      this.noticias.articles.image.length > 0 &&
      this.noticias.articles.url.length > 0 &&
      this.noticias.articles.publishedAt.length > 0 &&
      this.noticias.articles.source.name.length > 0 &&
      this.noticias.articles.source.url.length > 0 &&
      this.noticias.articles.title.length > 0 &&
      this.noticias.articles.url.length > 0){
        return true;
      }else{
        return false;
      }
  }

}
