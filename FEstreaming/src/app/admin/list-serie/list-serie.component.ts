import { Component } from '@angular/core';
import {Serie} from '../../models/Serie';
import {DomSanitizer} from '@angular/platform-browser';
import {SerieTvService} from '../../services/serie-tv.service';

@Component({
  selector: 'app-list-serie',
  standalone: false,
  templateUrl: './list-serie.component.html',
  styleUrl: './list-serie.component.css'
})
export class ListSerieComponent {
  index=1;
  series:Serie[]=[]
  showNum: number = 5;
  constructor(private serieService:SerieTvService,private sanitizer: DomSanitizer) { }
  sanitizeImageUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.serieService.getAllSeries().subscribe({
      next:(response)=>{
        this.series=response
      },error:(err)=>{
        console.error(err)
      }
    })

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

  }
}
