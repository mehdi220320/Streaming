import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Serie} from '../../models/Serie';

@Component({
  selector: 'app-list-serie',
  standalone: false,
  templateUrl: './list-serie.component.html',
  styleUrl: './list-serie.component.css'
})
export class ListSerieComponent {
  index=1;
  series:Serie[] = [];
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
    const totalPages = Math.ceil(this.series.length / this.showNum);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  nextIndex(){
    const totalPages = Math.ceil(this.series.length / this.showNum);
    if(totalPages==this.index){
      this.index=1;
    }else{
      this.index++;
    }
  }
  previousIndex(){
    const totalPages = Math.ceil(this.series.length / this.showNum);
    if(this.index==1){
      this.index=totalPages;
    }else{
      this.index--;
    }
  }
  IndexChange(i:number):void{
    this.index=i;
  }
  tableViews():Serie[]{
    if(this.index==1){
      return  this.series.slice(this.index-1,this.index*this.showNum)
    }
    return this.series.slice((this.index-1)*this.showNum,this.index*this.showNum);
  }
  deleteUser(id: number): void {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    this.userService.deleteUser(id.toString()).subscribe({
      next: () => {
        this.series = this.series.filter(user => user._id !== id);
        console.log('Serie deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
  }
}
