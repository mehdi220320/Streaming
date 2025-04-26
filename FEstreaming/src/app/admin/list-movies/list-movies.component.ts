import { Component } from '@angular/core';
import {Movie} from '../../models/Movie';
import {UserService} from '../../services/user.service';
import {MovieService} from '../../services/movie.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list-movies',
  standalone: false,
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css'
})
export class ListMoviesComponent {
  index=1;
  movies:Movie[] = [];
  showNum: number = 5;
  constructor(private movieService:MovieService,private sanitizer: DomSanitizer) { }
  sanitizeImageUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next:(response)=>{
        this.movies=response;
      }
    })
  }
  numViews(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.showNum = Number(target.value);
    this.IndexChange(1);
  }
  getTotIndex(): number[] {
    const totalPages = Math.ceil(this.movies.length / this.showNum);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  nextIndex(){
    const totalPages = Math.ceil(this.movies.length / this.showNum);
    if(totalPages==this.index){
      this.index=1;
    }else{
      this.index++;
    }
  }
  previousIndex(){
    const totalPages = Math.ceil(this.movies.length / this.showNum);
    if(this.index==1){
      this.index=totalPages;
    }else{
      this.index--;
    }
  }
  IndexChange(i:number):void{
    this.index=i;
  }
  tableViews():Movie[]{
    if(this.index==1){
      return  this.movies.slice(this.index-1,this.index*this.showNum)
    }
    return this.movies.slice((this.index-1)*this.showNum,this.index*this.showNum);
  }
  deleteMovies(id: number): void {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }
  }
}
