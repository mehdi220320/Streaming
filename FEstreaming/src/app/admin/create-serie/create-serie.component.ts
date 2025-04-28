import { Component } from '@angular/core';
import {SerieTvService} from '../../services/serie-tv.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-serie',
  standalone: false,
  templateUrl: './create-serie.component.html',
  styleUrl: './create-serie.component.css'
})
export class CreateSerieComponent {
  serie: {
    title: string;
    studio: string;
    description: string;
    genre: string;
    releaseDate: Date;
    number_Of_episodes: number;
  } = {
    title: '',
    studio: '',
    description: '',
    genre: '',
    releaseDate: new Date(),
    number_Of_episodes: 0
  };

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private serieService: SerieTvService,private router: Router) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        this.errorMessage = 'Only JPG/PNG images are allowed';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Image must be less than 5MB';
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRegister(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a thumbnail image';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('title', this.serie.title);
    formData.append('studio', this.serie.studio);
    formData.append('description', this.serie.description);
    formData.append('genre', this.serie.genre);
    formData.append('releaseDate', new Date(this.serie.releaseDate).toISOString());
    formData.append('number_Of_episodes', this.serie.number_Of_episodes.toString());
    formData.append('coverImage', this.selectedFile);

    this.serieService.addSerie(formData).subscribe({
      next: (response) => {
        console.log("Movie added successfully", response);
        this.isLoading = false;
        this.resetForm();
        this.router.navigate(['/admin/series']);
      },
      error: (error) => {
        console.error("Error adding movie", error);
        this.errorMessage = error.message || 'Failed to add movie. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private resetForm(): void {
    this.serie = {
      title: '',
      studio: '',
      description: '',
      genre: '',
      releaseDate: new Date(),
      number_Of_episodes: 0
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }
  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }}
}
