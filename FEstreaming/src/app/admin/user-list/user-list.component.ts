import { Component } from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone:false
})
export class UserListComponent {
  index=1;
  randomUsers:User[] = [];
  showNum: number = 5;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      {
      next:(response)=>{
      this.randomUsers=response;
      console.log("aw users : "+response)
    }
    ,error:(error)=>{
      console.error("can t fetch all users")
    }})
  }
  numViews(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.showNum = Number(target.value);
    this.IndexChange(1);
  }
  getTotIndex(): number[] {
    const totalPages = Math.ceil(this.randomUsers.length / this.showNum);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  nextIndex(){
    const totalPages = Math.ceil(this.randomUsers.length / this.showNum);
    if(totalPages==this.index){
      this.index=1;
    }else{
      this.index++;
    }
  }
  previousIndex(){
    const totalPages = Math.ceil(this.randomUsers.length / this.showNum);
    if(this.index==1){
      this.index=totalPages;
    }else{
      this.index--;
    }
  }
  IndexChange(i:number):void{
    this.index=i;
  }
  tableViews():User[]{
    if(this.index==1){
      return  this.randomUsers.slice(this.index-1,this.index*this.showNum)
    }
    return this.randomUsers.slice((this.index-1)*this.showNum,this.index*this.showNum);
  }
  deleteUser(id: number): void {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    this.userService.deleteUser(id.toString()).subscribe({
      next: () => {
        this.randomUsers = this.randomUsers.filter(user => user._id !== id);
        console.log('User deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
  }
}
