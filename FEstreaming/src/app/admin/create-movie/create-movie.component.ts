import { Component } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-create-movie',
  standalone: false,
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent {
  movie: {
    title: string;
    studio: string;
    description: string;
    genre: string;
    releaseDate: Date;
    duration: number;
  } = {
    title: '',
    studio: '',
    description: '',
    genre: '',
    releaseDate: new Date(),
    duration: 0
  };

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private movieService: MovieService) {}

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
    formData.append('title', this.movie.title);
    formData.append('studio', this.movie.studio);
    formData.append('description', this.movie.description);
    formData.append('genre', this.movie.genre);
    formData.append('releaseDate', new Date(this.movie.releaseDate).toISOString());
    formData.append('duration', this.movie.duration.toString());
    formData.append('coverImage', this.selectedFile);

    this.movieService.addMovie(formData).subscribe({
      next: (response) => {
        console.log("Movie added successfully", response);
        this.isLoading = false;
        this.resetForm();
      },
      error: (error) => {
        console.error("Error adding movie", error);
        this.errorMessage = error.message || 'Failed to add movie. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private resetForm(): void {
    this.movie = {
      title: '',
      studio: '',
      description: '',
      genre: '',
      releaseDate: new Date(),
      duration: 0
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
