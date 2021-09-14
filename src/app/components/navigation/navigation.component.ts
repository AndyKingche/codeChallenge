import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  search:string ="";
  constructor(private router:Router) { }

  ngOnInit() {
  }

  clickSearch(){
        
    console.log(this.search)
    if(this.search.length > 0){
      console.log(this.search)
      //this.router.navigate(['/news/',this.search])
      this.router.navigateByUrl('/news', {skipLocationChange: true}).then(()=>
   this.router.navigate(['/news/',this.search]));
    }else{
    console.log("no hay nada")
    }
    
    
  }
}
