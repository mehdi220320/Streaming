import { Component } from '@angular/core';
import {Movie} from '../../models/Movie';
import {UserService} from '../../services/user.service';

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
  constructor(private userService:UserService) { }

  ngOnInit(): void {

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
  deleteUser(id: number): void {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    this.userService.deleteUser(id.toString()).subscribe({
      next: () => {
        this.movies = this.movies.filter(movie => movie._id !== id);
        console.log('User deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
  }
}
